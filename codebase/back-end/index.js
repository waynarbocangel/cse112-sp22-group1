require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const schema = require(__dirname + "/schema.js");
const app = express();

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

app.get(__dirname + "/createUser.js", (req, res) =>{
	res.redirect(__dirname + "/index.js");
});


/*
USER.find(function(err, users){
	if(err){
		console.log(err);
	}else{
		console.log(users);
	}
}*/

//register

//login

//get

//create

//read

//update

//delete
/*

app.listen(3000, () => {
	console.log("I have started listening in the port 3000");
});
*/
