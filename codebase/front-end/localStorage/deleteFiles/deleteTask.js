import * as localStorage from "../userOperations.js";

/**
 * Finds and deletes the task.
 *
 * @param {database} db The local pouch database.
 * @param {String} id The id of the object to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function deleteTaskPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			/*let taskArr = doc.tasks.filter(task => task.id == id);
			let block = null;
			if (taskArr != undefined) {
				block = taskArr[0];
			}

			let userArr = [];
			Array.prototype.push.apply(userArr, doc.textBlocks);
			*/
			let newTasks = doc.tasks.filter(task => task.id != id);
			
			//doc.tasks = newTasks;
			
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
						tasks: newTasks,
						events: doc.events,
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
