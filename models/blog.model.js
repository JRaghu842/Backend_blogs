let mongoose = require("mongoose");

let blogsSchema = mongoose.Schema(
  {
    title: { type: String },
    body: { type: String },
    user: { type: String },
  },
  {
    versionKey: false,
  }
);

let BlogsModel = mongoose.model("blog", blogsSchema);

module.exports = {
  BlogsModel,
};
