require("dotenv").config();
const mongoose = require("mongoose");

const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function deleteUserPouch(db, userObject, callback) {
	db.get(userObject.id, (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.remove( doc, function(err, response) {
				if (err) {
					callback(err);
				} else {
					callback(response);
				}
			});
		}
	})
}

function deleteUser (db, userObject, callback) {
	schema.User.deleteOne({email: userObject.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			callback(user);
		}
	});
	
	deleteUserPouch(db, userObject, (res) => {
		console.log(res);
	});
}

module.exports = {
	deleteUser: deleteUser
}
