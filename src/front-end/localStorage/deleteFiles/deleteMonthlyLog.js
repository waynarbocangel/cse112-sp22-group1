import * as localStorage from "../userOperations.js";

function deleteDays (monthlyLog, callback) {
	localStorage.readUser((err, user) => {
		if (err) {
			callback (err, null);
		} else {
			if (monthlyLog.days.length === 0) {
				callback(null, monthlyLog);
			} else {
				localStorage.deleteDailyLog(user.dailyLogs.filter(monthlyLog.days[0].id)[0], monthlyLog, false, (error) => {
					if (error) {
						callback(error, null);
					} else {
						deleteDays(monthlyLog, callback);
					}
				});
			}
		}
	})
}

/**
 * Finds and deletes the monthlyLog and all children associated
 * @memberof deleteFunctions
 * @param {Database} db 
 * @param {Object} log 
 * @param {Object} parent 
 * @param {singleParameterCallback} callback 
 */
export function deleteMonthlyLogPouch (db, log, parent, callback) {
	localStorage.readUser((error, user) => {
		if (error === null) {
			callback(error);
		} else {
			deleteDays(log, (failedDeleteDays, monthlyLog) => {
				if (failedDeleteDays) {
					callback(failedDeleteDays);
				} else {
					localStorage.readUser((err, updatedUser) => {
						if (err) {
							callback(err);
						} else {
							if (parent) {
								parent.days = parent.days.filter(reference => reference.id !== monthlyLog.id);
								updatedUser.monthlyLogs = updatedUser.monthlyLogs.filter(month => month.id !== parent.id);
								updatedUser.monthlyLogs.push(parent);
							}
							updatedUser.monthlyLogs = updatedUser.monthlyLogs.filter(month => month.id !== monthlyLog.id);
							let newUser = {
								_id: "0000",
								_rev: updatedUser._rev,
								email: updatedUser.email,
								theme: updatedUser.theme,
								index: updatedUser.index,
								dailyLogs: updatedUser.dailyLogs,
								monthlyLogs: updatedUser.monthlyLogs,
								futureLogs: updatedUser.futureLogs,
								collections: updatedUser.collections,
								trackers: updatedUser.trackers,
								imageBlocks: updatedUser.imageBlocks,
								audioBlocks: updatedUser.audioBlocks,
								textBlocks: updatedUser.textBlocks,
								tasks: updatedUser.tasks,
								events: updatedUser.events,
								signifiers: updatedUser.signifiers
							}
				
							return db.put(newUser).then((res) => {
								if (res.ok) {
									callback(null);
								}
							});
						}
					});
				}
			})
		}
	});
}