/**
 * Finds and update the dailyLog passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} dailyLog The dailyLog to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
export function updateDailyLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let dailyLogArr = doc.dailyLogs.filter((element) => element.id !== log.id);
			dailyLogArr.push(log);

			return db.put({_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: dailyLogArr,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				collections: doc.collections,
				trackers: doc.trackers,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				events: doc.events,
				tasks: doc.tasks,
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
