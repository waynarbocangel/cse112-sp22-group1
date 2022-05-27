import { readUser } from "../userOperations";

/**
 * Finds and update the tracker passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} tracker The tracker to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateTrackerPouch (db, tracker, callback) {
	readUser((err, user) => {
		if (err) {
			callback(err);
		} else {
			let trackerArr = user.trackers.filter((element) => element.id !== tracker.id);
			trackerArr.push(tracker);
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				theme: user.email,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				collections: user.collections,
				trackers: trackerArr,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				tasks: user.tasks,
				events: user.events,
				signifiers: user.signifers
			};
			db.put(newUser).then((res) => {
				if (res) {
					callback(res);
				}
			}).catch(error => callback(error));
		}
	})
}
