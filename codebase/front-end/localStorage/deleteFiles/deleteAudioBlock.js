
/**
 * Finds and deletes the audioBlock.
 *
 * @param {database} db The local pouch database.
 * @param {String} id The id of the object to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function deleteAudioBlockPouch (db, id, callback) {
	localStorage.readUser((err, user) => {
		if (err == null){
			const audioBlockArr = doc.audioBlocks.filter((audioBlock) => audioBlock.id === id);
			let block = null;
			if (audioBlockArr.length > 0) {
				block = audioBlockArr[0];
			}

			let userArr = [];
			Array.prototype.push.apply(userArr, user.dailyLogs);
			Array.prototype.push.apply(userArr, user.monthlyLogs);
			Array.prototype.push.apply(userArr, user.futureLogs);
			Array.prototype.push.apply(userArr, user.trackers);
			Array.prototype.push.apply(userArr, user.collections);

			let parentArr = userArr.filter((object) => object.id === block.parent);
			let parent = parentArr[0];

			if (parent.objectType === "dailyLog") {
				let newContents = parent.content.filter((obj) => obj !== id);
				parent.content = newContents;
			} else if (parent.objectType === "monthlyLog") {
				for (let i = 0; i < parent.days.length; i++) {
					if (parent.days[i].content.includes(id)) {
						let newContents = parent.days[i].content.filter((block) => block !== id);
						parent.days[i].content = newContents;
					}
				}
			} else if (parent.objectType === "futureLog") {
				for (let i = 0; i < parent.months.length; i++) {
					if (parent.months[i].content.includes(id)) {
						let newContents = parent.months[i].content.filter((block) => block !== id);
						parent.months[i].content = newContents;
					}
				}
			}
			

			let newAudioBlocks = user.audioBlocks.filter((audioBlock) => audioBlock.id !== id);
			user.audioBlocks = newAudioBlocks;
			
			return db.put({_id: "0000",
				_rev: user._rev,
				email: user.email,
				pwd: user.pwd,
				theme: user.theme,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				collections: user.collections,
				trackers: user.trackers,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				tasks: user.tasks,
				events: user.events,
				signifiers: user.signifiers
			}).then((res) => {
				console.log(res);
				callback(null);
			}).catch((error) => {
				console.log(error);
				callback(error)});
		} else {
			console.log(err);
			callback(err);
		}
	});
}
