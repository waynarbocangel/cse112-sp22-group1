export function updateFutureLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
<<<<<<< HEAD
			const futureLogArr = doc.futureLogs.filter(element => element.id != log.id);
			db.put({_id: "0000", _rev: doc._rev, futureLogs: futureLogArr.push(log)}, (err, res) => {
=======
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
>>>>>>> front-end_drop
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
