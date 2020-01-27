const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Weather App");
});

app.listen(8000, () => {
  console.log("Server running in port 8000 successfully!");
});
