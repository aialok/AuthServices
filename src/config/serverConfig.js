const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT: process.env.SALT,
  JWT_TOKEN: process.env.JWT_TOKEN,
  DB_SYNC: process.env.DB_SYNC,
};
