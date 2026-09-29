import json
from flask import jsonify

def success_response(data=None, message="Success", status_code=200):
    response = {"success": True, "message": message}
    if data is not None:
        response["data"] = data
    return jsonify(response), status_code

def error_response(message="An error occurred", status_code=400):
    return jsonify({"success": False, "error": message}), status_code

def log_action(user_id, action, details="", ip=""):
    from backend.models import db, Log
    log = Log(user_id=user_id, action=action, details=details, ip=ip)
    db.session.add(log)
    db.session.commit()

