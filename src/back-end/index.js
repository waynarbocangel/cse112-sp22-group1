require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const deleteUser = require(__dirname + "/deleteFiles/deleteUser.js");
const createUser = require(__dirname + "/createFiles/createUser.js");
const updateUser = require(__dirname + "/updateFiles/updateUser.js");
const readUser = require(__dirname + "/readFiles/readUser.js");
const security = require(__dirname + "/security/securityFunctions.js");

/* Initialize Express */
const app = express();
app.use(express.json({limit: "50mb", extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

/* Connect to the databse once in our startup code */
mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

/* Listen for connection on port 2827 */
app.listen("2827", () => {
	console.log("server has started listening to port 2827");
});

/* Defines the /createUser route for creating users */
app.post("/createUser", express.json({type: "*/*"}), (req, res) =>{
	createUser.createUser(req.body.email, req.body.pwd, (user) => {
		res.send(user);
	});
});

/* Defines the /updateUser route for updating user information */
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

/* Defines the /readUser route for querying user info */
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

/* Defines the /deleteUser route for deleting a user */
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
