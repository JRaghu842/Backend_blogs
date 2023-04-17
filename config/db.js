let mongoose = require("mongoose");
require("dotenv").config();

let connection = mongoose.connect(process.env.MongoURL);

module.exports = {
  connection,
};
