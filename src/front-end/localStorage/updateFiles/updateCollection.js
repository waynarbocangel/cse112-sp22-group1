import { readUser } from "../userOperations";

/**
 * Finds and update the collection passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} collection The collection to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateCollectionPouch (db, collection, callback) {
	readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err);
		} else {
			let collectionArr = user.collections.filter((element) => element.id !== collection.id);
			collectionArr.push(collection);
			user.collections = collectionArr;
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				theme: user.theme,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				collections: user.collections,
				trackers: user.trackers,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				tasks: user.tasks,
				events: user.events,
				signifiers: user.signifiers
			};

			return db.put(newUser).then((res) => {
				if (res) {
					callback(null);
				}
				/* istanbul ignore next */
			}).catch(error => callback(error));
		}
	})
}
