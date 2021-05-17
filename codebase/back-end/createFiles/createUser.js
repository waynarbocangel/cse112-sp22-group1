require("dotenv").config();
const mongoose = require("mongoose");
const security = require(__dirname + "/../security/securityFunctions.js");
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
