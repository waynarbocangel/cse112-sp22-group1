export function updateCollectionPouch (db, collection, callback) {
	console.log(collection);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const collectionArr = doc.collections.filter(element => element.id != collection.id);
			db.put({_id: "0000", _rev: doc._rev, collections: collectionArr.push(collection)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
