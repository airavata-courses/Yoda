const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const routes = require("./routes/router");

app.use("/", routes);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(process.env.PORT || 3100, () => {
  console.log(`Server running in port ${process.env.PORT} successfully!`);
});
