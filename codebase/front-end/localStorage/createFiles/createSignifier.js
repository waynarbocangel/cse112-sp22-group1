import {makeid} from "./makeId.js";

export function createSignifierPouch (db, meaning, symbol, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			console.log(doc);
			let id = makeid();
			let arrays = [];
			Array.prototype.push.apply(arrays, doc.userObject.dailyLogs);
			Array.prototype.push.apply(arrays, doc.userObject.monthlyLogs);
			Array.prototype.push.apply(arrays, doc.userObject.futureLogs);
			Array.prototype.push.apply(arrays, doc.userObject.collections);
			Array.prototype.push.apply(arrays, doc.userObject.trackers);
			Array.prototype.push.apply(arrays, doc.userObject.textBlocks);
			Array.prototype.push.apply(arrays, doc.userObject.taskBlocks);
			Array.prototype.push.apply(arrays, doc.userObject.eventBlocks);
			Array.prototype.push.apply(arrays, doc.userObject.signifiers);
			
			while(arrays.filter(element => element.id == id) > 0){
				id = makeid();
			}
			const signifierObject = {
				id: id,
				objectType: "signifier",
				meaning: meaning,
				symbol: symbol
			}
			
			doc.userObject.taskBlocks.push(TaskBlockObject);
		}
	});
}
