import * as localStorage from "../userOperations.js";

export function deleteTextBlockPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const textBlockArr = doc.textBlocks.filter(textBlock => textBlock.id == id);
			let block = null;
			if (textBlockArr.length > 0) {
				block = textBlockArr[0];
				if(block.kind == "task"){
					localStorage.deleteTaskByID(block.objectReference, (error) => {
						if (!error){
							deleteBlock(db, block, id, callback);
						} else {
							callback(error);
						}
					});
				} else if (block.kind == "event"){
					localStorage.deleteEventByID(block.objectReference, (error) => {
						if (!error){
							deleteBlock(db, block, id, callback);
						} else {
							callback(error);
						}
					})
				} else {
					deleteBlock(db, block, id, callback);
				}
			}
		}
	}).then((res) => {
		callback(null);
	});
}

function deleteBlock(db, block, id, callback){
	localStorage.readUser((err, user) => {
		if (err == null){
			let userArr = [];
			Array.prototype.push.apply(userArr, user.dailyLogs);
			Array.prototype.push.apply(userArr, user.monthlyLogs);
			Array.prototype.push.apply(userArr, user.futureLogs);
			Array.prototype.push.apply(userArr, user.trackers);
			Array.prototype.push.apply(userArr, user.collections);

			let parentArr = userArr.filter(object => object.id == block.parent);

			let parent = parentArr[0];
			if (parent.objectType == "dailyLog"){
				let newContents = parent.content.filter(obj => obj != id);
				parent.content = newContents;
			} else if (parent.objectType == "monthlyLog") {
				for (let i = 0; i < parent.days.length; i++){
					if(parent.days[i].content.includes(id)){
						let newContents = parent.days[i].content.filter(block => block != id);
						parent.days[i].content = newContents;
					}
				}
			} else if (parent.objectType == "futureLog") {
				for (let i = 0; i < parent.months.length; i++){
					if(parent.months[i].content.includes(id)){
						let newContents = parent.months[i].content.filter(block => block != id);
						parent.months[i].content = newContents;
					}
				}
			}
			

			let newTextBlocks = user.textBlocks.filter(textBlock => textBlock.id != id);
			
			user.textBlocks = newTextBlocks;
			
			db.put(
				{
					_id: "0000",
					_rev: user._rev,
					email: user.email,
					pwd: user.pwd,
					index: user.index,
					dailyLogs: user.dailyLogs,
					monthlyLogs: user.monthlyLogs,
					futureLogs: user.futureLogs,
					collections: user.collections,
					trackers: user.trackers,
					textBlocks: user.textBlocks,
					tasks: user.tasks,
					events: user.events,
					signifiers: user.signifiers
				}
			).then(res => {callback(null)}).catch(err => {callback(err)});
		} else {
			callback(err);
		}
	});
}
