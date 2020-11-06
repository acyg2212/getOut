from flask import Blueprint, jsonify, request, session
from ..models import db, Activity


activities_routes = Blueprint('activities', __name__)


@activities_routes.route('/')
def get_activities():
    activities = Activity.query.all()
    print(activities)

    return {"activities": [activity.to_dict() for activity in activities]}
