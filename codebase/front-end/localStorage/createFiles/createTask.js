import {makeid} from "./makeId.js";
<<<<<<< HEAD
=======
let taskObject;
>>>>>>> front-end_drop

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

			while(arrays.filter((element) => element.id == id).length > 0){
				id = makeid();
			}
<<<<<<< HEAD
			const taskObject = {
				id: id,
				objectType: "task",
				tabLevel: 0,
=======
			taskObject = {
				id: id,
				objectType: "task",
>>>>>>> front-end_drop
				parent: parent,
				text: text,
				complete: complete,
				signifier: signifier
			};


<<<<<<< HEAD
			let userArr = [];
=======
			/*let userArr = [];
>>>>>>> front-end_drop
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
<<<<<<< HEAD
			}
=======
			}*/
			
>>>>>>> front-end_drop
			doc.tasks.push(taskObject);
				
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
<<<<<<< HEAD
			);
		}
	}).then((res) => {
=======
			).then((res) => {
			}).catch((err) => {
				console.log(err);
				callback(err, null);
			});
		}
	}).then((res) => {
		console.log(res);
>>>>>>> front-end_drop
		callback(null, taskObject);
	});
}