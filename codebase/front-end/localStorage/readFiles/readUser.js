export function readUserPouch (db, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, doc);
		}
	});
}