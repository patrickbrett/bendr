const apiKey = "AIzaSyDkOVkEJ5MbMDJN3VsqxwdH-LvY9F3c0kA";
const fetch = require("node-fetch");

exports.handler = (event, context, callback) => {
  let { lat, lng, hangoverMode } = event;

  fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&radius=3000&location=${lat},${lng}&keyword=${hangoverMode === "true" ? "cafe" : "bar"}`
  ).then(fetchRes => {
    fetchRes.json().then(json => {
      callback(json);
    });
  });
};