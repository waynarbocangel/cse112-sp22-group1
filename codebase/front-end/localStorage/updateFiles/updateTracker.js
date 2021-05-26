export function updateTrackerPouch (db, tracker, callback) {
	console.log(tracker);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const trackerArr = doc.trackers.filter(element => element.id != tracker.id);
			db.put({_id: "0000", _rev: doc._rev, trackers: trackerArr.push(tracker)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
