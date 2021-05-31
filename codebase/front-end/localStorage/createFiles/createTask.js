import {makeid} from "./makeId.js";
let taskObject;

export function createTaskPouch (db, parent, text, complete, signifier, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err, null);
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
			Array.prototype.push.apply(arrays, doc.tasks);
			Array.prototype.push.apply(arrays, doc.events);
			Array.prototype.push.apply(arrays, doc.signifiers);
			Array.prototype.push.apply(arrays, doc.imageBlocks);
			Array.prototype.push.apply(arrays, doc.audioBlocks);

			while(arrays.filter((element) => element.id == id).length > 0){
				id = makeid();
			}
			taskObject = {
				id: id,
				objectType: "task",
				parent: parent,
				text: text,
				complete: complete,
				signifier: signifier
			};


			/*let userArr = [];
			Array.prototype.push.apply(userArr, doc.textBlocks);

			let parentArr = userArr.filter(object => object.id == parent);
			let parentObj = null;
			for(let i = 0; i < userArr.length; i++){
				if (userArr[i].id == parent) {
					parentObj = userArr[i];
				}
			}*/
			
			doc.tasks.push(taskObject);
				
			return db.put(
				{
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
				}
			).then((res) => {
			}).catch((err) => {
				console.log(err);
				callback(err, null);
			});
		}
	}).then((res) => {
		console.log(res);
		callback(null, taskObject);
	});
}