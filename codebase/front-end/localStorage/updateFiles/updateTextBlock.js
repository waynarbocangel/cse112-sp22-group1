import * as localStorage from "../userOperations.js";

/**
 * Finds and update the textBlock passed in.
 *
 * @param {database} db The local pouch database.
 * @param {Object} textBlock The textBlock to be deleted.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function updateTextBlockPouch (db, textBlock, date, callback) {
	console.log(textBlock);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
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

					/*let index = 0;
					while(doc.events[index].id != event.id){
						index++;
					}*/
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

							/*updateBlock(db, textBlockArr, (err) => {
								if (err) {
									console.log(err);
									callback(err);
								}
							})*/
						}
					})
				} else if(oldBlock.kind == "task") {
					let taskArr = doc.tasks;
					let tasks = taskArr.filter(element => element.id == textBlock.objectReference);
					let task = tasks[0];
					
					task.text = textBlock.text;
					console.log("task before updating it is ", task);
					localStorage.updateTask(task, (err) => {
						if (err) {
							console.log(err);
							callback(err);
						} else {
							console.log("textBlockArr before updateBlock @65 is, ", textBlockArr);
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
				let tasks = taskArr.filter(element => element.id == oldBlock.objectReference);
				let task = tasks[0];
				
				localStorage.deleteTask(task, (err) => {
					if (err) {
						console.log(err);
						callback(err);
					} else {
						textBlock.objectReference = null;
						updateBlock(db, textBlockArr, (err) => {
							if (err) {
								console.log(err);
								callback(err);
							}
						})
					}
				})
			} else if (textBlock.kind != "event" && oldBlock.kind == "event") {
				let eventArr = [];
				Array.prototype.push.apply(eventArr, doc.events);
				let events = eventArr.filter(element => element.id == textBlock.objectReference);
				let event = events[0];

				localStorage.deleteEvent(event, (err) => {
					if (err) {
						console.log(err);
						callback(err);
					} else {
						textBlock.objectReference = null;
						updateBlock(db, textBlockArr, (err) => {
							if (err) {
								console.log(err);
								callback(err);
							}
						})
					}
				})
			} else if (textBlock.kind == "event") {
				if (oldBlock.kind == "event") {
					let eventArr = [];
					Array.prototype.push.apply(eventArr, doc.events);
					let events = eventArr.filter(element => element.id == textBlock.objectReference);
					let event = events[0];
					console.log("event is ", doc);
					event.title = textBlock.text;
					event.date = date;
					localStorage.updateEvent(event, (err) => {
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
				} else if (oldBlock.kind == "task") {
					let taskArr = [];
					Array.prototype.push.apply(eventArr, doc.tasks);
					let tasks = taskArr.filter(element => element.id == textBlock.objectReference);
					let task = tasks[0];

					localStorage.deleteTask(task, (err) => {
						if (err) {
							console.log(err);
						} else {
							localStorage.createEvent(textBlock.text, textBlock.id, date, textBlock.signifier, (err, event) => {
								if (err) {
									console.log(err);
									callback(err, null);
								} else {
									textBlock.objectReference = event.id;
									updateBlock(db, textBlockArr, (err) => {
										if (err) {
											console.log(err);
											callback(err);
										}
									})
								}
							})

							/*updateBlock(db, textBlockArr, (err) => {
								if (err) {
									console.log(err);
									callback(err);
								}
							})*/
						}
					})

				} else if(oldBlock.kind != "event") {
					localStorage.createEvent(textBlock.text, textBlock.id, date, textBlock.signifier, (err, event) => {
						if (err) {
							console.log(err);
							callback(err);
						} else {
							textBlock.objectReference = event.id;
							updateBlock(db, textBlockArr, (err) => {
								if (err) {
									console.log(err);
									callback(err);
								}
							})
						}
					})
				}
			}
			
		}
	})
}

function updateBlock(db, textBlockArr, callback){
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
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: textBlockArr,
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
