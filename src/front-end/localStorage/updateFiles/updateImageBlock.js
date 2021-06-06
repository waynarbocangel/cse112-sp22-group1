/**
 * Finds and update the imageBlock passed in.
 *
 * @param {database} db The local pouch database.
 * @param {Object} imageBlock The imageBlock to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function updateImageBlockPouch (db, imageBlock, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {

			let imageBlockArr = doc.imageBlocks.filter((element) => element.id !== imageBlock.id);
			imageBlockArr.push(imageBlock);

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
				imageBlocks: imageBlockArr,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
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
