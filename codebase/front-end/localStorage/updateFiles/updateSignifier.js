export function updateSignifierPouch (db, signifier, callback) {
	console.log(signifier);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const signifierArr = doc.signifiers.filter(element => element.id != signifier.id);
			db.put({_id: "0000", _rev: doc._rev, signifiers: signifierArr.push(signifier)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
