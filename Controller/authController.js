const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const User = require("../Model/User");
const sendEmail = require("../utils/email");
const { default: mongoose } = require("mongoose");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");
const Profile = require("../Model/Profile");

// Function to sign a JWT token
const signToken = (id, role) => {
  const accessToken = jwt.sign({ id, role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

// Exported function to handle user signup
module.exports.signup = catchAsync(async (req, res, next) => {
  if (!req.body.username) req.body.username = req.body.email;
  const newUser = new Profile(req.body);
  const token = signToken(newUser._id, newUser.role);
  newUser.payload = req.body;
  newUser.payload.refreshToken = token.refreshToken;
  await newUser.save();

  res.status(200).json({ data: token, message: "Success" });
});

// Exported function to handle user login
module.exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError("Please Provide username and password", 400));
  }
  const user = await User.findOne({ username });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect username or password", 401));
  }
  const token = signToken(user._id, user.role);
  user.refreshToken = token.refreshToken;
  await user.save();

  res.status(200).json({ data: token, message: "Success" });
});

// Exported function to handle user logout
module.exports.logout = (req, res, next) => {
  try {
    // Check if the "jwt" cookie is present
    if (req.cookies.jwt) {
      // Clear the JWT token from the cookie
      res.clearCookie("jwt");
    }

    // Check if the Authorization header is present
    if (req.headers.authorization) {
      const [bearer, token] = req.headers.authorization.split(" ");
      if (bearer === "Bearer" && token) {
        // Clear the Authorization header (Bearer token)
        req.headers.authorization = "";
      }
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    return next(error);
  }
};

// Exported function to protect routes with JWT authentication
module.exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_ACCESS_SECRET
  );

  // 3) Check if user still exists
  const currentUser = await User.findOne({ profile_id: decoded.id });
  const userData = await Profile.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = userData;
  next();
});

// Exported function to restrict access to specific roles
module.exports.restrictTo = function restrictTo(req, res, next, roles) {
  try {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Exported function to handle the "forgot password" functionality
module.exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/auth/resetPassword/${resetToken}`;

    const message = `Forgot your password? Use the link to reset your password: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    await sendEmail({
      email: user.username,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

// Exported function to handle the "reset password" functionality
module.exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  const token = signToken(user._id, user.role);
  user.refreshToken = token.refreshToken;
  await user.save();

  res.status(200).json({ data: token, message: "Success" });
});

// Exported function to handle updating the user's password
module.exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user._id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;

  // 4) Log user in, send JWT
  const token = signToken(user._id, user.role);
  user.refreshToken = token.refreshToken;
  await user.save();

  res.status(200).json({ data: token, message: "Success" });
});

module.exports.refreshToken = catchAsync(async (req, res, next) => {
  let token;
  if (!req.body.token) {
    return next(new AppError("No refresh token passed", 401));
  }
  token = req.body.token;

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_REFRESH_SECRET
  );

  // 3) Check if user still exists
  const currentUser = await User.findOne({
    _id: new mongoose.Types.ObjectId(decoded.id),
    refreshToken: token,
  });

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  const newToken = signToken(currentUser._id, currentUser.role);
  currentUser.refreshToken = newToken.refreshToken;
  currentUser.save();

  res.status(200).json({ data: newToken, message: "success" });
});
