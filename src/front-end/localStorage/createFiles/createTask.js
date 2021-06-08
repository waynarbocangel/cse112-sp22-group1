import {makeid} from "./makeId.js";
let taskObject = {};

/**
 * Creates and stores a new task created from the given parameters.
 * @memberof createFunctions
 * @param {database} db The local pouch database.
 * @param {String} parent The id of the parent of the new task.
 * @param {String} text Description of the task.
 * @param {Number} complete Number to keep track if task is complete or not. (zero for non-complete and non-zero for complete)
 * @param {String} signifier The id of the signifier the task is supposed to use.
 * @param {doubleParameterCallback} callback Eihter sends the newly created task or an error if there is one to the callback.
 */
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

			while (arrays.filter((element) => element.id === id).length > 0) {
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

			doc.tasks.push(taskObject);

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
catch((error) => {
				console.log(error);
				callback(error, null);
			});
		}
	}).then((res) => {
		console.log(res);
		callback(null, taskObject);
	});
}
