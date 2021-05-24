export function deleteTrackerPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			/*const trackerArr = doc.userObject.trackers.filter(tracker => tracker.id == id);
			const block = null;
			if (trackerArr.length > 0) {
				block = taskBlockArr[0];
			}
			let userArr = [];
					Array.prototype.push.apply(userArr, doc.userObject.dailyLogs);
					Array.prototype.push.apply(userArr, doc.userObject.monthlyLogs);
					Array.prototype.push.apply(userArr, doc.userObject.futureLogs);
					Array.prototype.push.apply(userArr, doc.userObject.trackers);
					Array.prototype.push.apply(userArr, doc.userObject.collections);

			let parentArr = userArr.filter(object => object.id == parent);
			
			const parent = parentArr[0];
			const newContents = parent.contents.filter(obj => obj != id);

			*/
			const newTrackers = doc.userObject.trackers.filter(tracker => tracker.id != id);
			const futureLogsToChange = doc.userObject.futureLogs.filter(futureLog => futureLog.trackers.includes(id));
			for(let i = 0; i < futureLogsToChange.lenght; i++){
				let newTrackers = futureLogsToChange[i].trackers.filter(tracker => tracker.id != id);
				futureLogsToChange[i].trackers = newTrackers;
			}

			const monthlyLogsToChange = doc.userObject.monthlyLogs.filter(monthlyLog => monthlyLog.trackers.includes(id));
			for(let i = 0; i < monthlyLogsToChange.lenght; i++){
				let newTrackers = monthlyLogsToChange[i].trackers.filter(tracker => tracker.id != id);
				monthlyLogsToChange[i].trackers = newTrackers;
			}

			const dailyLogsToChange = doc.userObject.dailyLogs.filter(dailyLog => dailyLog.trackers.includes(id));
			for(let i = 0; i < dailyLogsToChange.lenght; i++){
				let newTrackers = dailyLogsToChange[i].trackers.filter(tracker => tracker.id != id);
				dailyLogsToChange[i].trackers = newTrackers;
			}
			db.put({_id: "0000", _rev: doc._rev, trackers: newTrackers, dailyLogs: doc.userObject.dailyLogs,
				monthlyLogs: doc.userObject.monthlyLogs, futureLogs: doc.userObject.futureLogs}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
