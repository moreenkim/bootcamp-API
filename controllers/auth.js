const ErrorResponse = require('../utils/errorResponse');
//const path = require('path');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const User = require('../models/User');

// desc>> register user
//route POST api/v1/auth/register
//access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //CCREATE TOKEN
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// desc>> login user
//route POST api/v1/auth/login
//access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email and password
  if (!email || !password) {
    return next(
      new ErrorResponse('please provide and email and password', 400)
    );
  }

  //check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('invalid credentials', 401));
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('invalid credentials', 401));
  }

  //CCREATE TOKEN
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
