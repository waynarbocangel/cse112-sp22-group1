require("dotenv").config();
const e = require("express");
const express = require("express");
const mongoose = require("mongoose");
const deleteUser = require(__dirname + "/deleteFiles/deleteUser");
const createUser = require(__dirname + "/createFiles/createUser.js");
const updateUser = require(__dirname + "/updateFiles/updateUser.js");
const readUser = require(__dirname + "/readFiles/readUser.js");
const createDailyLog = require(__dirname + "/createFiles/createDailyLog.js");

const app = express();


mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const pouch ="node_modules/pouchdb/dist/pouchdb.min.js"
var PouchDB = require("pouchdb");
var db = new PouchDB("Users");

app.listen("3000", () => {
	console.log("server has started listening to port 3000");
});

app.get("/deleteDB", (req, response) => {
	db.destroy( (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});
	db.info( (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});
})

app.get("/createUser", (req, res) =>{
	createUser.createUser(db, req.query.email, req.query.pwd, (user) => {
		res.send(user);
	});
});
app.get("/createDailyLog", (req, res) => {
	createDailyLog.createDailyLogPouch(db, userID, parent, content, dailyLength, trackers);
})

app.post("/updateUser", express.json({type: '*/*'}), (req, res) =>{
	updateUser.updateUserPouch(db, req.body, (user) => {
		return res.send(user);
	});
});

app.get("/updateUser", (req, res) => {
	updateUser.updateUserPouch(db, (user) => {
		res.send(user);
	})
})

app.post("/readUser", express.json({type: '*/*'}), (req, res) => {
	readUser.readUser(req.body, (user) => {
		return res.send(user);
	});
});

app.post("/deleteUser", express.json({type: '*/*'}), (req, res) => {
	deleteUser.deleteUser(db, (user) => {
		return res.send(user);
	});
});
