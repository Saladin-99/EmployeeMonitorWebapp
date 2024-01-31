# __init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from app.config import Config


db = SQLAlchemy()
login_manager = LoginManager()
app = Flask(__name__)
from app.Employee import Employee
def create_app():
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)
    CORS(app, max_age=600, origins=["http://localhost:3000"],  supports_credentials=True)
    app.config['CORS_HEADERS'] = 'Content-Type'
    
    from app.EmployeeController import employee_controller
    # Register the blueprint
    app.register_blueprint(employee_controller)

    return app, db

@login_manager.user_loader
def load_user(user_id):
    return Employee.query.get(int(user_id))
