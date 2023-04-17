let express = require("express");
const { connection } = require("./config/db");
let { UserRouter } = require("./routes/user.routes");
let { BlogRouter } = require("./routes/blog.routes");
let { auth } = require("./middlewares/auth.middleware");
require("dotenv").config();

let app = express();
app.use(express.json());

app.use("/user", UserRouter);
app.use(auth);

app.use("/blog", BlogRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log("Not able to connect ot MongoDB");
  }
  console.log(`server is live at port ${process.env.port}`);
});
