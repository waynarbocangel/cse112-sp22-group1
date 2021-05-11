require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const schema = require(__dirname + "/schema.js");
const app = express();

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function makeUser(userName, email, pwd){
	//hash emailthingy and pwdthingy

	const userObject = {
    	email: "hashed email", 
    	pwd: "hashed pwd"
	};

	const newUser= new schema.User({
    	userData: user_object
	});

	newUser.save((err, us) => {
    	if (err) return console.error(err);
	});
}