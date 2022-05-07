import * as localStorage from "../userOperations.js";
import {makeid} from "./makeId.js";

let monthlyObject = {};

/**
 * Recursive function that adds monthlyLogs between start and end dates to futureLog
 * @static
 * @memberof createFunctions
 * @param {Date} currentDay The day at which the function is currently at.
 * @param {Date} startDate The start date of the monthlyLog.
 * @param {Date} endDay The last day of the monthlyLog
 * @param {Object} month The monthlyLog to add the dailyLogs to.
 * @param {singleParameterCallback} callback Either sends an array of the dailyLogs added or sends an error, if ther is one, to the callback.
 */
function addDay (currentDay, startDate, endDay, month, callback) {
	let dayDate = new Date(startDate.getFullYear(), startDate.getMonth(), currentDay);
	if (currentDay > endDay) {
		callback([]);
	} else {
		localStorage.createDailyLog(month.id, [], [], dayDate, false, (error, day) => {
			if (error === null) {
				addDay(currentDay + 1, startDate, endDay, month, (daysArray) => {
					daysArray.splice(0, 0, {id: day.id, content: [], dailyLog: day.id});
					callback(daysArray);
				});
			} else {
				console.log(error);
			}
		});
	}
}

/**
 * Creates and stores a new monthlyLog created from the given parameters.
 * @memberof createFunctions
 * @param {database} db The local pouch database.
 * @param {String} parent The id of the parent of the new monthlyLog.
 * @param {Array} days The id's of the days included in the monthlyLog.
 * @param {Array} trackers The id's of the trackers included in the monthlyLog.
 * @param {Date} date The date of the monthlyLog.
 * @param {doubleParameterCallback} callback Eihter sends the newly created monthlyLog or an error if there is one to the callback.
 */
export function createMonthlyLogPouch (db, parent, days, trackers, date, endDate, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err, null);
		} else {
			let id = makeid();
			let arrays = [];
			Array.prototype.push.apply(arrays, doc.dailyLogs);
			Array.prototype.push.apply(arrays, doc.monthlyLogs);
			Array.prototype.push.apply(arrays, doc.futureLogs);
			Array.prototype.push.apply(arrays, doc.collections);
			Array.prototype.push.apply(arrays, doc.trackers);
			Array.prototype.push.apply(arrays, doc.textBlocks);
			Array.prototype.push.apply(arrays, doc.tasks);
			Array.prototype.push.apply(arrays, doc.events);
			Array.prototype.push.apply(arrays, doc.signifiers);
			Array.prototype.push.apply(arrays, doc.imageBlocks);
			Array.prototype.push.apply(arrays, doc.audioBlocks);

			while (arrays.filter((element) => element.id === id).length > 0) {
				id = makeid();
			}

			monthlyObject = {
				id: id,
				objectType: "monthlyLog",
				date: date,
				parent: parent,
				days: days,
				trackers: trackers
			};
			doc.monthlyLogs.push(monthlyObject);
			return db.put({
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				collections: doc.collections,
				trackers: doc.trackers,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers
			})
		}
	}).then((res) => {
		if (res) {
			addDay(date.getUTCDate(), new Date(monthlyObject.date), endDate.getUTCDate(), monthlyObject, (daysArray) => {
				monthlyObject.days = daysArray;
				db.get("0000", (error, doc) => {
					if (error) {
						callback(error, null);
					} else {
						doc.monthlyLogs[doc.monthlyLogs.length - 1] = monthlyObject;
						db.put({
							_id: "0000",
							_rev: doc._rev,
							email: doc.email,
							pwd: doc.pwd,
							theme: doc.theme,
							index: doc.index,
							dailyLogs: doc.dailyLogs,
							monthlyLogs: doc.monthlyLogs,
							futureLogs: doc.futureLogs,
							collections: doc.collections,
							trackers: doc.trackers,
							imageBlocks: doc.imageBlocks,
							audioBlocks: doc.audioBlocks,
							textBlocks: doc.textBlocks,
							tasks: doc.tasks,
							events: doc.events,
							signifiers: doc.signifiers
						}).then((response) => {
							if (response) {
								callback(null, monthlyObject);
							}
						}).catch((error2) => {
							callback(error2, null);
						});
					}
				});
			});
		} else {
			console.log(res);
		}
	}).catch((err) => {
		callback(err, null);
	});
}
