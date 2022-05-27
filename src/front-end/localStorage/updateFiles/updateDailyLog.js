import { readUser } from "../userOperations";

/**
 * Finds and update the dailyLog passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} dailyLog The dailyLog to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
export function updateDailyLogPouch (db, log, callback) {
	console.log(log);
	readUser((err, user) => {
		if (err) {
			callback(err);
		} else {
			let dailyLogArr = user.dailyLogs.filter((element) => element.id !== log.id);
			dailyLogArr.push(log);
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				theme: user.theme,
				index: user.index,
				dailyLogs: dailyLogArr,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				collections: user.collections,
				trackers: user.trackers,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				events: user.events,
				tasks: user.tasks,
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
