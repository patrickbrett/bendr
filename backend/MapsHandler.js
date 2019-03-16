const { apiKey } = require("../frontend/apiKey");
const fetch = require("node-fetch");

const MapsHandler = {
  loadBars: (req, res, next) => {
    console.log(req.body);

    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&radius=1000&location=-37.812609,144.958966&keyword=bar`
    ).then(fetchRes => {
      fetchRes.json().then(json => {
        console.log(json);
        res.send(json);
      });
    });
  }
};

module.exports = MapsHandler;
