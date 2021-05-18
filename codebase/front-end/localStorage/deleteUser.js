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