const MapsHandler = require("./MapsHandler");

const routes = app => {
  app.get("/service/bars", MapsHandler.loadBars);
};

module.exports = routes;
