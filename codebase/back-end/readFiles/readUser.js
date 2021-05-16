require("dotenv").config();
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function readUserPouch (db, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			callback(doc);
		}
	});
}

function readUser (userData, callback) {
	schema.User.findOne({email: userData.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			callback(user);
		}
	});
}

module.exports = {
	readUser: readUser,
	readUserPouch: readUserPouch
}
