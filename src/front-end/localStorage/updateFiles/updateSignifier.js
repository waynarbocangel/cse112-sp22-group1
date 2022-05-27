import { readUser } from "../userOperations";

/**
 * Finds and update the signifier passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} signifier The signifier to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateSignifierPouch (db, signifier, callback) {
	console.log(signifier);
	readUser((err, user) => {
		if (err) {
			callback(err);
		} else {
			let signifierArr = user.signifiers.filter((element) => element.id !== signifier.id);
			signifierArr.push(signifier);
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				theme: user.theme,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				collections: user.collections,
				trackers: user.trackers,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				tasks: user.tasks,
				events: user.events,
				signifiers: signifierArr
			};
			db.put(newUser).then((res) => {
				if (res) {
					callback(res);
				}
			}).catch(error => callback(error));
		}
	})
}
