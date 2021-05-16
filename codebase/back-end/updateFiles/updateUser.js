require("dotenv").config();
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function  updateUserPouch(db, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			console.log(doc);
			updateUser(doc, (res) => {
				callback(res);
			});
		}
	});
}

function updateUser(userObject2, callback){
	console.log(userObject2);
	schema.User.findOne({email: userObject2.userObject.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			console.log(user);
			user.email = userObject2.email;
			user.pwd = userObject2.pwd;
			user.dailyLogs = userObject2.dailyLogs;
			user.monthlyLogs = userObject2.monthlyLogs;
			user.futureLogs = userObject2.futureLogs;
			user.collections = userObject2.collections;
			user.trackers = userObject2.trackers;
			user.textBlocks = userObject2.textBlocks;
			user.taskBlocks = userObject2.taskBlocks;
			user.eventBlocks = userObject2.eventBlocks;
			user.signifiers = userObject2.signifiers;

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
	updateUser: updateUser,
	updateUserPouch: updateUserPouch
};
