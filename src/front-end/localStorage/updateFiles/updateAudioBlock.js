import { setUser } from "../userOperations";

/**
 * Finds and update the audioBlock passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} audioBlock The audioBlock to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateAudioBlockPouch (db, audioBlock, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {

			let audioBlockArr = doc.audioBlocks.filter((element) => element.id !== audioBlock.id);
			audioBlockArr.push(audioBlock);
			let newUser = {
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				trackers: doc.trackers,
				collections: doc.collections,
				imageBlocks: doc.imageBlocks,
				audioBlocks: audioBlockArr,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers
			};
			db.put(newUser).then((res) => {
				if (res) {
					setUser(newUser);
					callback(res);
				}
			});
		}
	})
}
