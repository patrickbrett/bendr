const { apiKey } = require("../frontend/apiKey");
const fetch = require("node-fetch");

const MapsHandler = {
  moveCamera: (req, res, next) => {
    let { searchTerm } = req.query;
    if (!searchTerm) {
      searchTerm = "Melbourne";
    }

    //Make request to geocoding API
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&region=au&address=${searchTerm}`
    ).then(fetchRes => {
      fetchRes.json().then(json => {
        const { lat, lng } = json.results[0].geometry.location;
        res.send(json);
      });
    });
  },
  loadBars: (req, res, next) => {
    let { lat, lng, hangoverMode } = req.query;

    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&radius=3000&location=${lat},${lng}&keyword=${hangoverMode === "true" ? "cafe" : "bar"}`
    ).then(fetchRes => {
      fetchRes.json().then(json => {
        res.send(json);
      });
    });
  }
};

module.exports = MapsHandler;
