const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./models/index");
const { User, Role } = require("./models/index");

const { PORT, DB_SYNC } = require("./config/serverConfig");

const prepareAndStartServer = async function () {
  app.use("/api", apiRoutes);

  //DB sync

  if (DB_SYNC) {
    await db.sequelize.sync({ alter: true });
  }

  // const u1 = await User.findByPk(2);
  // const r1 = await Role.findByPk(2);
  // // u1.addRole(r1);
  // const response = await u1.getRoles();
  // console.log(response);

  app.listen(PORT, (req, res) => {
    console.log(`Server Started at port ${PORT}`);
  });
};

prepareAndStartServer();
