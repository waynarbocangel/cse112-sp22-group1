import {makeid} from "./makeId.js";

export function createTrackerPouch (db, content, parent, callback) {
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
			const trackerObject = {
				id: id,
				content: content,
				parent: parent
			};
		}
	});
	
	

	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.put({_rev: doc._rev,
				_id: "0000"}, (res) => {
				doc.userObject.trackers.push(trackerObject);
				console.log(res);
				callback(res);
			});
		}
	});
}
