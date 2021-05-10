require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const schema2 = require(__dirname + "/schema.js");

const app = express();

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

/*app.get("/", (request, response) => {
	let man = {
		age: 50
	}
	response.send(man);
});*/

//register

//login

//get

//create

//read

//update

//delete
/*
app.get("/ohboy", (req, res) =>{
	res.redirect("/");
});


app.post("/", (req, res) =>{

});

app.listen(3000, () => {
	console.log("I have started listening in the port 3000");
});
*/