export function updateTrackerPouch (db, tracker, callback) {
	console.log(tracker);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
<<<<<<< HEAD
			const trackerArr = doc.trackers.filter(element => element.id != tracker.id);
			db.put({_id: "0000", _rev: doc._rev, trackers: trackerArr.push(tracker)}, (err, res) => {
=======
			let trackerArr = doc.trackers.filter(element => element.id != tracker.id);
			trackerArr.push(tracker);

			db.put({_id: "0000", 
				_rev: doc._rev, 
				email: doc.email,
				pwd: doc.email,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				collections: doc.collections,
				trackers: trackerArr,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifers}, (err, res) => {
>>>>>>> front-end_drop
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
