import {makeid} from "./makeId.js";
<<<<<<< HEAD

export function createEventPouch (db, parent, date, signifier, callback) {
=======
let eventObject;

export function createEventPouch (db, index, parent, date, signifier, callback) {
>>>>>>> front-end_drop
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
			
			while(arrays.filter(element => element.id == id).length > 0){
				id = makeid();
			}
<<<<<<< HEAD
			const eventObject = {
				id: id,
				objectType: "event",
				tabLevel: 0,
=======
			eventObject = {
				id: id,
				objectType: "event",
>>>>>>> front-end_drop
				parent: parent,
				date: date,
				signifier: signifier
			};

<<<<<<< HEAD
			let userArr = [];
			Array.prototype.push.apply(userArr, doc.dailyLogs);
			Array.prototype.push.apply(userArr, doc.monthlyLogs);
			Array.prototype.push.apply(userArr, doc.futureLogs);
			Array.prototype.push.apply(userArr, doc.trackers);
			Array.prototype.push.apply(userArr, doc.collections);

			let parentArr = userArr.filter(object => object.id == parent);

			/*for(let i = 0; i < parentArr[0].contents.length; i++){
				if(parentArr[0].contents[i] == null) {
					parentArr[0].contents.push(id);
				} else {
					parentArr[0].contents.splice(index, 0, id);
				}
			}*/
=======
			/*let userArr = [];
			//Array.prototype.push.apply(userArr, doc.dailyLogs);
			//Array.prototype.push.apply(userArr, doc.monthlyLogs);
			//Array.prototype.push.apply(userArr, doc.futureLogs);
			//Array.prototype.push.apply(userArr, doc.trackers);
			//Array.prototype.push.apply(userArr, doc.collections);
			Array.prototype.push.apply(userArr, doc.textBlocks);

			let parentArr = userArr.filter(object => object.id == parent);
			
			//parentArr will be empty since createTextBlock isn't done running when createEvent is run
			if(index == null) {
				parentArr[0].content.push(id);
			} else {
				parentArr[0].content.splice(index, 0, id);
			}*/

>>>>>>> front-end_drop
			doc.events.push(eventObject);

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
			callback(null, eventObject);
		}
	})/*.then((res) => {
		callback(null, eventObject);
	});*/
=======
			).then((res) => {
			}).catch((err) => {
				callback(err, null);
			});
		}
	}).then((res) => {
		callback(null, eventObject);
	});
>>>>>>> front-end_drop
}
