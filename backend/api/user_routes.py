
from flask import Blueprint, jsonify, request, session
from backend.models import User, db
from flask_login import login_user, current_user, logout_user, login_required

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route('/login', methods=['GET', 'POST'])
def login():
    print("HERE!!!!")
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return {"errors": ["Please re-enter email and password"]}, 400

    authenticated1, user1 = User.authenticate1(email, password)

    if authenticated1:
        user = user1
        authenticated = authenticated1
    else:
        authenticated = False
        user = None

    if authenticated:
        print("HERE #2!!!!!!")
        login_user(user)
        return {"current_user_id": current_user.id,
                "current_user": current_user.to_dict()}

    return {"errors": ["Invalid username, email, and/or password"]}, 401
