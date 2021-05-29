require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const deleteUser = require(__dirname + "/deleteFiles/deleteUser.js");
const createUser = require(__dirname + "/createFiles/createUser.js");
const updateUser = require(__dirname + "/updateFiles/updateUser.js");
const readUser = require(__dirname + "/readFiles/readUser.js");
const security = require(__dirname + "/security/securityFunctions.js");

const app = express();
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

app.listen("3000", () => {
	console.log("server has started listening to port 3000");
});


app.post("/createUser", express.json({type: "*/*"}), (req, res) =>{
	createUser.createUser(req.body.email, req.body.pwd, (user) => {
		res.send(user);
	});
});

app.post("/updateUser", express.json({type: "*/*"}), (req, res) =>{
	security.authenticate(req.body, (success) => {
		if (success) {
			updateUser.updateUser(req.body, (user) => {
				res.send(user);
			});
		} else {
			res.send(JSON.stringify({error: "failed authentication"}));
		}
	});
});

app.post("/readUser", express.json({type: "*/*"}), (req, res) => {
	security.authenticate(req.body, (success) => {
		if (success) {
			readUser.readUser(req.body, (user) => {
				console.log(user);
				res.send(user);
			});
		} else {
			res.send(JSON.stringify({error: "failed authentication"}));
		}
	});
});

app.post("/deleteUser", express.json({type: "*/*"}), (req, res) => {
	security.authenticate(req.body, (success) => {
		if (success) {
			deleteUser.deleteUser(req.body, (user) => {
				res.send(user);
			});
		} else {
			res.send(JSON.stringify({error: "failed authentication"}));
		}
	});
});
