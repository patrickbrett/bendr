const Loader = require("./Loader");
const ApiHandler = require("./ApiHandler");

const routes = (app) => {
    app.get("/service/session/:sessionUrl", Loader.loadSession);
    app.get("/service/checkin/:sessionId", Loader.loadCheckin);

    app.post("/api/session", ApiHandler.createSession);
    app.post("/api/checkin", ApiHandler.createCheckin);
}

module.exports = routes;