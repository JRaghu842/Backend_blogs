let mongoose = require("mongoose");

let userShcema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
      default: "User",
      enum: ["User", "Moderator"],
    },
  },
  {
    versionKey: false,
  }
);

let UserModel = mongoose.model("user", userShcema);

module.exports = {
  UserModel,
};
