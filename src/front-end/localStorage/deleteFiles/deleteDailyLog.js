import * as localStorage from "../userOperations.js";

/**
 * Finds and deletes the monthlyLog and all children associated
 * @memberof deleteFunctions
 * @param {Database} db 
 * @param {Object} log 
 * @param {Object} parent
 * @param {singleParameterCallback} callback 
 */
export function deleteDailyLogPouch (db, log, parent, callback) {
	localStorage.readUser((error, user) => {
		if (error === null) {
			callback(error);
		} else {
			if (parent) {
				parent.days = parent.days.filter(reference => reference.id !== log.id);
				user.monthlyLogs = user.monthlyLogs.filter(month => month.id !== parent.id);
				user.monthlyLogs.push(parent);
			}
			user.dailyLogs = user.dailyLogs.filter(dailyLog => dailyLog.id !== log.id);
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
				signifiers: user.signifiers
			}

			return db.put(newUser).then((res) => {
				if (res.ok) {
					callback(null);
				}
			});
		}
	});
}