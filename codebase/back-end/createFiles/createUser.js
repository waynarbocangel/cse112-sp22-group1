require("dotenv").config();
const e = require("express");
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function createUserPouch (db, userObject, callback) {
	console.log(userObject);
	db.put({_id: "0000", _rev: userObject._rev,
		dailyLogs: userObject.dailyLogs, 
		monthlyLogs: userObject.monthlyLogs,
		futureLogs: userObject.futureLogs,
		collections: userObject.collections,
		trackers: userObject.trackers,
		textBlocks: userObject.textBlocks,
		taskBlocks: userObject.taskBlocks,
		eventBlocks: userObject.eventBlocks,
		signifiers: userObject.signifiers}, (err, res) => {
		if (err) {
			console.log(err);//err when i use callback
		} else {
			console.log(res);//err when i use callback
		}
	});
}

function createUser (db, email, pwd, callback) {
	const newUser = {
		email: email,
		pwd: pwd,
		dailyLogs: [],
		monthlyLogs: [],
		futureLogs: [],
		trackers: [],
		collections: [],
		textBlocks: [],
		eventBlocks: [],
		taskBlocks: [],
		signifiers: []
	};
	newUserSchema = new schema.User(newUser);
	newUserSchema.save((err, user) => {
		if (err) {
			callback(err);
		} else {
			callback(user);
		}
	});
	schema.User.findOne({email: email}, (error, user) => {
		if (error) {
			return callback(error);
		} else {
			createUserPouch(db, user, (res) => {
				callback(res);
			});
		}
	});
	//	newUser.pwd = hash(newUser.pwd);
}

module.exports = {
	createUser: createUser,
	createUserPouch: createUserPouch
}
