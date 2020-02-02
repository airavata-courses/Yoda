const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config()

//Database connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("DB connected!")
})

mongoose.connection.on('error', err =>{
    console.log(`DB connection error: ${err.message}`);
});




app.get("/", (req,res) =>{
    res.send("Hello");
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A node Js api is listening on port number: ${port}`);  
})