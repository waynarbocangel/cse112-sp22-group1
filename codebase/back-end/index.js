require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const deleteUser = require("./deleteFiles/deleteUser");
const createUser = require(__dirname + "/createFiles/createUser.js");
const updateUserData = require(__dirname + "/updateFiles/updateUserData.js");
const updateUser = require(__dirname + "/updateFiles/updateUser.js");
const readUser = require(__dirname + "/readFiles/readUser.js");

const app = express();

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const pouch ="node_modules/pouchdb/dist/pouchdb.min.js"
var db = new pouch.PouchDB("Users");

//to see basic db info
db.info().then(function (info) {
	console.log(info);
})

//to store document with provided id
db.put(nameOfDocObj);

//create doc and automatically give random id to it
db.post(nameOfDocObj);

app.listen("3000", () => {
	console.log("server has started listening to port 3000");
});

app.get("/createUser", (req, res) =>{
	createUser.createUser(req.query.email, req.query.pwd, (user) => {
		res.send(user);
	});
});

app.post("/updateUserData", express.json({type: '*/*'}), (req, res) =>{
	updateUserData.updateUserData(req.body, (user) => {
		res.send(user);
	});
});

app.post("/updateUser", express.json({type: '*/*'}), (req, res) =>{
	updateUser.updateUser(req.body, (user) => {
		res.send(user);
	});
});

app.post("/readUser", express.json({type: '*/*'}), (req, res) => {
	readUser.readUser(req.body, (user) => {
		res.send(user);
	});
});

app.post("/deleteUser", express.json({type: '*/*'}), (req, res) => {
	deleteUser.deleteUser(req.body, (user) => {
		res.send(user);
	});
});
