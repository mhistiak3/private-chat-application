const dotenv = require("dotenv");
dotenv.config();
const { APP_PORT, MONGODB_CONNECTION_URL, COOKIE_SECRET, NODE_ENV, APP_NAME } =
  process.env;
module.exports = {
  APP_PORT,
  MONGODB_CONNECTION_URL,
  COOKIE_SECRET,
  NODE_ENV,
  APP_NAME,
};
