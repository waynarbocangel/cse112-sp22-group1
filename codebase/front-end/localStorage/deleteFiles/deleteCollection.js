export function deleteCollectionPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const collectionArr = doc.userObject.collections.filter(collection => collection.id == id);
			const block = null;
			if (collectionArr.length > 0) {
				block = taskBlockArr[0];
			}
			let userArr = [];
					Array.prototype.push.apply(userArr, doc.userObject.dailyLogs);
					Array.prototype.push.apply(userArr, doc.userObject.monthlyLogs);
					Array.prototype.push.apply(userArr, doc.userObject.futureLogs);
					Array.prototype.push.apply(userArr, doc.userObject.trackers);
					Array.prototype.push.apply(userArr, doc.userObject.collections);

			let parentArr = userArr.filter(object => object.id == parent);
			
			const parent = parentArr[0];
			const newContents = parent.contents.filter(obj => obj != id);

			const newCollections = doc.userObject.collections.filter(collection => collection.id != id);
			const newIndexContents = doc.userObject.index.contents.filter(tracker => tracker.id != id);
			const indexObj = {
				objectType: "index",
				contents: newIndexContents
			}
			//if this does not work, try just revising doc without db.put
			//like this:
			//doc.userObject.collections = newCollections;
			//doc.userObject.index = indexObj;
			db.put({_id: "0000", _rev: doc._rev, collections: newCollections, index: indexObj}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
