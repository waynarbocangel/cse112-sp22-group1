require("dotenv").config();
const mongoose = require("mongoose");
const security = require(__dirname + "/../security/securityFunctions.js");
const schema = require(__dirname + "/../schema.js");


mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function createUser (email, pwd, callback) {
	schema.User.findOne({email: email}, (error, user) => {
		if (error){
			callback(error);
		} else if (user == null) {
			const newUser = new schema.User({
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
		} else {
			callback({error: "This email already has an account!"});
		}
	});
}

//createUser('abc', '123', (response) =>{console.log(response)} );


module.exports = {
	createUser: createUser
}