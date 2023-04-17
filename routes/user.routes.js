let express = require("express");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let UserRouter = express.Router();
let { UserModel } = require("../models/user.model");
let { BlacklistModel } = require("../models/blacklist.model");
let { auth } = require("../middlewares/auth.middleware");

// register
UserRouter.post("/register", async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    let userexist = await UserModel.findOne({ email });
    if (userexist) {
      return res.status(400).send({ msg: "User already exist please login" });
    }
    let hashpassword = bcrypt.hashSync(password, 5);
    let user = new UserModel({ name, email, password: hashpassword, role });
    await user.save();
    res.status(200).send({ msg: "Registered Successfully" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// login
UserRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successful",
            token: jwt.sign({ userID: user._id, role: user.role }, "code", {
              expiresIn: "1m",
            }),
            refreshtoken: jwt.sign(
              { userID: user._id, role: user.role },
              "refreshcode",
              {
                expiresIn: "3m",
              }
            ),
          });
        } else {
          res.status(400).send({ msg: "Wrong credientials" });
        }
      });
    } else {
      res.status(400).send({ msg: "Email not registered yet" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// logout
UserRouter.post("/logout", auth, async (req, res) => {
  try {
    let token = req.headers.authorization;
    let blacklistedToken = new BlacklistModel({ token });
    await blacklistedToken.save();
    res.status(400).send({ msg: "Logout Successful" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// refresh token
UserRouter.post("/refreshtoken", async (req, res) => {
  try {
    let refreshtoken = req.headers.authorization;
    let decoded = jwt.verify(refreshtoken, "refreshcode");
    if (decoded) {
      let token = jwt.sign(
        { userID: decoded.userID, role: decoded.role },
        "code",
        {
          expiresIn: "1m",
        }
      );
      res.send({ token: token });
    } else {
      res.send({ msg: "invalid refresh token/refersh token expired" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  UserRouter,
};
