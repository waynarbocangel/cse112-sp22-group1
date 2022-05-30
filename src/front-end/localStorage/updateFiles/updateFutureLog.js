/**
 * Finds and update the futureLog passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} log The futureLog to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateFutureLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let futureLogArr = doc.futureLogs.filter((element) => element.id !== log.id);
			futureLogArr.push(log);

			db.put({_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: futureLogArr,
				collections: doc.collections,
				trackers: doc.trackers,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers}, (error, res) => {
				if (error) {
					callback(error);
				} else {
					callback(res);
				}
			});
		}
	})
}
