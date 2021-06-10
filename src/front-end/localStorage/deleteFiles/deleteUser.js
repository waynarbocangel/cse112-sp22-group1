/**
 * Finds and deletes the user.
 * @memberof deleteFunctions
 * @param {database} db The local pouch database.
 * @param {String} id The id of the object to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
export function deleteUserPouch (db, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.remove(doc, (error, response) => {
				if (error) {
					callback(error);
				} else {
					callback(response);
				}
			});
		}
	})
}
