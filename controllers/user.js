const User = require("../models/user");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signUp = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signIn = (req, res) => {
  //find user base on email
  const { email, passord } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User with that email does not exist. Please sign up",
      });
    }
    // if user is found make sure the email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match.",
      });
    }
    //generate a  signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as "t" in cookie with expire date
    res.cookie("t", token, { expire: new Date() + 99999 });
    // return response with user and token to FE client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};
