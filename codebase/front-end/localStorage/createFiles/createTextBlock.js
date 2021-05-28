import {makeid} from "./makeId.js";
import * as localStorage from "./../userOperations.js";

let textBlockObject;

export function createTextBlockPouch (db, parent, index, content, tabLevel, kind, objectReference, signifier, date, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err, null);
		} else {
			console.log(parent);
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
			textBlockObject = {
				id: id,
				objectType: "textBlock",
				tabLevel: tabLevel,
				parent: parent,
				kind: kind,
				objectReference: objectReference,
				text: content,
				signifier: signifier
			};
			
			if(kind != "paragraph") {
				if (kind == "task") {
					//index == null for now just for testing
					localStorage.createTask(null, id, "", 0, null, (err, task) => {
						if (err) {
							callback(err, null);
						} else {
							textBlockObject.objectReference = task.id;
						}
					})
				} else if (kind = "event") {
					//index == null for now just for testing
					localStorage.createEvent(null, id, date, null, (err, event) => {
						if (err) {
							callback(err, null);
						} else {
							textBlockObject.objectReference = event.id;
						}
					})
				}
			}
			
			let userArr = [];
			Array.prototype.push.apply(userArr, doc.dailyLogs);
			Array.prototype.push.apply(userArr, doc.monthlyLogs);
			Array.prototype.push.apply(userArr, doc.futureLogs);
			Array.prototype.push.apply(userArr, doc.trackers);
			Array.prototype.push.apply(userArr, doc.collections);

			let parentArr = userArr.filter(object => object.id == parent);

			if (parent == null){
				if(index == null) {
					doc.index.contents.push(id);
				} else {
					doc.index.contents.splice(index, 0, id);
				}
			} else if(index == null) {
				parentArr[0].content.push(id);
			} else {
				parentArr[0].content.splice(index, 0, id);
			}

			doc.textBlocks.push(textBlockObject);

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
			).then((res) => {
			}).catch((err) => {
				callback(err, null);
			});
		}
	}).then((res) => {
		callback(null, textBlockObject);
	});
}
