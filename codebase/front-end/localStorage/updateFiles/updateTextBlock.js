<<<<<<< HEAD
=======
import * as localStorage from "../userOperations.js";

>>>>>>> front-end_drop
export function updateTextBlockPouch (db, textBlock, callback) {
	console.log(textBlock);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
<<<<<<< HEAD
			const textBlockArr = doc.textBlocks.filter(element => element.id != textBlock.id);
			db.put({_id: "0000", _rev: doc._rev, textBlocks: textBlockArr.push(textBlock)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
=======
			console.log(textBlock);
			let textBlockArr = doc.textBlocks;
			let oldBlock;
			for(let i = 0; i < textBlockArr.length; i++){
				if (textBlockArr[i].id == textBlock.id) {
					oldBlock = textBlockArr[i];
					textBlockArr[i] = textBlock;
				}
			}

			if (textBlock.kind == "task") {
				if(oldBlock.kind == "event") {
					let eventArr = [];
					Array.prototype.push.apply(eventArr, doc.events);
					let events = eventArr.filter(element => element.id == textBlock.objectReference);
					let event = events[0];

					localStorage.deleteEvent(event, (err) => {
						if (err) {
							console.log(err);
						} else {
							localStorage.createTask(textBlock.id, textBlock.text, 0, textBlock.signifier, (err, task) => {
								if (err) {
									console.log(err);
									callback(err, null);
								} else {
									textBlock.objectReference = task.id;
									updateBlock(db, textBlockArr, (err) => {
										if (err) {
											console.log(err);
											callback(err);
										}
									})
								}
							})

							updateBlock(db, textBlockArr, (err) => {
								if (err) {
									console.log(err);
									callback(err);
								}
							})
						}
					})
				} else if(oldBlock.kind == "task") {
					let taskArr = doc.tasks;
					let tasks = taskArr.filter(element => element.id == textBlock.objectReference);
					let task = tasks[0];
					
					task.text = textBlock.text;
					localStorage.updateTask(task, (err) => {
						if (err) {
							console.log(err);
							callback(err);
						} else {
							updateBlock(db, textBlockArr, (err) => {
								if (err) {
									console.log(err);
									callback(err);
								}
							})
						}
					})
				} else if (oldBlock.kind != "task") {
					localStorage.createTask(textBlock.id, textBlock.text, 0, textBlock.signifier, (err, task) => {
						if (err) {
							console.log(err);
							callback(err);
						} else {
							textBlock.objectReference = task.id;
							updateBlock(db, textBlockArr, (err) => {
								if (err) {
									console.log(err);
									callback(err);
								}
							});
						}
					})
				}
			} else if (textBlock.kind != "task" && oldBlock.kind == "task") {
				let taskArr = [];
				Array.prototype.push.apply(taskArr, doc.tasks);
				let tasks = taskArr.filter(element => element.id == textBlock.objectReference);
				let task = tasks[0];
				
				localStorage.deleteTask(task, (err) => {
					if (err) {
						console.log(err);
						callback(err);
						textBlock.objectReference = nul
					} else {
						updateBlock(db, textBlockArr, (err) => {
							if (err) {
								console.log(err);
								callback(err);
							}
						})
					}
				})
			}
			/*else if (textBlock.kind == "event") {
				if (oldBlock.kind == "event") {
					let eventArr = [];
					Array.prototype.push.apply(eventArr, doc.events);
					let events = eventArr.filter(element => element.id == textBlock.objectReference);
					let event = events[0];
					
					event.something to change == textblock.new stuff to add to event
					localStorage.updateTask(task, (err) => {
						if (err) {
							console.log(err);
							callback(err);
						}
					})
				} else if (oldBlock.kind == "task") {

				}
			}*/
			
		}
	})
}

function updateBlock(db, textBlockArr, callback){
	localStorage.readUser((err, user) => {
		if (err == null){
			db.put({
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				pwd: user.pwd,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				trackers: user.trackers,
				collections: user.collections,
				textBlocks: textBlockArr,
				tasks: user.tasks,
				events: user.events,
				signifiers: user.signifiers
			}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(null);
				}
			});
		} else {
			callback(err);
		}
	});
>>>>>>> front-end_drop
}
