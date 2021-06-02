export function updateSignifierPouch (db, signifier, callback) {
	console.log(signifier);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
<<<<<<< HEAD
			const signifierArr = doc.signifiers.filter(element => element.id != signifier.id);
			db.put({_id: "0000", _rev: doc._rev, signifiers: signifierArr.push(signifier)}, (err, res) => {
=======
			let signifierArr = doc.signifiers.filter(element => element.id != signifier.id);
			signifierArr.push(signifier);

			db.put({_id: "0000", 
				_rev: doc._rev, 
				email: doc.email,
				pwd: doc.email,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				collections: doc.collections,
				trackers: trackerArr,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: signifierArr
			}, (err, res) => {
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
