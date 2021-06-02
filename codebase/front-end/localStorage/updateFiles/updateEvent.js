export function updateEventPouch (db, event, callback) {
	console.log(event);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
<<<<<<< HEAD
			const eventArr = doc.events.filter(element => element.id != event.id);
			db.put({_id: "0000", _rev: doc._rev, events: eventArr.push(event)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
=======
			let eventArr = doc.events.filter(element => element.id != event.id);
			eventArr.push(event)
			
			db.put({_id: "0000", 
			_rev: doc._rev,
			email: doc.email,
			pwd: doc.pwd,
			index: doc.index,
			dailyLogs: doc.dailyLogs,
			monthlyLogs: doc.monthlyLogs,
			futureLogs: doc.futureLogs,
			collections: doc.collections,
			trackers: doc.trackers,
			textBlocks: doc.textBlocks,
			tasks: doc.tasks,
			events: eventArr,
			signifiers: doc.signifiers}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(null);
>>>>>>> front-end_drop
				}
			});
		}
	})
}
