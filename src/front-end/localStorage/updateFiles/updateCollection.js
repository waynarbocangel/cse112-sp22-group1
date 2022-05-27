import { setUser } from "../userOperations";

/**
 * Finds and update the collection passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} collection The collection to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateCollectionPouch (db, collection, callback) {
	console.log(collection);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let collectionArr = doc.collections.filter((element) => element.id !== collection.id);
			collectionArr.push(collection);
			doc.collections = collectionArr;
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
				signifiers: doc.signifiers
			};
			db.put(newUser).then((res) => {
				if (res) {
					setUser(newUser);
					callback(null);
				}
			});
		}
	})
}
