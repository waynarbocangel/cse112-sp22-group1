import { readUser } from "../userOperations";

/**
 * Finds and update the monthlyLog passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} log The monthlyLog to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateMonthlyLogPouch (db, log, callback) {
	readUser((err, user) => {
		if (err) {
			callback(err);
		} else {
			let monthlyLogArr = user.monthlyLogs.filter((element) => element.id !== log.id);
			monthlyLogArr.push(log);
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				theme: user.theme,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: monthlyLogArr,
				futureLogs: user.futureLogs,
				trackers: user.trackers,
				collections: user.collections,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				events: user.events,
				tasks: user.tasks,
				signifiers: user.signifiers
			};
			// Added return here so if updateMonthlyLog breaks maybe its because of this
			db.put(newUser).then((res) => {
				if (res) {
					callback(null, log);
				}
			}).catch(error => callback(error));
		}
	})
}
