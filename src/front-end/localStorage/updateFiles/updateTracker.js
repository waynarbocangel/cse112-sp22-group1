import { setUser } from "../userOperations";

/**
 * Finds and update the tracker passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} tracker The tracker to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateTrackerPouch (db, tracker, callback) {
	console.log(tracker);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let trackerArr = doc.trackers.filter((element) => element.id !== tracker.id);
			trackerArr.push(tracker);
			let newUser = {
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
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
				signifiers: doc.signifers
			};
			db.put(newUser).then((res) => {
				if (res) {
					setUser(newUser);
					callback(res);
				}
			});
		}
	})
}
