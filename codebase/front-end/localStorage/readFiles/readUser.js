/**
 * Finds and sends the user back in the callback.
 *
 * @param {database} db The local pouch database.
 * @callback (res) Sends either the user or an error if there is one to the callback.
 */
export function readUserPouch (db, callback) {
	db.get("0000", (err, user) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, user);
		}
	});
}
