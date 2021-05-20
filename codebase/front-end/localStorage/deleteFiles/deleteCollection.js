export function deleteCollectionPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const newCollections = doc.collections.filter(collection => collection.id != id);
			db.put({_id: "0000", _rev: doc._rev, collections: newCollections}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}