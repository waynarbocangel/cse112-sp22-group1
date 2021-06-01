import * as localStorage from "../userOperations.js";

export function updateImageBlockPouch (db, imageBlock, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {

			let imageBlockArr = doc.imageBlocks.filter(element => element.id != imageBlock.id);
			imageBlockArr.push(imageBlock);

			localStorage.readUser((err, user) => {
				if (err == null){
					return db.put({
						_id: "0000",
						_rev: user._rev,
						email: user.email,
						pwd: user.pwd,
						theme: user.theme,
						index: user.index,
						dailyLogs: user.dailyLogs,
						monthlyLogs: user.monthlyLogs,
						futureLogs: user.futureLogs,
						trackers: user.trackers,
						collections: user.collections,
						imageBlocks: imageBlockArr,
						audioBlocks: user.audioBlocks,
						textBlocks: user.textBlocks,
						tasks: user.tasks,
						events: user.events,
						signifiers: user.signifiers
					}, (err, res) => {
						if (err) {
							console.log(err);
							callback(err);
						} else {
							callback(null);
						}
					});
				} else {
					console.log(err);
					callback(err);
				}
			});
		}
	})
}
