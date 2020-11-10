from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40))
    lastName = db.Column(db.String(40))
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def authenticate1(cls, email, password):
        user = cls.query.filter(User.email == email).scalar()
        if user:
            return check_password_hash(user.hashed_password, password), user
        else:
            return False, None

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstName": self.firstName
        }


class Activity(db.Model):
    __tablename__ = "activities"
    id = db.Column(db.Integer, primary_key=True)
    activity = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "activity": self.activity,

        }


class Trip(db.Model):
    __tablename__ = "trips"
    id = db.Column(db.Integer, primary_key="true")
    site_name = db.Column(db.String, nullable=False)
    site_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    wish_list = db.Column(db.Boolean, default=False)
    date_traveled = db.Column(db.Date)

    def to_dict(self):
        return {
            "id": self.id,
            "site_name": self.site_name,
            "site_id": self.site_id,
            "user_id": self.user_id,
            "wish_list": self.wish_list,
            "date_traveled": self.date_traveled
        }
