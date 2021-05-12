require("dotenv").config();
const mongoose = require("mongoose");

const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function createUser (email, pwd, callback) {
	const userObject = {
		email: email,
		pwd: pwd
	};

	const newUser = new schema.User({
		userData: userObject,
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
