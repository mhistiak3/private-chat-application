const jwt = require("jsonwebtoken");
const { COOKIE_NAME, JWT_SECRET } = require("../../config");

const checkLogin = (req, res, next) => {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      const token = cookies[COOKIE_NAME];
      const decode = jwt.verify(token, JWT_SECRET);
      req.user = decode;
      if (res.locals.html) {
        res.locals.loggedInUser = decode;
      }
      next();
    } catch (error) {
      if (res.locals.html) {
        res.redirect("/");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: error.message,
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(401).json({
        errors: "Athentication failed!",
      });
    }
  }
};

const redirectLoggedIn = (req, res, next) => {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookies) {
    res.redirect("/inbox");
  } else {
    next();
  }
};

module.exports = {
  checkLogin,
  redirectLoggedIn,
};
