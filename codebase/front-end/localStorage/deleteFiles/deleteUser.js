
/**
 * Finds and deletes the user.
 *
 * @param {database} db The local pouch database.
 * @param {String} id The id of the object to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function deleteUserPouch(db, callback) {
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