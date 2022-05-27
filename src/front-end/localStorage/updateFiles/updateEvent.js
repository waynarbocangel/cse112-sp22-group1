import { readUser } from "../userOperations";

/**
 * Finds and update the event passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} event The event to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateEventPouch (db, event, callback) {
	console.log(event);
	readUser((err, user) => {
		if (err) {
			callback(err);
		} else {
			let eventArr = user.events.filter((element) => element.id !== event.id);
			eventArr.push(event);
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				theme: user.theme,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				trackers: user.trackers,
				collections: user.collections,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				tasks: user.tasks,
				events: eventArr,
				signifiers: user.signifiers
			};
			db.put(newUser).then((res) => {
				if (res) {
					callback(res);
				}
			}).catch(error => callback(error));
		}
	})
}
