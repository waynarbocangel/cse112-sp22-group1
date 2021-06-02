export function deleteTrackerPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
<<<<<<< HEAD
			/*const trackerArr = doc.userObject.trackers.filter(tracker => tracker.id == id);
=======
			const trackerArr = doc.trackers.filter(tracker => tracker.id == id);
>>>>>>> front-end_drop
			const block = null;
			if (trackerArr.length > 0) {
				block = taskBlockArr[0];
			}
<<<<<<< HEAD
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
			const newTrackers = doc.trackers.filter(tracker => tracker.id != id);
			const futureLogsToChange = doc.futureLogs.filter(futureLog => futureLog.trackers.includes(id));
			for(let i = 0; i < futureLogsToChange.lenght; i++){
				let newTrackers = futureLogsToChange[i].trackers.filter(tracker => tracker.id != id);
				futureLogsToChange[i].trackers = newTrackers;
			}

			const monthlyLogsToChange = doc.monthlyLogs.filter(monthlyLog => monthlyLog.trackers.includes(id));
			for(let i = 0; i < monthlyLogsToChange.lenght; i++){
				let newTrackers = monthlyLogsToChange[i].trackers.filter(tracker => tracker.id != id);
				monthlyLogsToChange[i].trackers = newTrackers;
			}

			const dailyLogsToChange = doc.dailyLogs.filter(dailyLog => dailyLog.trackers.includes(id));
			for(let i = 0; i < dailyLogsToChange.lenght; i++){
				let newTrackers = dailyLogsToChange[i].trackers.filter(tracker => tracker.id != id);
				dailyLogsToChange[i].trackers = newTrackers;
			}
			
			doc.trackers = newTrackers;
=======

			let userArr = [];
			Array.prototype.push.apply(userArr, doc.dailyLogs);
			Array.prototype.push.apply(userArr, doc.monthlyLogs);
			Array.prototype.push.apply(userArr, doc.futureLogs);
			Array.prototype.push.apply(userArr, doc.trackers);
			Array.prototype.push.apply(userArr, doc.collections);

			let parentArr = userArr.filter(object => object.id == block.parent);
			
			let parent = parentArr[0];
			const newTrackers = parent.trackers.filter(obj => obj != id);
			parent.trackers = newTrackers;

			const newTrackerList = doc.trackers.filter(tracker => tracker.id != id);
			
			doc.trackers = newTrackerList;
>>>>>>> front-end_drop

			return db.put(
				{
					_id: "0000",
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
					events: doc.events,
					signifiers: doc.signifiers
				}
			);

			/*return db.put({_id: "0000", _rev: doc._rev, 
					dailyLogs: doc.dailyLogs,
					monthlyLogs: doc.monthlyLogs, 
					futureLogs: doc.futureLogs,
					trackers: newTrackers}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});*/
		}
	})
}
