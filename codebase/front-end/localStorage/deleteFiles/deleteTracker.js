/**
 * Finds and deletes the tracker.
 *
 * @param {database} db The local pouch database.
 * @param {String} id The id of the object to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function deleteTrackerPouch (db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let trackerArr = doc.trackers.filter((tracker) => tracker.id === id);
			let block = null;
			if (trackerArr.length > 0) {
				block = trackerArr[0];
			}

			let userArr = [];
			Array.prototype.push.apply(userArr, doc.dailyLogs);
			Array.prototype.push.apply(userArr, doc.monthlyLogs);
			Array.prototype.push.apply(userArr, doc.futureLogs);

			let parentArr = userArr.filter((object) => object.id === block.parent);

			let parent = parentArr[0];
			let newTrackers = parent.trackers.filter((obj) => obj !== block.id);
			parent.trackers = newTrackers;

			let newTrackerList = doc.trackers.filter((tracker) => tracker.id !== id);

			doc.trackers = newTrackerList;

			return db.put({
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				collections: doc.collections,
				trackers: doc.trackers,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers
			}, (error, res) => {
				if (error) {
					callback(error);
				} else if (res.ok) {
					callback(null);
				}
			});
		}
	})
}
