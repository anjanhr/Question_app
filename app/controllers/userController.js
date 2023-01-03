const { pick } = require("lodash");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {};

userController.register = (request, response) => {
  const body = pick(request.body, ["userName", "email", "password"]);
  const user = new User(body);

  bcrypt.genSalt().then((salt) => {
    bcrypt.hash(user.password, salt).then((encrypted) => {
      user.password = encrypted;
      user
        .save()
        .then((users) => {
          response.json(users);
        })
        .catch((error) => {
          if (error.message.includes("11000")) {
            return response.json({ emailError: "Email already exists!" });
          } else {
            return response.json({ mainError: error.message });
          }
        });
    });
  });
};

userController.login = (request, response) => {
  const body = request.body;

  User.findOne({ email: body.email }).then((users) => {
    if (users) {
      bcrypt.compare(body.password, users.password).then((result) => {
        if (result) {
          const tokenData = {
            _id: users._id,
            email: users.email,
            userName: users.userName,
            role: users.role,
          };
          const tokenKey = process.env.SECRET_KEY;
          const token = jwt.sign(tokenData, tokenKey, {
            expiresIn: "2d",
          });
          return response.json({
            token: `Bearer ${token}`,
          });
        } else {
          return response.json({ error: "Invalid Email or Password" });
        }
      });
    } else {
      return response.json({ error: "Invalid Email or Password" });
    }
  });
};

userController.account = (request, response) => {
  response.json(request.tokenData);
};

module.exports = userController;
