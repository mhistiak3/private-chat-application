// dependencies
const express = require("express");
const { APP_PORT } = require("./config");

// app object
const app = express();

// Start The Server
app.listen(APP_PORT, () => {
  console.log(`Aplication start at port:${APP_PORT}`);
});
