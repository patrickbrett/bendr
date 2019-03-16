const MapsHandler = require("./MapsHandler");
const TravellingDrunkard = require("./TravellingDrunkard");

const routes = app => {
  app.get("/service/bars", MapsHandler.loadBars);
  app.get("/service/camera", MapsHandler.moveCamera);
  app.get("/service/travellingDrunkard", TravellingDrunkard.calculateRoute);
};

module.exports = routes;