require("dotenv").config();
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const pouch ="node_modules/pouchdb/dist/pouchdb.min.js"

function createUserPouch (email, pwd, callback) {
	const newUser = new schema.User({
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
	});

	db.post(newUser);
	createUser(email, pwd, (erorr, user) => {
		if (error) {
			callback(error);
		} else {
			callback(user);
		}
	});
}

function createUser (email, pwd, callback) {

	const newUser = new schema.User({
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
	});

	newUser.save((err, user) => {
		if (err) {
			callback(err);
		} else {
			callback(user);
		}
	});
}

module.exports = {
	createUser: createUser
}
