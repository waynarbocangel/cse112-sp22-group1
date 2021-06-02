require("dotenv").config();
var mongoose = require("mongoose");
var security = require(__dirname + "/../security/securityFunctions.js");
var schema = require(__dirname + "/../schema.js");
var newUser;


mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function createUser (email, pwd, callback) {
	schema.User.findOne({email: email}, (error, user) => {
		if (error){
			callback(error);
		} 
		// Create a new user
		else if (user == null) {
			newUser = new schema.User({
				email: email,
				pwd: security.passHash(pwd),
				index: {
					objectType: "index",
					contents: []
				},
				dailyLogs: [],
				monthlyLogs: [],
				futureLogs: [],
				trackers: [],
				collections: [],
				textBlocks: [],
				events: [],
				tasks: [],
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
		// Email already has account
		else {
			callback({error: "This email already has an account!"});
		}
	});
}

module.exports = {
	createUser: createUser
}