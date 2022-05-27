import { setUser } from "../userOperations";

/**
 * Finds and update the imageBlock passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} imageBlock The imageBlock to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateImageBlockPouch (db, imageBlock, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {

			let imageBlockArr = doc.imageBlocks.filter((element) => element.id !== imageBlock.id);
			imageBlockArr.push(imageBlock);
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
				imageBlocks: imageBlockArr,
				audioBlocks: doc.audioBlocks,
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
