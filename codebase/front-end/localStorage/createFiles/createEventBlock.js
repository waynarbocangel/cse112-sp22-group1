import {makeid} from "./makeId.js";

export function createEventBlockPouch (db, parent, text, date, signifier, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
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
			
			while(arrays.filter(element => element.id == id).length > 0){
				id = makeid();
			}
			const eventBlockObject = {
				id: id,
				objectType: "eventBlock",
				tabLevel: 0,
				parent: parent,
				text: text,
				date: date,
				signifier: signifier
			};

			let userArr = [];
			Array.prototype.push.apply(userArr, doc.dailyLogs);
			Array.prototype.push.apply(userArr, doc.monthlyLogs);
			Array.prototype.push.apply(userArr, doc.futureLogs);
			Array.prototype.push.apply(userArr, doc.trackers);
			Array.prototype.push.apply(userArr, doc.collections);

			let parentArr = userArr.filter(object => object.id == parent);

			if(index == null) {
				parentArr[0].contents.push(id);
			} else {
				parentArr[0].contents.splice(index, 0, id);
			}
			doc.eventBlocks.push(eventBlockObject);

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
		}
	});
}
