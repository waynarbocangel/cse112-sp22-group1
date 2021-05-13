require("dotenv").config();
const mongoose = require("mongoose");

const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

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
	readUser: readUser
}
