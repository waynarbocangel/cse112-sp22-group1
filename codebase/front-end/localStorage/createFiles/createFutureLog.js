import {makeid} from "./makeId.js";
import * as localStorage from "./../userOperations.js";
import {restart} from "./createMonthlyLog.js";
let futureObject;

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
		
		while(arrays.filter(element => element.id == id).length > 0){
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

		return db.put(
			{
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				collections: doc.collections,
				trackers: doc.trackers,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers
			}
		);
	}).then((res) => {
		
		addMonth(new Date(futureObject.startDate.getTime()), new Date(futureObject.endDate.getTime()), futureObject, (monthsIDArray) => {
			db.get("0000").then((doc) => {
				futureObject.months = monthsIDArray;
				doc.futureLogs[doc.futureLogs.length - 1] = futureObject;
				db.put(
					{
						_id: "0000",
						_rev: doc._rev,
						email: doc.email,
						pwd: doc.pwd,
						index: doc.index,
						dailyLogs: doc.dailyLogs,
						monthlyLogs: doc.monthlyLogs,
						futureLogs: doc.futureLogs,
						collections: doc.collections,
						trackers: doc.trackers,
						textBlocks: doc.textBlocks,
						tasks: doc.tasks,
						events: doc.events,
						signifiers: doc.signifiers
					}
				, (err, res) => {
					restart();
					if (!err){
						callback(null, futureObject);
					} else {
						callback(err, null);
					}
				});
			});
		});
	});
}

function addMonth(startDate, endDate, futureLog, callback){
	let date = (startDate.getTime() == futureObject.startDate.getTime()) ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getUTCDate()) : new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
	if (startDate.getMonth() == endDate.getMonth()){
		date = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getUTCDate());;
	}
	localStorage.createMonthlyLog(futureLog.id, [], [], [], date, (err, month) => {
		if (err == null){
			if(startDate.getMonth() > endDate.getMonth()){
				callback([]);
			} else {
				if (startDate.getDate() != new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate()){
					startDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
				}
				let newStartDate = new Date(startDate);
				newStartDate.setMonth(startDate.getMonth() + 1);
				if (startDate.getDate() != newStartDate.getDate()){
					newStartDate.setDate(0);
				} else if (newStartDate.getDate() != new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 1, 0).getDate()){
					newStartDate = new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 1, 0);
				}
				addMonth(newStartDate, endDate, futureLog, (monthsIDArray) => {
<<<<<<< HEAD
					monthsIDArray.splice(0, 0, month.id);
=======
					monthsIDArray.splice(0, 0, {id: month.id, content: [], monthlyLog: month.id});
>>>>>>> front-end_drop
					callback(monthsIDArray);
				});
			}
		} else {
			console.log(err);
		}
	});
	 
}
