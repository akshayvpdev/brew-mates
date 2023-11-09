const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const schema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String },
    role: { type: String, enum: ["admin", "user"], defau: "user" },
    profile_id: { type: mongoose.Types.ObjectId },
    refreshToken: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

// Middleware: Pre-save hook to hash the user's password
schema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.passwordChangedAt = Date.now() - 1000;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method: Compare a candidate password with the user's hashed password
schema.methods.correctPassword = async function (
  canidatePassword,
  userPassword
) {
  return await bcrypt.compare(canidatePassword, userPassword);
};

// Method: Check if the user's password was changed after a given JWT timestamp
schema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

// Method: Create a password reset token
schema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("users", schema);
