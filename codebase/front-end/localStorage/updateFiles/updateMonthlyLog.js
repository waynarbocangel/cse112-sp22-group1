export function updateMonthlyLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let monthlyLogArr = doc.monthlyLogs.filter(element => element.id != log.id);
			monthlyLogArr.push(log);

			db.put({
				_id: "0000", 
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: monthlyLogArr,
				futureLogs: doc.futureLogs,
				trackers: doc.trackers,
				collections: doc.collections,
				textBlocks: doc.textBlocks,
				eventBlocks: doc.eventBlocks,
				taskBlocks: doc.taskBlocks,
				signifiers: doc.signifiers
			}, (err, res) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, log);
				}
			});
		}
	})
}
