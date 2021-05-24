import {makeid} from "./makeId.js";
import * as localStorage from "./../userOperations.js";
var futureObject;

export function createFutureLogPouch (db, startDate, endDate, months, content, trackers, callback) {
	db.get("0000").then((doc) => {
		console.log(doc);
		console.log("this is doc: " + doc);
		let id = makeid();
		let arrays = [];

		Array.prototype.push.apply(arrays, doc.dailyLogs);
		Array.prototype.push.apply(arrays, doc.monthlyLogs);
		Array.prototype.push.apply(arrays, doc.futureLogs);
		Array.prototype.push.apply(arrays, doc.collections);
		Array.prototype.push.apply(arrays, doc.trackers);
		Array.prototype.push.apply(arrays, doc.textBlocks);
		Array.prototype.push.apply(arrays, doc.taskBlocks);
		Array.prototype.push.apply(arrays, doc.eventBlocks);
		Array.prototype.push.apply(arrays, doc.signifiers);
		
		while(arrays.filter(element => element.id == id) > 0){
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
				taskBlocks: doc.taskBlocks,
				eventBlocks: doc.eventBlocks,
				signifiers: doc.signifiers
			}
		);
	}).then((res) => {
		db.get("0000").then((doc) => {
			addMonth(futureObject.startDate, futureObject.endDate, futureObject, (monthsIDArray) => {
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
						taskBlocks: doc.taskBlocks,
						eventBlocks: doc.eventBlocks,
						signifiers: doc.signifiers
					}
				, (err, res) => {
					callback(null, futureObject);
				});
			});
		});
	});
}

function addMonth(startDate, endDate, futureLog, callback){
	let date = new Date(startDate.getFullYear(), startDate.getMonth(), 0);
	let d = date.getDate()
	// let d = new Date(startDate.getFullYear(), startDate.getMonth(), 0);
	localStorage.createMonthlyLog(futureLog.id, [], [], [], date, (err, month) => {
		console.log(month);
		if (err == null){
			startDate.setMonth((startDate.getMonth() + 1 ) % 12);
			if(startDate.getMonth() == endDate.getMonth()){
				callback([]);
			} else {
				addMonth(startDate, endDate, futureLog, (monthsIDArray) => {
					monthsIDArray.splice(0, 0, month.id);
					callback(monthsIDArray);
				});
			}
		} else {
			console.log(err);
		}
	});
	 
}
