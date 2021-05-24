export function updateTaskBlockPouch (db, taskBlock, callback) {
	console.log(taskBlock);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const taskBlockArr = doc.userObject.taslBlocks.filter(element => element.id != taskBlock.id);
			db.put({_id: "0000", _rev: doc._rev, taskBlocks: taskBlockArr.push(taskBlock)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
