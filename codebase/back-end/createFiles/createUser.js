require("dotenv").config();
const mongoose = require("mongoose");
const security = require(__dirname + "/../security/securityFunctions.js");
const schema = require(__dirname + "/../schema.js");


mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

/**
 * Creates a user in the remote db.
 *
 * @param {String} email The email of the new user.
 * @param {String} pwd The pwd of the new user.
 * @callback (error) Sends an error if there is one.
 */
function createUser (email, pwd, callback) {
	schema.User.findOne({email: email}, (error, user) => {
		if (error){
			callback(error);
		} else if (user == null) {
			const newUser = new schema.User({
				email: email,
				pwd: security.passHash(pwd),
				theme: "lightmode",
				index: {
					objectType: "index",
					contents: []
				},
				dailyLogs: [],
				monthlyLogs: [],
				futureLogs: [],
				trackers: [],
				collections: [],
				imageBlocks: [],
				audioBlocks: [],
				textBlocks: [],
				events: [],
				tasks: [],
				signifiers: [{
					id: makeid(),
					objectType: "signifier",
					meaning: "general",
					symbol: "&#x1F7E0;"
				}]
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

/**
 * Makes and returns a randomly generated id of length 30.
 * @return Returns the randome generated id of length 30.
 */
function makeid() {
	let length = 30;
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

module.exports = {
	createUser: createUser
}