
from flask import Blueprint, jsonify
from backend.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route('/login', methods=['GET', 'POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return {"errors": ["Please re-enter email and password"]}, 400

    authenticated, user = User.authenticate1(email, password)

    if authenticated:
        user = user
        authenticated = authenticated

    else:
        authenticated = False
        user = None

    if authenticated:
        login_user(user)
        return {"current_user_id": current_user.id,
                "current_user": current_user.to_dict()}

    return {"errors": ["Invalid email, and/or password"]}, 401
