const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();
//import routes
const authRoutes = require("./routes/auth");

//app
const app = express();

//db connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//routes middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
