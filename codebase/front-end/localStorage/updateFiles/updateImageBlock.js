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

			return db.put({
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				pwd: user.pwd,
				theme: user.theme,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				trackers: user.trackers,
				collections: user.collections,
				imageBlocks: imageBlockArr,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				tasks: user.tasks,
				events: user.events,
				signifiers: user.signifiers}, (error, res) => {
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
