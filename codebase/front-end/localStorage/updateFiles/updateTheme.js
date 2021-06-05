
/**
 * Finds and update the theme passed in.
 *
 * @param {database} db The local pouch database.
 * @param {String} theme The theme to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function updateThemePouch (db, theme, callback) {
	console.log(theme);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {

			return db.put({_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				theme: theme,
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
				signifiers: doc.signifiers}, (err, res) => {
				if (error) {
					callback(error);
				} else {
					callback(res);
				}
			});
		}
	})
}
