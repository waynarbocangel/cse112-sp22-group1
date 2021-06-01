import * as localStorage from "../userOperations.js";

export function deleteEventPouch(db, id, callback) {
	console.log("deleteEvent" + id);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let eventArr = doc.events.filter(event => event.id == id);
			let block = null;
			if (eventArr.length > 0) {
				block = eventArr[0];
			}
			let userArr = [];
			Array.prototype.push.apply(userArr, doc.textBlocks);

			let newEvents = doc.events.filter(event => event.id != id);
			
			//doc.events = newEvents;

			return db.put({
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				trackers: doc.trackers,
				collections: doc.collections,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: newEvents,
				signifiers: doc.signifiers
			}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(null);
				}
			});
		}
	})
}
