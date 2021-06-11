import * as localStorage from "../userOperations.js";

/**
 * Finds and deletes the futureLog and deletes all children associated.
 * @memberof deleteFunctions
 * @param {database} db The local pouch database.
 * @param {String} id The id of the object to be deleted.
 * @param {String} parent The id of the parent.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
export function deleteFutureLogPouch (db, log, parent, callback) {
	localStorage.readUser((error, user) => {
		if (error === null) {

			// Removing all textBlocks from each month in log
			let newTextBlocks = [];
			Array.prototype.push.apply(newTextBlocks, user.textBlocks);
			for (let i = 0; i < log.months.length; i++) {
				
				for (let j = 0; j < log.months[i].content.length; j++) {
					localStorage.deleteTextBlockByID(log.months[i].content[j], 1, (err) => {
						if (err) {
							callback(err);
						}
					});
				}

				// Removing all textBlocks from each day in monthlyLog
				let monthlyLog = user.monthlyLogs.filter((object) => object.id === log.months[i].monthlyLog)[0];
				for (let j = 0; j < monthlyLog.days.length; j++) {
					for (let k = 0; k < monthlyLog.days[j].content.length; k++) {
						localStorage.deleteTextBlockByID(monthlyLog.days[j].content[k], 1, (err) => {
							callback(err);
						});
					}
				}
			}

			// Removing all trackers from log from user trackers
			let newTrackers = [];
			Array.prototype.push.apply(newTackers, user.trackers);
			for (let i = 0; i < log.trackers.length; i ++) {
				newTrackers = newTrackers.filter((object) => object.id !== log.trackers[i]);
			}

			//Removing monthlyLog trackers
			for (let i = 0; i < log.months.length; i++) {
				let monthlyLog = user.monthlyLogs.filter((object) => object.id === log.months[i].monthlyLog)[0];
				for (let j = 0; j < monthlyLog.trackers.length; j++) {
					newTrackers = newTrackers.filter((object) => object.id !== monthlyLog.trackers[i]);
				}

				// Removing dailyLog trackers
				for (let j = 0; j < monthlyLog.days.length; j++) {
					let dailyLog = user.dailyLogs.filter((object) => object.id === monthlyLog.days[j].dailyLog)[0];
					for (let k = 0; k < dailyLog.trackers.length; k++) {
						newTrackers = newTrackers.filter((object) => object.id !== dailyLog.trackers[k]);
					}
				}
			}

			// Removing all log dailyLogs from user dailyLogs
			let newDailyLogs = [];
			for (let i = 0; i < log.months.length; i++) {
				let monthlyLog = user.monthlyLogs.filter((object) => object.id === log.months[i].monthlyLog)[0];				
				for (let j = 0; j < monthlyLog.days.length; j++) {
					Array.prototype.push.apply(newDailyLogs, user.dailyLogs.filter((object) => object.id !== monthlyLog.days[i].dailyLog));
				}
			}

			// Removing all log monthlyLogs from user monthlyLogs
			let newMonthlyLogs = [];
			for (let i = 0; i < log.months.length; i++) {
				Array.prototype.push.apply(newMonthlyLogs, user.monthlyLogs.filter((object) => object.id !== log.months[i].monthlyLog));
			}

			// Removing log from user futureLogs
			let newFutureLogs = user.futureLogs.filter((object) => object.id !== log.id);

			// Removing the log from user index
			let userArr = [];
			let newIndex = user.index.content.filter((id) => id !== parent);
			
			return db.put({_id: "0000",
				_rev: user._rev,
				email: user.email,
				pwd: user.pwd,
				theme: user.theme,
				index: newIndex,
				dailyLogs: newDailyLogs,
				monthlyLogs: newMonthlyLogs,
				futureLogs: newFutureLogs,
				collections: user.collections,
				trackers: user.trackers,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				tasks: user.tasks,
				events: user.events,
				signifiers: user.signifiers}).then((res) => {
					console.log(res);
					callback(null);
				}).catch((error) => {
				console.log(error);
				callback(error);
			});
		}
		
		console.log(err);
		callback(err);
	});
}