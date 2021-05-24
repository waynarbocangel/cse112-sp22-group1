import {makeid} from "./makeId.js";
import * as localStorage from "../userOperations.js";

let monthlyObject;
let user;

export function createMonthlyLogPouch (db, parent, content, days, trackers, date, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err, null);
		} else {
			user = doc;
			console.log(doc);
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


			monthlyObject = {
				id: id,
				userObject: "monthlyLog",
				date: date,
				parent: parent,
				content: content,
				days: days,
				trackers: trackers
			};
			doc.monthlyLogs.push(monthlyObject);
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
			).then((res) => {
				console.log(res);
			}).catch((err) => {
				callback(err, null);
			});
		}
	}).then((res) => {
		let date = new Date(monthlyObject.date.getFullYear(), monthlyObject.date.getMonth(), 0);
		let d = date.getDate()
		addDay(1, monthlyObject.date, d, monthlyObject, (daysArray) => {
			monthlyObject.days = daysArray;
			user.monthlyLogs[user.monthlyLogs.length - 1] = monthlyObject;
			db.put(
				{
					_id: "0000",
					_rev: user._rev,
					email: user.email,
					pwd: user.pwd,
					index: user.index,
					dailyLogs: user.dailyLogs,
					monthlyLogs: user.monthlyLogs,
					futureLogs: user.futureLogs,
					collections: user.collections,
					trackers: user.trackers,
					textBlocks: user.textBlocks,
					taskBlocks: user.taskBlocks,
					eventBlocks: user.eventBlocks,
					signifiers: user.signifiers
				}
			).then((res) => {
				console.log(res);
				callback(null, monthlyObject);
			}).catch((err) => {
				console.log(err);
				callback(err, null);
			});
		});
	});
}

function addDay(currentDay, startDate, endDay, month, callback){
	let dayDate = new Date(startDate.getFullYear(), startDate.getMonth(), currentDay);
	if (currentDay == endDay){
		callback([]);
	} else {
		localStorage.createDailyLog(month.id, [], [], dayDate, (error, day) => {
			if (error == null){
				addDay(currentDay + 1, startDate, endDay, month, (daysArray) =>  {
					daysArray.splice(0, 0, day.id);
					callback(daysArray);
				});
			} else {
				console.log(error);
			}
		});
	}
}
