const express = require("express");

const app = express();
const { PORT } = require("./config/serverConfig");
const prepareAndStartServer = function () {
  app.listen(PORT, (req, res) => {
    console.log(`Server Started at port ${PORT}`);
  });
};

prepareAndStartServer();
