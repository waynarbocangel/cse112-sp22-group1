require("dotenv").config();
const express = require("express");
const deleteUser = require(__dirname + "/deleteFiles/deleteUser");
const createUser = require(__dirname + "/createFiles/createUser.js");
const updateUser = require(__dirname + "/updateFiles/updateUser.js");
const readUser = require(__dirname + "/readFiles/readUser.js");

const app = express();


mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const pouch ="node_modules/pouchdb/dist/pouchdb.min.js"
var PouchDB = require("pouchdb");
var db = new PouchDB("Users");

app.listen("3000", () => {
	console.log("server has started listening to port 3000");
});

app.get("/createUser", (req, res) =>{

	createUser.createUser(db, req.query.email, req.query.pwd, (user) => {
		res.send(user);
	});
});

app.post("/updateUser", express.json({type: '*/*'}), (req, res) =>{
	updateUser.updateUser(req.body, (user) => {
		return res.send(user);
	});
});

app.post("/readUser", express.json({type: '*/*'}), (req, res) => {
	readUser.readUser(req.body, (user) => {
		return res.send(user);
	});
});

app.post("/deleteUser", express.json({type: '*/*'}), (req, res) => {
	deleteUser.deleteUser(db, req.body, (user) => {
		return res.send(user);
	});
});
