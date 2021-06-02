export function updateDailyLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
<<<<<<< HEAD
			const dailyLogArr = doc.dailyLogs.filter(element => element.id != log.id);
			db.put({_id: "0000", _rev: doc._rev, dailyLogs: dailyLogArr.push(log)}, (err, res) => {
=======
			let dailyLogArr = doc.dailyLogs.filter(element => element.id != log.id);
			dailyLogArr.push(log);
			
			db.put({_id: "0000", 
			_rev: doc._rev,
			email: doc.email,
			pwd: doc.pwd,
			index: doc.index,
			dailyLogs: dailyLogArr,
			monthlyLogs: doc.monthlyLogs,
			futureLogs: doc.futureLogs,
			collections: doc.collections,
			trackers: doc.trackers,
			textBlocks: doc.textBlocks,
			events: doc.events,
			tasks: doc.tasks,
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
