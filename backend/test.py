from requests_oauthlib import OAuth2Session
from uber_rides.session import Session
from uber_rides.client import UberRidesClient
from uber_rides.auth import AuthorizationCodeGrant
from flask import Flask, request, redirect, session, url_for
from flask.json import jsonify
import os
import requests, json

app = Flask(__name__)

# This information is obtained upon registration of a new uber
client_id = "bNuMgUk4XDsvlVbnnLtJwwEitiflHMPG"
client_secret = "Crhu4OyRxMV0nHoZYT-Mu8R2izwlDaSupxao_QMF"
authorization_base_url = 'https://login.uber.com/oauth/v2/authorize'
token_url = 'https://login.uber.com/oauth/v2/token'
scopes = {"profile", "history", "history_lite", "places", "request_receipt", "request"}
redirect_url = "http://localhost:5000/uber/success"
state_token = None

auth_flow = AuthorizationCodeGrant(client_id, scopes, client_secret, redirect_url, state_token)
auth_url = auth_flow.get_authorization_url()

@app.route("/")
def demo():
    """Step 1: User Authorization.

    Redirect the user/resource owner to the OAuth provider (i.e. uber)
    using an URL with a few key OAuth parameters.
    """
    print("hello")
    uber = OAuth2Session(client_id)
    authorization_url, state = uber.authorization_url(authorization_base_url)
    state_token = state
    # State is used to prevent CSRF, keep this for later.

    print("hello")
    return redirect(authorization_url)


# Step 2: User authorization, this happens on the provider.
@app.route("/uber/success", methods=["GET"])
def callback():
    """ Step 3: Retrieving an access token.

    The user has been redirected back from the provider to your registered
    callback URL. With this redirection comes an authorization code included
    in the redirect URL. We will use that to obtain an access token.
    """
    # print("hi")
    client_id = "bNuMgUk4XDsvlVbnnLtJwwEitiflHMPG"
    client_secret = "Crhu4OyRxMV0nHoZYT-Mu8R2izwlDaSupxao_QMF"
    # print(request.url)
    access_token = request.args.get('code')
    data = {'client_id': client_id, 'client_secret': client_secret, 'grant_type': 'authorization_code', 'code': access_token, 'redirect_uri': "http://localhost:5000/uber/success", 'scope': scopes}
    access_token_response = requests.post(token_url, data=data, verify=False, allow_redirects=False, auth=(client_id, client_secret))
    tokens = json.loads(access_token_response.text)
    access_token = tokens['access_token']
    # print(access_token)
    callUber(access_token)


def callUber(access_token):
    api_call_headers = {'Authorization': 'Bearer ' + access_token}
    api_url = "https://sandbox-api.uber.com/v1.2"

    start = [-37.818182, 144.968484]  # lat lng of user's location at last pub
    end = [-37.809419, 144.969887]  # user's home address lat lng

    session = Session(server_token="CUofQlGNUbYK3x9FjX0AtlFjEJCak4O59V61YeGs")
    # session = auth_flow.get_session(redirect_url)
    client = UberRidesClient(session, sandbox_mode=True)
    # credentials = session.oauth2credential
    response = client.get_products(start[0], start[1])
    products = response.json.get('products')
    product_id = products[0].get('product_id')  # get first car

    # print(product_id)
    data = {
        "product_id": product_id,
        "start_latitude": str(start[0]),
        "start_longitude": str(start[1]),
        "end_latitude": str(end[0]),
        "end_longitude": str(end[1])
    }

    estimate_url = api_url + "/estimates/price?product_id=" + product_id + "&start_latitude=" + str(data['start_latitude']) + "&start_longitude=" + str(data['start_longitude']) + "&end_latitude=" + str(data['end_latitude']) + "&end_longitude=" + str(data['end_longitude'])
    # estimate_url = api_url + "/estimates/price"

    # estimate_url = api_url + "/estimates/price?product_id=14095ef9-8f25-4c95-b523-82ea721f4b5a&amp; start_latitude=-37.818182&amp; start_longitude=144.968484&amp; end_latitude=-37.809419&amp; end_longitude=144.969887&amp; access_token=JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAAKeHcU4e3TOpwemfJhsSFOdsAAAAWdOPQXzAGGM_PgSOyLyYAG_s7EXFVUMPvD8VGkEcqNkUhxbVsuEmgsH0zOdlmJLuspmygp_zS-XGybm4vmUCUImoMjNo1hjNIK-XGuGhSuQ-VYj2gOsByzGu3tLPMBrjin56zodEXVk1TQahDAAAAO78zhNV3nrrsom5JCQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU"

    estimate = requests.get(estimate_url, headers=api_call_headers)
    data["product_id"] = json.loads(estimate.content)['prices'][0]['product_id']
    print()

    fare_headers = {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
    }

    data_json = '''{ "product_id": product_id, "start_latitude": str(start[0]), "start_longitude": str(start[1]), "end_latitude": str(end[0]), "end_longitude": str(end[1])}'''
    # fare_url = api_url + "/requests/estimate?product_id=" + product_id + "&start_latitude=" + str(data['start_latitude']) + "&start_longitude=" + str(data['start_longitude']) + "&end_latitude=" + str(data['end_latitude']) + "&end_longitude=" + str(data['end_longitude'])
    fare_url = api_url + "/requests/estimate"
    get_fare = requests.post(fare_url, headers=fare_headers, data=json.dumps(data))
    fare = json.loads(get_fare.content)['fare']['fare_id']

    # fake request
    data = {
        'fare_id': fare,
        'start_latitude': start[0],
        'start_longitude': start[1],
        'end_latitude': end[0],
        'end_longitude': end[1],
    }
    print("hello")
    # make the fake request
    r = requests.post(api_url + "/requests", headers=fare_headers, data=json.dumps(data))
    print("hello")



if __name__ == "__main__":
    # This allows us to use a plain HTTP callback
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = "1"

    app.secret_key = os.urandom(24)
    app.run(debug=True)