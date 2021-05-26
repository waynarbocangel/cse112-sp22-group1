import {makeid} from "./makeId.js";

export function createEventBlockPouch (db, parent, text, date, signifier, callback) {
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
			Array.prototype.push.apply(userArr, doc.userObject.dailyLogs);
			Array.prototype.push.apply(userArr, doc.userObject.monthlyLogs);
			Array.prototype.push.apply(userArr, doc.userObject.futureLogs);
			Array.prototype.push.apply(userArr, doc.userObject.trackers);
			Array.prototype.push.apply(userArr, doc.userObject.collections);

			let parentArr = userArr.filter(object => object.id == parent);

			if(index == null) {
				parentArr[0].contents.push(id);
			} else {
				parentArr[0].contents.splice(index, 0, id);
			}
			doc.userObject.eventBlocks.push(eventBlockObject);
		}
	});
}
