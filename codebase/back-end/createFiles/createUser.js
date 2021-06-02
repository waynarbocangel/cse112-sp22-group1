require("dotenv").config();
<<<<<<< HEAD
const mongoose = require("mongoose");
const security = require(__dirname + "/../security/securityFunctions.js");
const schema = require(__dirname + "/../schema.js");
=======
var mongoose = require("mongoose");
var security = require(__dirname + "/../security/securityFunctions.js");
var schema = require(__dirname + "/../schema.js");
var newUser;
>>>>>>> front-end_drop


mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function createUser (email, pwd, callback) {
	schema.User.findOne({email: email}, (error, user) => {
		if (error){
			callback(error);
<<<<<<< HEAD
		} else if (user == null) {
			const newUser = new schema.User({
=======
		} 
		// Create a new user
		else if (user == null) {
			newUser = new schema.User({
>>>>>>> front-end_drop
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
<<<<<<< HEAD
	
=======
			
>>>>>>> front-end_drop
			newUser.save((err, user) => {
				if (err) {
					callback(err);
				} else {
					callback(user);
				}
			});
<<<<<<< HEAD
		} else {
=======
		} 
		// Email already has account
		else {
>>>>>>> front-end_drop
			callback({error: "This email already has an account!"});
		}
	});
}

<<<<<<< HEAD
//createUser('abc', '123', (response) =>{console.log(response)} );


=======
>>>>>>> front-end_drop
module.exports = {
	createUser: createUser
}