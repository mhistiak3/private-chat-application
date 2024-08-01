// dependencies
const bcrypt = require("bcrypt");
const fs = require("fs");
const People = require("../models/People");

// HACK: get users
const getUsers = async (req, res, next) => {
  try {
    const users = await People.find().select("-password");
    res.render("users", { users });
  } catch (error) {
    next(error);
  }
};
// HACK: add user
const addUser = async (req, res, next) => {
  const { password } = req.body;
  let newUser;
  let hashedPassword = await bcrypt.hash(password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new People({
      ...req.body,
      password: hashedPassword,
      avatar: req.files[0].filename,
    });
  } else {
    newUser = new People({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    
    await newUser.save();
  
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
       console.log(error.message);
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// HACK: remove user
const removeUser = async (req, res, next) => {
  try {
    const user =await People.findByIdAndDelete({
      _id: req.params.id,
    });
    if(user.avatar){
      fs.unlink(`${appRoote}/public/uploads/avatars/${user.avatar}`, (err) => {
        if (err) console.log(err);
      });
    }
    res.json({
      message:"User was removed successfully"
    })
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};
module.exports = { getUsers, addUser, removeUser };
