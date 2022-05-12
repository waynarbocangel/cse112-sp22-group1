/**
 * Finds and update the event passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} event The event to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateEventPouch (db, event, callback) {
	console.log(event);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let eventArr = doc.events.filter((element) => element.id !== event.id);
			eventArr.push(event);

			return db.put({_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				trackers: doc.trackers,
				collections: doc.collections,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: eventArr,
				signifiers: doc.signifiers}, (error, res) => {
				if (error) {
					console.log(error);
					callback(error);
				} else {
					callback(res);
				}
			});
		}
	})
}
