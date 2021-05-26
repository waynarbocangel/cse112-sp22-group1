export function deleteCollectionPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const collectionArr = doc.collections.filter(collection => collection.id == id);
			const block = null;
			if (collectionArr.length > 0) {
				block = taskBlockArr[0];
			}
			let userArr = [];
					Array.prototype.push.apply(userArr, doc.dailyLogs);
					Array.prototype.push.apply(userArr, doc.monthlyLogs);
					Array.prototype.push.apply(userArr, doc.futureLogs);
					Array.prototype.push.apply(userArr, doc.trackers);
					Array.prototype.push.apply(userArr, doc.collections);

			let parentArr = userArr.filter(object => object.id == parent);
			
			const parent = parentArr[0];
			const newContents = parent.contents.filter(obj => obj != id);

			const newCollections = doc.collections.filter(collection => collection.id != id);
			const newIndexContents = doc.index.contents.filter(tracker => tracker.id != id);
			const indexObj = {
				objectType: "index",
				contents: newIndexContents
			}

			doc.collections = newCollections;
			doc.index = indexObj;
			
			return db.put(
				{
					_id: "0000",
					_rev: doc._rev,
					email: doc.email,
					pwd: doc.pwd,
					index: doc.index,
					dailyLogs: doc.dailyLogs,
					monthlyLogs: doc.monthlyLogs,
					futureLogs: doc.futureLogs,
					collections: doc.collections,
					trackers: doc.trackers,
					textBlocks: doc.textBlocks,
					taskBlocks: doc.taskBlocks,
					eventBlocks: doc.eventBlocks,
					signifiers: doc.signifiers
				}
			);
		}
	})
}
