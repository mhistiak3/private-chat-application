const bcrypt = require("bcrypt");
const People = require("../models/People");
const jwt = require("jsonwebtoken");
const { JWT_EXP, JWT_SECRET, COOKIE_NAME } = require("../config");
const createHttpError = require("http-errors");

// HACK: get login page
const getLogin = (req, res, next) => {
  res.render("index");
};

// HACK: login the user
const login =async (req, res, next) => {
  try {
    const user =await People.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
  
    if (user && user._id) {
      const isValidPassword = bcrypt.compare(req.body.password, user.password);
      if (isValidPassword) {
        const userObject = {
          username: user.name,
          emai: user.email,
          mobile: user.mobile,
          role: "user",
        };
        const token = jwt.sign(userObject, JWT_SECRET, { expiresIn: JWT_EXP });
        // set cookie
        res.cookie(COOKIE_NAME, token, {
          maxAge: JWT_EXP,
          httpOnly: true,
          signed: true,
        });

        res.locals.loggedInUser = userObject;
        res.render("inbox");
      } else {
        throw createHttpError("Login failed! Please try again.");
      }
    } else {
      throw createHttpError("Login failed! Please try again.");
    }
  } catch (error) {
    res.render("index", {
      data: { username: req.body.username },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// HACK: Logout
const logout = (req,res,next)=>{
  res.clearCookie(COOKIE_NAME)
  
  res.send("logout")
}

module.exports = { getLogin, login, logout };
