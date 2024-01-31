class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql://root:admin@localhost:3306/employee-monitor'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your_secret_key'  # Change this to a secure key
    SESSION_COOKIE_NAME = 'my_cookie'
    SESSION_COOKIE_SECURE = True
    SESSION_TYPE = 'filesystem'