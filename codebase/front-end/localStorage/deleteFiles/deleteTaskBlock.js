export function deleteTaskBlockPouch(db, id, index, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const taskBlockArr = doc.taskBlocks.filter(taskBlock => taskBlock.id == id);
			const block = null;
			if (taskBlockArr != undefined) {
				block = taskBlockArr[0];
			}

			let userArr = [];
					Array.prototype.push.apply(userArr, doc.dailyLogs);
					Array.prototype.push.apply(userArr, doc.monthlyLogs);
					Array.prototype.push.apply(userArr, doc.futureLogs);
					Array.prototype.push.apply(userArr, doc.trackers);
					Array.prototype.push.apply(userArr, doc.collections);

			let parentArr = userArr.filter(object => object.id == parent);
			
			const parent = parentArr[0];
			const newContents = parent.contents.filter(obj => obj != id);

			const newTaskBlocks = doc.taskBlocks.filter(taskBlock => taskBlock.id != id);
			
			doc.taskBlocks = newTaskBlocks;
			
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
					taskBlocks: doc.taskBlocks,
					eventBlocks: doc.eventBlocks,
					signifiers: doc.signifiers
				}
			);
		}
	})
}
