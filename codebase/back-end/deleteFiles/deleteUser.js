require("dotenv").config();
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

<<<<<<< HEAD
function deleteUserPouch(db, userObject, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.remove(doc, function(err, response) {
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
=======
function deleteUser (userObject, callback) {
	schema.User.findOneAndDelete({email: userObject.email}, (error, user) => {
>>>>>>> back-end_drop
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
