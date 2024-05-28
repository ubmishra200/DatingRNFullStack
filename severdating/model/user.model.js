const { verify } = require("crypto");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  varifed: {
    type: Boolean,
    default: false,
  },
  verificationtoken: String,
  crushes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  recievedLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  profileImages: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  turnOns: [
    {
      type: String,
    },
  ],
  lookingFor: [
    {
      type: String,
    },
  ],
});
const User = mongoose.model("User", userSchema);
module.exports = User;
