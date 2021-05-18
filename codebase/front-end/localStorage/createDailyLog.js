import {makeid} from "makeId.js";

export function createDailyLogPouch (db, parent, content, trackers, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			console.log(doc);
			let id = makeid();
			let arrays = [];
			arrays.push(...doc.userObject.dailyLogs);
			arrays.push(...doc.userObject.monthlyLogs);
			arrays.push(...doc.userObject.futureLogs);
			arrays.push(...doc.userObject.trackers);
			arrays.push(...doc.userObject.collections);
			arrays.push(...doc.userObject.textBlocks);
			arrays.push(...doc.userObject.taskBlocks);
			arrays.push(...doc.userObject.eventtBlocks);
			arrays.push(...doc.userObject.signifiers);
			while(arrays.filter((element) => element.id == id).length > 0){
				id = makeid();
			}
			const dailyObject = {
				id: id,
				date: Date(),
				parent: parent,
				content: content,
				trackers: trackers
			};
		}
	});
	
	

	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.put({_rev: doc._rev,
				_id: "0000"}, (res) => {
				doc.userObject.dailyLogs.push(dailyObject);
				console.log(res);
				callback(res);
			});
		}
	});
}
