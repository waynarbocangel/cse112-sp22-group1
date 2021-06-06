/**
 * Finds and update the collection passed in.
 *
 * @param {database} db The local pouch database.
 * @param {Object} collection The collection to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function updateCollectionPouch (db, collection, callback) {
	console.log(collection);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let collectionArr = doc.collections.filter((element) => element.id !== collection.id);
			doc.collections = collectionArr;

			for (let i = 0; i < doc.index.contents.length; i++) {
				if (doc.index.contents[i] === collection.id) {
					doc.index.contents[i] = collection.id;
				}
			}

			return db.put({_id: "0000",
			_rev: doc._rev,
			email: doc.email,
			pwd: doc.pwd,
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
			tasks: doc.taskBlocks,
			events: doc.eventBlocks,
			signifiers: doc.signifiers}, (error, res) => {
				if (error) {
					callback(error);
				} else {
					callback(res);
				}
			});
		}
	})
}
