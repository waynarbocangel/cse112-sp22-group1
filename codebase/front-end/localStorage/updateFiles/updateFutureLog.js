export function updateFutureLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const futureLogArr = doc.userObject.futureLogs.filter(element => element.id != log.id);
			db.put({_id: "0000", _rev: doc._rev, futureLogs: futureLogArr.push(log)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
