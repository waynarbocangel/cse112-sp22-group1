export function updateCollectionPouch (db, collection, callback) {
	console.log(collection);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const collectionArr = doc.collections.filter(element => element.id != collection.id);
			/*db.put({_id: "0000", _rev: doc._rev, collections: collectionArr.push(collection)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			}
*/
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
