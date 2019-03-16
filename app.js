const express = require("express");
const path = require("path");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require("./backend/routes");
const port = 2045;

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public", "index.html"))
);

app.get(/^\/\w{6}$/, (req, res) =>
    res.sendFile(path.join(__dirname, "./public", "index.html"))
);

routes(app);

app.use(express.static("public"));

app.listen(port, () => console.log(`Site live at http://localhost:${port}`));