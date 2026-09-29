from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from backend.models import db, User, Profile
from backend.utils import success_response, error_response

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return error_response("Missing JSON payload")
        
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    mobile = data.get("mobile")

    if not all([name, email, password]):
        return error_response("Name, email, and password are required")

    if User.query.filter_by(email=email).first():
        return error_response("Email already registered", 409)

    user = User(name=name, email=email, mobile=mobile)
    user.set_password(password)
    
    db.session.add(user)
    db.session.flush() # To get the user ID
    
    profile = Profile(user_id=user.id)
    db.session.add(profile)
    
    db.session.commit()
    
    return success_response(message="User registered successfully", status_code=201)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return error_response("Invalid credentials", 401)
        
    if user.status != "ACTIVE":
        return error_response("Account is suspended", 403)

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return success_response({
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": {"id": user.id, "name": user.name, "role": user.role}
    })

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return error_response("User not found", 404)
        
    return success_response({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    })

