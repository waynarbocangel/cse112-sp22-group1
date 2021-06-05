import * as localStorage from "../userOperations.js";
import {makeid} from "./makeId.js";

let monthlyObject = {};
let startProcessed = false;

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
 *
 * @param {database} db The local pouch database.
 * @param {String} parent The id of the parent of the new monthlyLog.
 * @param {Array} days The id's of the days included in the monthlyLog.
 * @param {Array} trackers The id's of the trackers included in the monthlyLog.
 * @param {Date} date The date of the monthlyLog.
 * @callback (err,monthlyLog) Eihter sends the newly created monthlyLog or an error if there is one to the callback.
 */
export function createMonthlyLogPouch (db, parent, content, days, trackers, date, callback) {
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
				content: content,
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
		if (res.ok) {
			let ending = monthlyObject.date.getDate() !== new Date(monthlyObject.date.getFullYear(), monthlyObject.date.getMonth() + 1, 0).getDate() && startProcessed;
			let date2 = new Date(monthlyObject.date.getFullYear(), ending ? monthlyObject.date.getMonth() : monthlyObject.date.getMonth() + 1, ending ? monthlyObject.date.getDate() : 0);
			console.log(date2);
			let dayDate = date2.getDate();
			let startDate = 1;
			if (!startProcessed) {
				startDate = monthlyObject.date.getDate();
				startProcessed = true;
			}
			addDay(startDate, new Date(monthlyObject.date), dayDate, monthlyObject, (daysArray) => {
				monthlyObject.days = daysArray;
				db.get("0000", (error, doc) => {
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
						if (response.ok){
							callback(null, monthlyObject);
						}
					}).catch((error2) => {
						callback(error2, null);
					});
				});
			});
		}
	}).catch((err) => {
		callback(err, null);
	});
}

export function restart () {
	startProcessed = false;
}
