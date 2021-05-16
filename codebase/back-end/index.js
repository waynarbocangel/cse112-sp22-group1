require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

app.get(__dirname + "/createUser.js", (req, res) =>{
	res.redirect(__dirname + "/index.js");
});
