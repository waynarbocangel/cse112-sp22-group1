require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const deleteUser = require("./deleteFiles/deleteUser");
const createUser = require(__dirname + "/createFiles/createUser.js");
const updateUser = require(__dirname + "/updateFiles/updateUser.js");
const readUser = require(__dirname + "/readFiles/readUser.js");
const security = require(__dirname + "/security/securityFunctions.js");

const app = express();

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

app.listen("3000", () => {
	console.log("server has started listening to port 3000");
});

app.get("/createUser", (req, res) =>{
	createUser.createUser(req.query.email, req.query.pwd, (user) => {
		res.send(user);
	});
});

app.post("/updateUser", express.json({type: '*/*'}), (req, res) =>{
	security.authenticate(req.body, (success) => {
		updateUser.updateUser(req.body, (user) => {
			res.send(user);
		});
	});
});

app.post("/readUser", express.json({type: '*/*'}), (req, res) => {
	security.authenticate(req.body, (success) => {
		readUser.readUser(req.body, (user) => {
			res.send(user);
		});
	});
});

app.post("/deleteUser", express.json({type: '*/*'}), (req, res) => {
	security.authenticate(req.body, (success) => {
		deleteUser.deleteUser(req.body, (user) => {
			res.send(user);
		});
	});
});
