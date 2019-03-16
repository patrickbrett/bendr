from uber_rides.session import Session
from uber_rides.client import UberRidesClient
import requests
import webbrowser
import oauth2

session = Session(server_token="CUofQlGNUbYK3x9FjX0AtlFjEJCak4O59V61YeGs")
client = UberRidesClient(session)

# get user to log in
url = "https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=bNuMgUk4XDsvlVbnnLtJwwEitiflHMPG&scope" \
      "=history+history_lite+places+profile+request_receipt&redirect_uri=http://localhost:3000"
webbrowser.open(url)
print()


# Get products for a location
response = client.get_products(37.77, -122.41)
products = response.json.get('products')

product_id = products[0].get('product_id')

# Get upfront fare and start/end locations
estimate = client.estimate_ride(
    product_id=product_id,
    start_latitude=37.77,
    start_longitude=-122.41,
    end_latitude=37.79,
    end_longitude=-122.41,
    seat_count=2
)
fare = estimate.json.get('fare')

# Request a ride with upfront fare and start/end locations
response = client.request_ride(
    product_id=product_id,
    start_latitude=37.77,
    start_longitude=-122.41,
    end_latitude=37.79,
    end_longitude=-122.41,
    seat_count=2,
    fare_id=fare['fare_id']
)

request = response.json
request_id = request.get('request_id')

# Request ride details using `request_id`
response = client.get_ride_details(request_id)
ride = response.json

# Cancel a ride
response = client.cancel_ride(request_id)
ride = response.json