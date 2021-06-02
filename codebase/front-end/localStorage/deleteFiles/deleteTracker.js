export function deleteTrackerPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const trackerArr = doc.trackers.filter(tracker => tracker.id == id);
			const block = null;
			if (trackerArr.length > 0) {
				block = taskBlockArr[0];
			}

			let userArr = [];
			Array.prototype.push.apply(userArr, doc.dailyLogs);
			Array.prototype.push.apply(userArr, doc.monthlyLogs);
			Array.prototype.push.apply(userArr, doc.futureLogs);
			Array.prototype.push.apply(userArr, doc.trackers);
			Array.prototype.push.apply(userArr, doc.collections);

			let parentArr = userArr.filter(object => object.id == block.parent);
			
			let parent = parentArr[0];
			const newTrackers = parent.trackers.filter(obj => obj != id);
			parent.trackers = newTrackers;

			const newTrackerList = doc.trackers.filter(tracker => tracker.id != id);
			
			doc.trackers = newTrackerList;

			return db.put(
				{
					_id: "0000",
					_rev: doc._rev,
					email: doc.email,
					pwd: doc.pwd,
					index: doc.index,
					dailyLogs: doc.dailyLogs,
					monthlyLogs: doc.monthlyLogs,
					futureLogs: doc.futureLogs,
					collections: doc.collections,
					trackers: doc.trackers,
					textBlocks: doc.textBlocks,
					tasks: doc.tasks,
					events: doc.events,
					signifiers: doc.signifiers
				}
			);

			/*return db.put({_id: "0000", _rev: doc._rev, 
					dailyLogs: doc.dailyLogs,
					monthlyLogs: doc.monthlyLogs, 
					futureLogs: doc.futureLogs,
					trackers: newTrackers}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});*/
		}
	})
}
