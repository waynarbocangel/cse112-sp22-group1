/**
 * Online Delete Functions
 * @namespace mongoDelete
 */
require("dotenv").config();
const schema = require(__dirname + "/../schema.js");

/**
 * Deletes the user from the online db.
 * @memberof mongoDelete
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
}

module.exports = {
	deleteUser: deleteUser
}
