let express = require("express");

let { BlogsModel } = require("../models/blog.model");
let { authorize } = require("../middlewares/authorize");
let BlogRouter = express.Router();

// to get only perticular user'e blogs
BlogRouter.get("/view", authorize(["User"]), async (req, res) => {
  let user = req.body.user;
  try {
    let blogs = await BlogsModel.find({ user });
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

BlogRouter.get("/create", authorize(["User"]), async (req, res) => {
  let payload = req.body;
  try {
    let blogs = new BlogsModel(payload);
    await blogs.save();
    res.status(200).send({ msg: "new blog created" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

BlogRouter.get("/delete/:id", authorize(["User"]), async (req, res) => {
  let { id } = req.params;
  try {
    await BlogsModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "blog is deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// to see all blogs by Moderator
BlogRouter.get("/view_all", authorize(["Moderator"]), async (req, res) => {
  try {
    let blogs = await BlogsModel.find();
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  BlogRouter,
};
