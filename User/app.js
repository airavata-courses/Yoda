const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");

dotenv.config();

//Database connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB connected!");
  });

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

//bring in routes
const authRoutes = require("./routes/auth");

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", authRoutes);

const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`A node Js api is listening on port number: ${port}`);
});
