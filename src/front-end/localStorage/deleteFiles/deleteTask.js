/**
 * Finds and deletes the task.
 * @memberof deleteFunctions
 * @param {database} db The local pouch database.
 * @param {String} id The id of the object to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
export function deleteTaskPouch (db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let newTasks = doc.tasks.filter((task) => task.id !== id);
			let newUser = {_id: "0000",
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
			tasks: newTasks,
			events: doc.events,
			signifiers: doc.signifiers};

			return db.put(newUser).then((res) => {
				if (res.ok) {
					callback(null);
				}
			});
		}
	})
}
