export function updateEventBlockPouch (db, eventBlock, callback) {
	console.log(eventBlock);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const eventBlockArr = doc.userObject.eventBlocks.filter(element => element.id != eventBlock.id);
			db.put({_id: "0000", _rev: doc._rev, eventBlocks: eventBlockArr.push(eventBlock)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
