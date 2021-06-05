import {makeid} from "./makeId.js";
let dailyObject = {};

/**
 * Creates and stores a new dailyLog created from the given parameters.
 *
 * @param {database} db The local pouch database.
 * @param {String} parent The id of the parent of the new dailyLog.
 * @param {Array} content Array of textBlocks that should appear in dailyLog.
 * @param {Array} trackers Array of trackers that should appear in dailyLog.
 * @param {Date} date The date of the dailyLog.
 * @callback (err,dailyLog) Eihter sends the newly created dailyLog or an error if there is one to the callback.
 */
export function createDailyLogPouch (db, parent, content, trackers, date, callback) {
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
			dailyObject = {
				id: id,
				objectType: "dailyLog",
				date: date,
				parent: parent,
				content: content,
				trackers: trackers
			};

			doc.dailyLogs.push(dailyObject);
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
			}).
catch((err) => {
				callback(err, null);
			});
		}
	}).then((res) => {
		console.log(res);
		callback(null, dailyObject);
	});
}
