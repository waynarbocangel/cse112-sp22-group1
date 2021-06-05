import {makeid} from "./makeId.js";
let eventObject = {};

/**
 * Creates and stores a new event created from the given parameters.
 *
 * @param {database} db The local pouch database.
 * @param {String} title The title of the event.
 * @param {String} parent The id of the parent of the new dailyLog.
 * @param {Date} date The date of the event (optional).
 * @param {String} signifier The id of the signifier used for the event.
 * @callback (err,event) Eihter sends the newly created dailyLog or an error if there is one to the callback.
 */
export function createEventPouch (db, title, parent, date, signifier, callback) {
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

			while (arrays.filter((element) => element.id === id).length > 0) {
				id = makeid();
			}
			eventObject = {
				id: id,
				objectType: "event",
				title: title,
				parent: parent,
				date: date,
				signifier: signifier
			};


			doc.events.push(eventObject);

			return db.put({_id: "0000",
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
				signifiers: doc.signifiers}).then((res) => {
				console.log(res);
			}).catch((error) => {
				callback(error, null);
			});
		}
	}).then((res) => {
		if (res.ok) {
			callback(null, eventObject);
		}
	});
}
