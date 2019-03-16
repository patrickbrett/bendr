from requests_oauthlib import OAuth2Session
from uber_rides.session import Session
from uber_rides.client import UberRidesClient
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

@app.route("/")
def demo():
    """Step 1: User Authorization.

    Redirect the user/resource owner to the OAuth provider (i.e. uber)
    using an URL with a few key OAuth parameters.
    """
    print("hello")
    uber = OAuth2Session(client_id)
    authorization_url, state = uber.authorization_url(authorization_base_url)

    # State is used to prevent CSRF, keep this for later.
    # session['oauth_state'] = state
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
    print("hi")
    client_id = "bNuMgUk4XDsvlVbnnLtJwwEitiflHMPG"
    client_secret = "Crhu4OyRxMV0nHoZYT-Mu8R2izwlDaSupxao_QMF"
    # print(request.url)
    access_token = request.args.get('code')
    data = {'grant_type': 'authorization_code', 'code': access_token, 'redirect_uri': "http://localhost:5000/uber/success"}
    access_token_response = requests.post(token_url, data=data, verify=False, allow_redirects=False, auth=(client_id, client_secret))
    tokens = json.loads(access_token_response.text)
    access_token = tokens['access_token']

    # api_call_headers = {'Authorization': 'Bearer ' + access_token}
    # api_call_response = requests.get("https://sandbox-api.uber.com/v1.2/", headers=api_call_headers, verify=False)


    return redirect(url_for('calluber'))


@app.route("/calluber")
def callUber():

    session = Session(server_token="CUofQlGNUbYK3x9FjX0AtlFjEJCak4O59V61YeGs")
    client = UberRidesClient(session)
    response = client.get_products(37.77, -122.41)  # lat lng of user's location at last pub
    products = response.json.get('products')
    product_id = products[0].get('product_id')  # get first car

    start = [0, 0]
    end = [0, 0]

    estimate = client.estimate_ride(
        product_id=product_id,
        start_latitude=start[0],
        start_longitude=start[1],
        end_latitude=end[0],
        end_longitude=end[1],
        seat_count=2
    )
    fare = estimate.json.get('fare')

    # fake request
    api_url = "https://sandbox-api.uber.com/v1.2/requests"
    data = {
        ['fare_id']: "string",
        ['start_latitude']: start[0],
        ['start_longitude']: start[1],
        ['end_latitude']: end[0],
        ['end_longitude']: end[1],
    }

    r = requests.post(api_url)

    response = client.request_ride(
        product_id=product_id,
        start_latitude=start[0],
        start_longitude=-start[1],
        end_latitude=end[0],
        end_longitude=end[1],
        seat_count=2,
        fare_id=fare['fare_id']
    )


if __name__ == "__main__":
    # This allows us to use a plain HTTP callback
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = "1"

    app.secret_key = os.urandom(24)
    app.run(debug=True)