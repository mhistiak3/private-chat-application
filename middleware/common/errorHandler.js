const createError = require("http-errors");
const { NODE_ENV } = require("../../config");

// 404 not found Handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your requested content was not found"));
};

// default error Handler
const errorHandler = (err, req, res, next) => {
  res.locals.error =
    NODE_ENV === "development" ? err : { message: err.message };
  res.status(err.status || 500);

  if (res.locals.html) {
    res.render("error", {
      title: "Error Page",
    });
  } else {
    res.json({
      errors: {
        common: {
          msg: res.locals.error,
        },
      },
    });
  }
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
