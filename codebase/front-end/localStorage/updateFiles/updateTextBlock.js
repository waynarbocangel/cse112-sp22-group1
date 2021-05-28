export function updateTextBlockPouch (db, textBlock, callback) {
	console.log(textBlock);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const textBlockArr = doc.textBlocks;
			for(let i = 0; i < textBlockArr.length; i++){
				if (textBlockArr[i].id == textBlock.id) {
					textBlockArr[i] = textBlock;
				}
			}
			console.log(textBlockArr);
			db.put({
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				pwd: doc.pwd,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				trackers: doc.trackers,
				collections: doc.collections,
				textBlocks: textBlockArr,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers
			}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
