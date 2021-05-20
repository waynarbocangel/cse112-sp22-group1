export function deleteTaskBlockPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const newTaskBlocks = doc.taskBlocks.filter(taskBlock => taskBlock.id != id);
			db.put({_id: "0000", _rev: doc._rev, taskBlocks: newTaskBlocks}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}