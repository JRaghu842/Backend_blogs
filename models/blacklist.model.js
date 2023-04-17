let mongoose = require("mongoose");

let BlacklistSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

let BlacklistModel = mongoose.model("blacklist", BlacklistSchema);

module.exports = {
  BlacklistModel,
};
