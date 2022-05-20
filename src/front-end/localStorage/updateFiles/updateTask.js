/**
 * Finds and update the task passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} task The task to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateTaskPouch (db, task, callback) {
	console.log("task when calling update task", task);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let taskArr = doc.tasks.filter((element) => element.id !== task.id);
			taskArr.push(task);
			console.log("taskArr is, ", taskArr);

			return db.put({
						_id: "0000",
						_rev: doc._rev,
						email: doc.email,
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
						tasks: taskArr,
						events: doc.events,
						signifiers: doc.signifiers
					}, (error, res) => {
						if (error) {
							callback(error);
						} else {
							callback(res);
						}
			});
		}
	})
}
