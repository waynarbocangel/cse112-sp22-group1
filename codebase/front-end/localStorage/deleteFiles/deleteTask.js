export function deleteTaskPouch(db, id, index, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const taskArr = doc.tasks.filter(task => task.id == id);
			const block = null;
			if (taskArr != undefined) {
				block = taskArr[0];
			}

			let userArr = [];
			Array.prototype.push.apply(userArr, doc.dailyLogs);
			Array.prototype.push.apply(userArr, doc.monthlyLogs);
			Array.prototype.push.apply(userArr, doc.futureLogs);
			Array.prototype.push.apply(userArr, doc.trackers);
			Array.prototype.push.apply(userArr, doc.collections);

			const newTasks = doc.tasks.filter(task => task.id != id);
			
			doc.tasks = newTasks;
			
			return db.put(
				{
					_id: "0000",
					_rev: doc._rev,
					email: doc.email,
					pwd: doc.pwd,
					index: doc.index,
					dailyLogs: doc.dailyLogs,
					monthlyLogs: doc.monthlyLogs,
					futureLogs: doc.futureLogs,
					collections: doc.collections,
					trackers: doc.trackers,
					textBlocks: doc.textBlocks,
					tasks: doc.tasks,
					events: doc.events,
					signifiers: doc.signifiers
				}
			);
		}
	})
}
