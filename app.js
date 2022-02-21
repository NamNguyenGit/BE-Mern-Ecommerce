const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
//import routes
const userRoutes = require("./routes/user");

//app
const app = express();

//db connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

//routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
