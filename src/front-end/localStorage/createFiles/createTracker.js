import {makeid} from "./makeId.js";
let trackerObject = {};

/**
 * Creates and stores a new tracker created from the given parameters.
 * @memberof createFunctions
 * @param {database} db The local pouch database.
 * @param {String} title The title of the tracker.
 * @param {Array} content The id's of the textBlocks of the new tracker.
 * @param {String} parent The id of the parent of the tracker.
 * @param {doubleParameterCallback} callback Eihter sends the newly created tracker or an error if there is one to the callback.
 */
export function createTrackerPouch (db, title, content, parent, callback) {
	console.log("making tracjer");
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err, null);
		} else {
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
			trackerObject = {
				id: id,
				objectType: "tracker",
				title: title,
				content: content,
				parent: parent
			};
			console.log(arrays);
			console.log(parent);
			let parentObject = arrays.filter((element) => element.id === parent);
			console.log(parentObject);
			parentObject[0].trackers.push(trackerObject.id);

			doc.trackers.push(trackerObject);
			// Tracker array of parent should be updated in callback of this funciton
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
				collections: doc.collections,
				trackers: doc.trackers,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers
			}).then((res) => {
				console.log(res);
			}).catch((error) => {
				console.log(error);
				callback(error, null);
			});
		}
	}).then((res) => {
		console.log(res);
		console.log(trackerObject);
		callback(null, trackerObject);
	});
}
