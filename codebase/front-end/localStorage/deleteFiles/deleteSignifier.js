export function deleteSignifierPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const newSignifiers = doc.userObject.signifiers.filter(signifier => signifier.id != id);
			//try removing db.put and using doc.userObject.signifier = newSignifiers;
			db.put({_id: "0000", _rev: doc._rev, signifiers: newSignifiers}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
