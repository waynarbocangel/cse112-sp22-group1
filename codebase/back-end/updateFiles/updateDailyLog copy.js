require("dotenv").config();
const mongoose = require("mongoose");

const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function updateDailyLogPouch (db, dailyLog, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.put({_rev: doc._rev, email: 
					doc.userObject.email, 
					pwd: doc.userObject.pwd, 
					dailyLogs}, (res) => {
				updateUser(doc, (res) => {
					callback(res);
				});
			});
		}
	});
}

function updateDailyLog (userObject, callback) {
	schema.User.findOne({email: userObject.userObject.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			user.dailyLogs = userObject.dailyLogs;
			
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
	updateDailyLog: updateDailyLog
}
