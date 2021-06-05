
/**
 * Finds and update the tracker passed in.
 *
 * @param {database} db The local pouch database.
 * @param {Object} tracker The tracker to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function updateTrackerPouch (db, tracker, callback) {
	console.log(tracker);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let trackerArr = doc.trackers.filter((element) => element.id !== tracker.id);
			trackerArr.push(tracker);

			return db.put({_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				theme: doc.email,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				collections: doc.collections,
				trackers: trackerArr,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifers}, (error, res) => {
				if (error) {
					callback(error);
				} else {
					callback(res);
				}
			});
		}
	})
}
