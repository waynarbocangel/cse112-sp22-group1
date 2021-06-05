import * as localStorage from "./../userOperations.js";
import {makeid} from "./makeId.js";
import {restart} from "./createMonthlyLog.js";
let futureObject = {};

/**
 * Creates and stores a new futureLog created from the given parameters.
 *
 * @param {database} db The local pouch database.
 * @param {Date} startDate The start date of the futureLog.
 * @param {Date} endDate The end date of the futureLog.
 * @param {Array} months The id's of the months that are included by the futureLog.
 * @param {Array} content The id's of the textBlocks included in the futureLog.
 * @param {Array} trackers The id's of the trackers included by the futureLog.
 * @callback (err,futureLog) Eihter sends the newly created futureLog or an error if there is one to the callback.
 */
export function createFutureLogPouch (db, startDate, endDate, months, content, trackers, callback) {
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
		
		while(arrays.filter((element) => element.id === id).length > 0){
			id = makeid();
		}
		futureObject = {
			id: id,
			objectType: "futureLog",
			startDate: startDate,
			endDate: endDate,
			months: months,
			content: content,
			trackers: trackers
		};

		doc.futureLogs.push(futureObject);
		doc.index.contents.push(futureObject.id);

		return db.put({_id: "0000",
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
		});
	}).then((res) => {
		
		addMonth(new Date(futureObject.startDate.getTime()), new Date(futureObject.endDate.getTime()), futureObject, (monthsIDArray) => {
			db.get("0000").then((doc) => {
				futureObject.months = monthsIDArray;
				doc.futureLogs[doc.futureLogs.length - 1] = futureObject;
				db.put({_id: "0000",
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
				}, (err, res) => {
					restart();
					if (!err){
						console.log(res);
						callback(null, futureObject);
					} else {
						callback(err, null);
					}
				});
			});
		});
	});
}

function addMonth (startDate, endDate, futureLog, callback) {
	let date = (startDate.getTime() === futureObject.startDate.getTime()) ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getUTCDate()) : new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
	if (startDate.getMonth() === endDate.getMonth()) {
		date = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getUTCDate());;
	}
	localStorage.createMonthlyLog(futureLog.id, [], [], [], date, false, (err, month) => {
		if (err === null) {
			if (startDate.getMonth() > endDate.getMonth()) {
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
