/**
 * Finds and update the audioBlock passed in.
 *
 * @param {database} db The local pouch database.
 * @param {Object} audioBlock The audioBlock to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function updateAudioBlockPouch (db, audioBlock, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {

			let audioBlockArr = doc.audioBlocks.filter((element) => element.id !== audioBlock.id);
			audioBlockArr.push(audioBlock);

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
				imageBlocks: user.imageBlocks,
				audioBlocks: audioBlockArr,
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
