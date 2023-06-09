const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const sendMail = require("../utils/sendMail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    // const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    console.log('after create')

    // commented out here 20230328 temporarily because it causes 401 authentication error
    // sendToken(user, 201, res);

    res.status(200).json({
      success: true,
      message: "Registration success",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("email: " + email)
  console.log("password: " + password)

  if (!email || !password) {
    console.log('err on !email || !password')
    return next(new ErrorHandler("Please enter the email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  console.log("user: " + user)

  if (!user) {
    console.log('err on !user')
    return next(
      new ErrorHandler("User is not find with this email & password", 401)
    );
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    console.log('err on isPasswordMatched')
    return next(
      new ErrorHandler("User is not find with this email & password", 401)
    );
  }

  // commented out here 20230328 temporarily because it causes 401 authentication error
  // sendToken(user, 201, res);

  res.status(200).json({
    success: true,
    message: "Log in success",
    user
  });
});

//  Log out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get ResetPassword Token

  const resetToken = user.getResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Create Token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password url is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password is not matched with the new password", 400)
    );
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//  Get user Details
exports.userDetails = catchAsyncErrors(async (req, res, next) => {

  console.log('id: ' + req.user.id)
  const user = await User.findById(req.user.id);

  console.log('user: ' + user)

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Old Password is incorrect", 400)
    );
  };

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password not matched with each other", 400)
    );
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar
  };

  // if (req.body.avatar !== "") {
  //   const user = await User.findOne({ email: newUserData.email });

  //   if (user.avatar.public_id) {
  //     const imageId = user.avatar.public_id;
  //     await cloudinary.v2.uploader.destroy(imageId);
  //   }

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });
  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }

  // console.log('after image stuff')

  // const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
  //   new: true,
  //   runValidator: true,
  //   useFindAndModify: false,
  // });

  // console.log('after update 1')

  const update = { name: newUserData.name, role: req.body.role, avator: newUserData.avatar }
  const user = await User.findOneAndUpdate({ email: newUserData.email }, update);

  console.log('after update ')

  res.status(200).json({
    success: true,
    user
  });
});

// Get All users ---Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User Details ---Admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User is not found with this id", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Change user Role --Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user
  })
});

// Delete User ---Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id);

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  if (!user) {
    return next(new ErrorHandler("User is not found with this id", 400));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  })
});
