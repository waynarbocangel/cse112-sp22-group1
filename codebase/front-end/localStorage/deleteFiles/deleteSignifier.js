export function deleteSignifierPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const newSignifiers = doc.signifiers.filter(signifier => signifier.id != id);
			db.put({_id: "0000", _rev: doc._rev, collections: newSignifiers}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
