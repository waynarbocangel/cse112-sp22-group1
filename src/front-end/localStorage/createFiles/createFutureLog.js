import * as localStorage from "../userOperations.js";
import {makeid} from "./makeId.js";
let futureObject = {};

/**
 * Recursive funcion that adds monthlyLogs between start and end dates to futureLog
 * @static
 * @memberof createFunctions
 * @param {Date} start The starting date of the futureLog.
 * @param {Date} endDate The ending date of the futureLog.
 * @param {Object} futureLog The futureLog to add the monthlyLogs to.
 * @param {singleParameterCallback} callback Either sends an array of the monthlyLogs added or sends an error, if ther is one, to the callback.
 */
function addMonth (start, endDate, futureLog, callback) {
	let startDate = start;
	let date = startDate.getTime() === futureObject.startDate.getTime() ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getUTCDate()) : new Date(startDate.getFullYear(), startDate.getMonth(), 1);
	/* eslint-disable */
	let finalDate = (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) ? endDate : new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
	/* eslint-disable */
	localStorage.createMonthlyLog(futureLog.id, [], [], date, finalDate, false, (err, month) => {
		if (err === null) {
			if (startDate > endDate) {
				callback([]);
			} else {
				if (startDate.getDate() !== new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate()) {
					startDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
				}
				let newStartDate = new Date(startDate);
				newStartDate.setMonth(startDate.getMonth() + 1);
				if (startDate.getDate() !== newStartDate.getDate()) {
					newStartDate.setDate(0);
				} else if (newStartDate.getDate() !== new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 1, 0).getDate()) {
					newStartDate = new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 1, 0);
				}
				addMonth(newStartDate, endDate, futureLog, (monthsIDArray) => {
					monthsIDArray.splice(0, 0, {id: month.id, content: [], monthlyLog: month.id});
					callback(monthsIDArray);
				});
			}
		} else {
			console.log(err);
		}
	});
}

/**
 * Creates and stores a new futureLog created from the given parameters.
 * @memberof createFunctions
 * @param {database} db The local pouch database.
 * @param {Date} startDate The start date of the futureLog.
 * @param {Date} endDate The end date of the futureLog.
 * @param {Array} months The id's of the months that are included by the futureLog.
 * @param {Array} content The id's of the textBlocks included in the futureLog.
 * @param {Array} trackers The id's of the trackers included by the futureLog.
 * @param {doubleParameterCallback} callback Eihter sends the newly created futureLog or an error if there is one to the callback.
 */
export function createFutureLogPouch (db, startDate, endDate, months, trackers, callback) {
	db.get("0000").then((doc) => {
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

		futureObject = {
			id: id,
			objectType: "futureLog",
			startDate: startDate,
			endDate: endDate,
			months: months,
			trackers: trackers
		};

		doc.futureLogs.push(futureObject);
		doc.index.contents.push(futureObject.id);

		return db.put({_id: "0000",
			_rev: doc._rev,
			email: doc.email,
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
		});
	}).then((res) => {
		console.log(res);
		if (res.ok) {
			console.log(new Date(futureObject.startDate.getTime()));
			console.log(new Date(futureObject.endDate.getTime()));
			addMonth(new Date(futureObject.startDate.getTime()), new Date(futureObject.endDate.getTime()), futureObject, (monthsIDArray) => {
				db.get("0000").then((doc) => {
					futureObject.months = monthsIDArray;
					doc.futureLogs[doc.futureLogs.length - 1] = futureObject;
					db.put({_id: "0000",
						_rev: doc._rev,
						email: doc.email,
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
					}, (err, res2) => {
						if (err) {
							callback(err, null);
						} else if (res2.ok) {
							callback(null, futureObject);
						}
					});
				});
			});
		} else {
			console.log(res);
		}
	}).catch((err) => {
		callback(err, null);
	});
}
