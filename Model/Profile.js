const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { gender, sexualOrientation } = require("../utils/Constants");
const User = require("./User");

const schema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    phone_number: { type: Number },
    gender: { type: String, enum: Object.keys(gender) },
    interest: [String],
    sexual_orientation: { type: String, enum: Object.keys(sexualOrientation) },
    images: [String],
    requested_ids: { type: mongoose.Types.ObjectId, ref: "profiles" },
    accepted_ids: { type: mongoose.Types.ObjectId, ref: "profiles" },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { versionKey: false, timestamps: true }
);

// Middleware: Pre-save hook to create user
schema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const payload = this.payload;
      payload.username = this.email;
      payload.profile_id = this._id;

      await new User(payload).save();
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("profiles", schema);
