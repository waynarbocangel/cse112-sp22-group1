export function updateTextBlockPouch (db, textBlock, callback) {
	console.log(textBlock);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.put({_id: "0000", _rev: doc._rev, textBlocks: doc.textBlocks.push(textBlock)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
