const ErrorResponse = require('../utils/errorResponse');
const path = require('path');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const User = require('../models/User');

// desc>> register user
//route GET api/v1/auth/register
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

  res.status(200).json({ success: true });
});
