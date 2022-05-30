/**
 * Online Delete Functions
 * @namespace mongoDelete
 */
require("dotenv").config();
const schema = require(`${__dirname}/../schema.js`);

/**
 * Deletes the user from the online db.
 * @memberof mongoDelete
 * @param {String} email The email of the user to delete.
 * @callback (res) Sends either the user deleted or and error if there was one.
 */
const deleteUser = (email, callback) => {
	schema.User.findOneAndDelete({ email: email }, (error, user) => {
		if (error) {
			callback(error);
		} else {

            /* Don't send back the password */
            delete user.pwd;
			callback(user);
		}
	});
}

module.exports = {
	deleteUser: deleteUser
}
