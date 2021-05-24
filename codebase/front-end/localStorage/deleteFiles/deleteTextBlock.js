export function deleteTextBlockPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const textBlockArr = doc.userObject.textBlocks.filter(textBlock => textBlock.id == id);
			const block = null;
			if (textBlockArr.length > 0) {
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

			const newTextBlocks = doc.userObject.textBlocks.filter(textBlock => textBlock.id != id);
			//try removing db.put and using doc.userObject.textBlocks = newTextBlocks;
			db.put({_id: "0000", _rev: doc._rev, textBlocks: newTextBlocks}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	});
}
