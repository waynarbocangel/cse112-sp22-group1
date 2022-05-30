
/**
 * Finds and update the monthlyLog passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} log The monthlyLog to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateMonthlyLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let monthlyLogArr = doc.monthlyLogs.filter((element) => element.id !== log.id);
			monthlyLogArr.push(log);

			// Added return here so if updateMonthlyLog breaks maybe its because of this
			return db.put({_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: monthlyLogArr,
				futureLogs: doc.futureLogs,
				trackers: doc.trackers,
				collections: doc.collections,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				events: doc.events,
				tasks: doc.tasks,
				signifiers: doc.signifiers}, (error, res) => {
				if (error) {
					callback(error, null);
				} else {
					console.log(res);
					callback(null, log);
				}
			});
		}
	})
}
