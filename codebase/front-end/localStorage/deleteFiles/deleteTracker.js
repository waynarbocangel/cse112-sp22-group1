export function deleteUserPouch(db, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.remove(doc, function(err, response) {
				if (err) {
					callback(err);
				} else {
					callback(response);
				}
			});
		}
	})
	db.put({_id: "0000", _rev: userObject._rev,
		email: userObject.email,
		pwd: userObject.pwd,
		dailyLogs: userObject.dailyLogs, 
		monthlyLogs: userObject.monthlyLogs,
		futureLogs: userObject.futureLogs,
		collections: userObject.collections,
		trackers: userObject.trackers,
		textBlocks: userObject.textBlocks,
		taskBlocks: userObject.taskBlocks,
		eventBlocks: userObject.eventBlocks,
		signifiers: userObject.signifiers}, (err, res) => {
		if (err) {
			callback(err);//err when i use callback
		} else {
			callback(res);//err when i use callback
		}
	});
}