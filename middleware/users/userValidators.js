const fs = require("fs");
const { check, validationResult } = require("express-validator");
const People = require("../../models/People");
const createHttpError = require("http-errors");

const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other then alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (email) => {
      try {
        const user = await People.find({ email });
        
        if (user.length > 0) {
          throw createHttpError("Email is already use");
        }
      } catch (error) {
        throw createHttpError(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be a Bangladeshi valid mobile number.")
    .custom(async (mobile) => {
      try {
        const user = await People.find({ mobile });
        if (user.length > 0) {
          throw createHttpError("Mobile number is already use");
        }
        
      } catch (error) {
        throw createHttpError(error.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 symbol & 1 number"
    ),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped()

  
  if (Object.keys(mappedError).length > 0) {
    // remove uploded image
    if (req.files.length > 0) {
      fs.unlink(
        `${appRoote}/public/uploads/avatars/${req.files[0].filename}`,
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(422).json({
      errors: mappedError,
    });
  } else {
    
    next();
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
