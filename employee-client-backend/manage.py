import flask


from flask import Flask
from app import create_app

if __name__ == '__main__':
    try:
        app, db = create_app()
        with app.app_context():
            db.create_all()
        print("Database tables created successfully.")
        
        # Run the Flask application
        app.run(debug=app.config['DEBUG'])

    except Exception as e:
        print(f"An error occurred while creating database tables: {str(e)}")
