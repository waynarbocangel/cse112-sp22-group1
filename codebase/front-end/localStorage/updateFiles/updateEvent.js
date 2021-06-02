export function updateEventPouch (db, event, callback) {
	console.log(event);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const eventArr = doc.events.filter(element => element.id != event.id);
			db.put({_id: "0000", _rev: doc._rev, events: eventArr.push(event)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
