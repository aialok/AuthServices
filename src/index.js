const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT } = require("./config/serverConfig");

const prepareAndStartServer = function () {
  app.use("/api", apiRoutes);

  app.listen(PORT, (req, res) => {
    console.log(`Server Started at port ${PORT}`);
  });
};

prepareAndStartServer();
