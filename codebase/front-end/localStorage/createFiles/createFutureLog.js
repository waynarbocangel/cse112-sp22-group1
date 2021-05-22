import {makeid} from "./makeId.js";

export function createFutureLogPouch (db, startDate, endDate, months, content, trackers, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			console.log(doc);
			let id = makeid();
			let arrays = [];
			arrays.push(...doc.dailyLogs);
			arrays.push(...doc.monthlyLogs);
			arrays.push(...doc.futureLogs);
			arrays.push(...doc.trackers);
			arrays.push(...doc.collections);
			arrays.push(...doc.textBlocks);
			arrays.push(...doc.taskBlocks);
			arrays.push(...doc.eventtBlocks);
			arrays.push(...doc.signifiers);
			while(arrays.filter((element) => element.id == id).length > 0){
				id = makeid();
			}
			const futureObject = {
				id: id,
				objectType: "futureLog",
				startDate: startDate,
				endDate: endDate,
				months: months,
				content: content,
				trackers: trackers
			};

			db.put({_rev: doc._rev,
				_id: "0000"}, (res) => {
				doc.futureLogs.push(futureObject);
				doc.index.contents.push(futureObject.id);
				console.log(res);
				callback(res);
			});
		}
	});
}
