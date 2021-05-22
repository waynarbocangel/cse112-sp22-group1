import {makeid} from "./makeId.js";

export function createTaskBlockPouch (db, parent, text, complete, signifier, callback) {
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
			const taskBlockObject = {
				id: id,
				objectType: "taskBlock",
				tabLevel: 0,
				parent: parent,
				text: text,
				complete: complete,
				signifier: signifier
			};

			db.put({_rev: doc._rev,
				_id: "0000"}, (res) => {
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
					doc.taskBlocks.push(taskBlockObject);
				console.log(res);
				callback(res);
			});
		}
	});
}