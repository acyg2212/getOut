from flask import Blueprint, jsonify, request, session
import requests
from ..config import Config
from requests.auth import HTTPBasicAuth

ridb_routes = Blueprint('ridb', __name__)


@ridb_routes.route('/facility', methods=["POST"])
def get_photo():
    facilityId = request.json.get('id', None)
    params = {
        'apikey': Config.APIKey
    }
    response = requests.get(
        f'https://ridb.recreation.gov/api/v1/facilities/{facilityId}/media',
        params=params
    )
    print(response.text)
    return{"response": response.text}


@ridb_routes.route('/', methods=["POST"])
def getSearch():

    searchValue = request.json.get("searchValue", None)
    selectedValue = request.json.get("selectedValue", None)
    params = {
        'query': searchValue,
        'activity': selectedValue,
        'apikey': Config.APIKey,

    }
    response = requests.get(
        f'https://ridb.recreation.gov/api/v1/facilities',
        # auth=auth,
        params=params
    )
    return {"response": response.text}


@ridb_routes.route('/facility/<int:id>')
def get_single_facility(id):
    params = {
        'apikey': Config.APIKey
    }
    response = requests.get(
        f'https://ridb.recreation.gov/api/v1/facilities/{id}/',
        params=params
    )
    print(response.text)
    return{"response": response.text}


@ridb_routes.route('/facility/<id>/media')
def get_single_facility_photo(id):
    params = {
        'apikey': Config.APIKey
    }
    response = requests.get(
        f'https://ridb.recreation.gov/api/v1/facilities/{id}/media',
        params=params
    )
    print(response.text)
    return{"response": response.text}


@ridb_routes.route('/facility/<id>/campsites')
def campsites(id):
    params = {
        'apikey': Config.APIKey,
        'limit': 10
    }
    response = requests.get(
        f'https://ridb.recreation.gov/api/v1/facilities/{id}/campsites',
        params=params
    )
    print(response.text)
    return{"response": response.text}
