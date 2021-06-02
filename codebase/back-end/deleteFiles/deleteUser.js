require("dotenv").config();
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

/**
 * Deletes the user from the online db.
 * 
 * @param {Object} userObject The object of the user to be deleted.
 * @callback (res) Sends either the user deleted or and error if there was one.
 */
function deleteUser (userObject, callback) {
	schema.User.findOneAndDelete({email: userObject.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			callback(user);
		}
	});
	
	/*deleteUserPouch(db, userObject, (res) => {
		console.log(res);
	});*/
}



module.exports = {
	deleteUser: deleteUser
}
