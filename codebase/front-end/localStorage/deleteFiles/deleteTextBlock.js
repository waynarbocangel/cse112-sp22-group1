export function deleteTextBlockPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const newTextBlocks = doc.textBlocks.filter(textBlock => textBlock.id != id);
			db.put({_id: "0000", _rev: doc._rev, textBlocks: newTextBlocks}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
