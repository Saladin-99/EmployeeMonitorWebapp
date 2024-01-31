from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class Employee(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(160), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    isAdmin = db.Column(db.Integer, nullable=False, default=0)
    isOn = db.Column(db.Integer, nullable=False, default=0)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_on(self):
        self.isOn = 1
        db.session.commit()

    def set_off(self):
        self.isOn = 0
        db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'isAdmin': self.isAdmin,
            'isOn': self.isOn
        }