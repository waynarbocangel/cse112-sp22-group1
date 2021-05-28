export function updateFutureLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let futureLogArr = doc.futureLogs.filter(element => element.id != log.id);
			futureLogArr.push(log);

			db.put({_id: "0000", 
				_rev: doc._rev, 
				email: doc.email,
				pwd: doc.pwd,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: futureLogArr,
				collections: doc.collections,
				trackers: doc.trackers,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
