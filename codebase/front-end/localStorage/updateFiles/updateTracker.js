export function updateTrackerPouch (db, tracker, callback) {
	console.log(tracker);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.put({_id: "0000", _rev: doc._rev, trackers: doc.trackers.push(tracker)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
