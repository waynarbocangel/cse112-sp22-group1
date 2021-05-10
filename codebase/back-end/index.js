require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true});

mongoose.set("useCreateIndex", true);

let clientSchema = new mongoose.Schema({
	email: String,
	password: String
});

const Client = new mongoose.model("Client", clientSchema);

app.get("/", (request, response) => {
	let man = {
		age: 50
	}
	let newClient = new Client();
	response.send(man);
});

app.get("/ohboy", (req, res) =>{
	res.redirect("/");
});

app.listen(3000, () => {
	console.log("I have started listening in the port 3000");
});
