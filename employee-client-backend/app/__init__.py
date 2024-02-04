# __init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from app.config import Config
from flask_socketio import SocketIO

db = SQLAlchemy()
login_manager = LoginManager()
socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)
    
    CORS(app, max_age=600, origins=["*"], supports_credentials=True)
    app.config['CORS_HEADERS'] = 'Content-Type'

    socketio.init_app(app, cors_allowed_origins="*")  # Initialize SocketIO with the app

    from app.Employee import Employee
    from app.EmployeeController import employee_controller

    app.register_blueprint(employee_controller)

    return app

app = create_app()