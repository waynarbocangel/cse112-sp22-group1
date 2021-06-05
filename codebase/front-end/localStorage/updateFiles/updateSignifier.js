
/**
 * Finds and update the signifier passed in.
 *
 * @param {database} db The local pouch database.
 * @param {Object} signifier The signifier to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function updateSignifierPouch (db, signifier, callback) {
	console.log(signifier);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let signifierArr = doc.signifiers.filter(element => element.id != signifier.id);
			signifierArr.push(signifier);

			return db.put({_id: "0000", 
				_rev: doc._rev, 
				email: doc.email,
				pwd: doc.pwd,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				collections: doc.collections,
				trackers: doc.trackers,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: signifierArr
			}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
