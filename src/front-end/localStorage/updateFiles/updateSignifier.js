import { setUser } from "../userOperations";

/**
 * Finds and update the signifier passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} signifier The signifier to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateSignifierPouch (db, signifier, callback) {
	console.log(signifier);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let signifierArr = doc.signifiers.filter((element) => element.id !== signifier.id);
			signifierArr.push(signifier);
			let newUser = {
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
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
