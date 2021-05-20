export function deleteEventBlockPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const newEventBlocks = doc.eventBlocks.filter(eventBlock => eventBlock.id != id);
			db.put({_id: "0000", _rev: doc._rev, collections: newEventBlocks}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}