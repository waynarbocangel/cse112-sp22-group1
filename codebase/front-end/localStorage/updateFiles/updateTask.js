export function updateTaskPouch (db, task, callback) {
	console.log(task);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const taskArr = doc.tasks.filter(element => element.id != task.id);
			db.put({_id: "0000", _rev: doc._rev, tasks: taskArr.push(task)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
