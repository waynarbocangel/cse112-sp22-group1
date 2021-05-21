export function deleteTrackerPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const newTrackers = doc.trackers.filter(tracker => tracker.id != id);
			db.put({_id: "0000", _rev: doc._rev, trackers: newTrackers}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
