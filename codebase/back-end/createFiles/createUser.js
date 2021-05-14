require("dotenv").config();
const e = require("express");
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function createUserPouch (db, userObject, callback) {
	db.post(userObject, (err, res) => {
		if (err) {
			return callback(err);
		} else {
			/*db.get(res.id, (err, doc) => {
				if (err) {
					callback(err);
				} else {
					db.put({
						_id: "0000",
						_rev: doc._rev
					})
					callback(doc);
				}
			})*/
			return callback(res);
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
	createUserPouch(db, newUser, (res) => {
		callback(res);
	});
	//	newUser.pwd = hash(newUser.pwd);

	newUserSchema.save((err, user) => {
		if (err) {
			callback(err);
		} else {
			callback(user);
		}
	});
}

module.exports = {
	createUser: createUser,
	createUserPouch: createUserPouch
}
