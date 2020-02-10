const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

dotenv.config()

//Database connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("DB connected!")
})

mongoose.connection.on('error', err =>{
    console.log(`DB connection error: ${err.message}`);
});

//bring in routes
const authRoutes = require("./routes/auth")

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:8080/signup");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", authRoutes);
app.use(allowCrossDomain);


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A node Js api is listening on port number: ${port}`);  
})