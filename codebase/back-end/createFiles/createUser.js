require("dotenv").config();
const e = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD
const crypto = require("../cryptotest.js");back-end_drop
=======
const security = require(__dirname + "/../security/securityFunctions.js");
>>>>>>> back-end_drop
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);
function createUser (email, pwd, callback) {
	const newUser = new schema.User({
		email: email,
		pwd: security.passHash(pwd),
		dailyLogs: [],
		monthlyLogs: [],
		futureLogs: [],
		trackers: [],
		collections: [],
		textBlocks: [],
		eventBlocks: [],
		taskBlocks: [],
		signifiers: []
	});
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
