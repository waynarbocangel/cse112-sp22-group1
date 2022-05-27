import { readUser } from "../userOperations";

/**
 * Finds and update the imageBlock passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} imageBlock The imageBlock to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateImageBlockPouch (db, imageBlock, callback) {
	readUser((err, user) => {
		if (err) {
			callback(err);
		} else {

			let imageBlockArr = user.imageBlocks.filter((element) => element.id !== imageBlock.id);
			imageBlockArr.push(imageBlock);
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
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
				signifiers: user.signifiers
			};
			db.put(newUser).then((res) => {
				if (res) {
					callback(res);
				}
			}).catch(error => callback(error));
		}
	})
}
