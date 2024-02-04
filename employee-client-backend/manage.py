# manage.py

from app import app, db, socketio

if __name__ == '__main__':
    try:
        with app.app_context():
            db.create_all()
        print("Database tables created successfully.")

        # Run the Flask application
        socketio.run(app, debug=True)

    except Exception as e:
        print(f"An error occurred while creating database tables: {str(e)}")
