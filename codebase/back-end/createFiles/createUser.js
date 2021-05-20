require("dotenv").config();
const mongoose = require("mongoose");
const security = require(__dirname + "/../security/securityFunctions.js");
const schema = require(__dirname + "/../schema.js");


mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function createUser (email, pwds, callback) {
	const newUser = new schema.User({
		email: email,
		pwd: security.passHash(pwds),
		//pwd: pwd,
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

createUser('abc', '123', (response) =>{console.log(response)} );


module.exports = {
	createUser: createUser
}
