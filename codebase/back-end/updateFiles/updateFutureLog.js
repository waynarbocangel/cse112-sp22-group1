require("dotenv").config();
const mongoose = require("mongoose");

const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function updateFutureLog (userObject, callback) {
	schema.User.findOne({email: userObject.email}, (error, user) => {
		if (err) {
			callback(err);
		} else {
			user.futureLogs = userObject.futureLogs;

			user.save((err, userObject) => {
				if (err) {
					callback(err);
				} else {
					callback(userObject);
				}
			});
		}
	});
	
}

module.exports = {
	updateFutureLog: updateFutureLog
}
