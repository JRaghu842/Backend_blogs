let jwt = require("jsonwebtoken");

let { BlacklistModel } = require("../models/blacklist.model");

let auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    let isBlacklisted = await BlacklistModel.findOne({ token });

    if (isBlacklisted) {
      res.status(400).send({ msg: "please login again" });
    } else if (token) {
      let decoded = jwt.verify(token, "code");
      if (decoded) {
        req.body.user = decoded.userID;
        req.body.Role = decoded.role;
        next();
      } else {
        res.status(400).send({ msg: "Wrong credentials" });
      }
    } else {
      res.status(400).send({ msg: "please login " });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  auth,
};
