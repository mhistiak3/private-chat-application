// dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { APP_PORT, MONGODB_CONNECTION_URL, COOKIE_SECRET } = require("./config");
const cookieParser = require("cookie-parser");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const loginRouter = require("./routers/loginRouter");
const usersRouter = require("./routers/usersRouter");
const inboxRouter = require("./routers/inboxRouter");

// app object
const app = express();

// HACK: Database connection
mongoose
  .connect(MONGODB_CONNECTION_URL)
  .then(() => console.log("MongoDB Conection success"))
  .catch((err) => console.log(err));

// Request Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookie
app.use(cookieParser(COOKIE_SECRET));

// HACK: Application Routers
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found Handler
app.use(notFoundHandler);

// default error Handler
app.use(errorHandler);

// Start The Server
app.listen(APP_PORT, () => {
  console.log(`Aplication start at port:${APP_PORT}`);
});
