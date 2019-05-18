const apiKey = "AIzaSyDkOVkEJ5MbMDJN3VsqxwdH-LvY9F3c0kA";
const fetch = require("node-fetch");

exports.handler = (event, context, callback) => {
  let { searchTerm } = event;
  if (!searchTerm) {
    searchTerm = "Melbourne";
  }

  //Make request to geocoding API
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&region=au&address=${searchTerm}`
  ).then(fetchRes => {
    fetchRes.json().then(json => {
      callback(json);
    });
  });
};