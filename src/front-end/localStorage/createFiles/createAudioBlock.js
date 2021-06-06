import {makeid} from "./makeId.js";
let audioBlockObject = {};

/**
 * Creates and stores a new audioBlock created from the given parameters.
 *
 * @param {database} db The local pouch database.
 * @param {String} parent The id of the parent of new audioBlock.
 * @param {String} arrangement Arrangement of the audioBlock.
 * @param {Buffer} data audio of the audioBlock stored as a buffer.
 * @callback (err,audioBlock) Eihter sends the newly created audioBlock or an error if there is one to the callback.
 */
export function createAudioBlockPouch (db, parent, arrangement, data, callback) {
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
			audioBlockObject = {
				id: id,
				objectType: "imageBlock",
				parent: parent,
				arrangement: arrangement,
				data: data
			};

			let newAudioBlocks = []
			Array.prototype.push.apply(newAudioBlocks, doc.audioBlocks);

			newAudioBlocks.push(audioBlockObject);

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
				audioBlocks: newAudioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers}).then((res) => {
				console.log(res);
			}).
catch((error) => {
				console.log(error);
				callback(error, null);
			});
		}
	}).then((res) => {
		console.log(res);
		callback(null, audioBlockObject);
	});
}
