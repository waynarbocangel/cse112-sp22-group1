
/**
 * Finds and deletes the collection.
 * @memberof deleteFunctions
 * @param {database} db The local pouch database.
 * @param {String} id The id of the object to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
export function deleteCollectionPouch (db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let collectionArr = doc.collections.filter((collection) => collection.id === id);
			let block = null;
			if (collectionArr.length > 0) {
				block = collectionArr[0];
			}
			console.log(block);
			let userArr = [];
			Array.prototype.push.apply(userArr, doc.dailyLogs);
			Array.prototype.push.apply(userArr, doc.monthlyLogs);
			Array.prototype.push.apply(userArr, doc.futureLogs);

			let parentArr = userArr.filter((object) => object.id === block.parent);

			let parent = parentArr[0];
			let newContents = parent.contents.filter((obj) => obj !== id);
			parent.contents = newContents;

			let newCollections = doc.collections.filter((collection) => collection.id !== id);
			let newIndexContents = doc.index.contents.filter((tracker) => tracker.id !== id);
			let indexObj = {
				objectType: "index",
				contents: newIndexContents
			}

			doc.collections = newCollections;
			doc.index = indexObj;
			doc[parent.objectType].push(parent);

			return db.put({_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				theme: doc.theme,
				index: indexObj,
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
				signifiers: doc.signifiers}, (error, res) => {
				if (error) {
					callback(error);
				} else {
					console.log(res);
					callback(null);
				}
			});
		}
	})
}
