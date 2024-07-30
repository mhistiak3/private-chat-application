const dotenv = require("dotenv");
dotenv.config();
const { APP_PORT } = process.env;
module.exports = { APP_PORT };
