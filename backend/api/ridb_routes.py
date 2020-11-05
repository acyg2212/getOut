from flask import Blueprint, jsonify, request, session
import requests
from ..config import Config

ridb_routes = Blueprint('ridb', __name__)


@ridb_routes.route('/<searchParams>')
def getSearch(searchParams):
    print("HERE!!!!", Config.APIKey)
    params = {'searchParams': searchParams, 'apikey': Config.APIKey}
    response = requests.get(
        f'https://ridb.recreation.gov/api/v1/recareas?query={searchParams}&limit=50&offset=0&lastupdated=10-01-2018',
        params=params
    )
    return {"response": response.text}
