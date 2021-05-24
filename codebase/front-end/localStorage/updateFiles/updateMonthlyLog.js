export function updateMonthlyLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let monthlyLogArr = doc.userObject.monthlyLogs.filter(element => element.id != log.id);
			monthlyLogArr[0].date = log.date;
			monthlyLogArr[0].parent = log.parent;
			monthlyLogArr[0].content = log.content;
			monthlyLogArr[0].days = log.days;
			monthlyLogArr[0].trackers = log.trackers;
			db.put({
				_id: "0000", 
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
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
					callback(null, monthlyLogArr[0]);
				}
			});
		}
	})
}
