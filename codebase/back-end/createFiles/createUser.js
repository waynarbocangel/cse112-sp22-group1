require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("../cryptotest.js");

const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function createUser (email, pwd, callback) {
	let hashedPwd = crypto.passHash(pwd);
	const newUser = new schema.User({
		email: email,
		pwd: hashedPwd,
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
			return(user);
		}
	});
}

module.exports = {
	createUser: createUser
}

createUser('abc','hhh');
