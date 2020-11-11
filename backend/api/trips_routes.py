from flask import Blueprint, jsonify, request, session
from ..models import db, Trip


trips_routes = Blueprint('trips', __name__)


@trips_routes.route('/', methods=["POST"])
def trips():

    campName = request.json.get('campsiteName', None)
    site_name = request.json.get('facilityName', None)
    wish_list = request.json.get('wishList', None)
    user_id = request.json.get("currentUserId", None)
    date_traveled = request.json.get("startDate", None)

    if wish_list:
        new_trip = Trip(
            campName=str(campName),
            site_name=site_name,
            wish_list=wish_list,
            user_id=user_id,

        )
    else:
        new_trip = Trip(
            campName=campName,
            site_name=site_name,
            wish_list=wish_list,
            user_id=user_id,
            date_traveled=date_traveled
        )

    db.session.add(new_trip)
    db.session.commit()

    return {"new_trip": new_trip.to_dict()}


@trips_routes.route('/<id>')
def get_trips(id):
    trips = Trip.query.filter(
        Trip.user_id == id, Trip.wish_list == "false").all()

    return{"trips": [trip.to_dict() for trip in trips]}


@trips_routes.route('/wishlist/<id>')
def get_wishlist(id):
    trips = Trip.query.filter(
        Trip.user_id == id, Trip.wish_list == "true").all()

    return{"trips": [trip.to_dict() for trip in trips]}
