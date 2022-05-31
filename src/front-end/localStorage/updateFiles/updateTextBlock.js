import * as localStorage from "../userOperations.js";

/**
 * Updates textBlock in the local db
 * @static
 * @memberof updateFunctions
 * @param {Object} db The local db.
 * @param {Array} textBlockArr Updated array of textBlocks to save to db.
 * @param {singleParameterCallback} callback Sends an error to callback if there is one.
 */
function updateBlock (db, textBlockArr, callback) {
	/* istanbul ignore next */
	localStorage.readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err);
		/* istanbul ignore next */
		} else {

			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
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
			};
			
			return db.put(newUser).then((res) => {
				/* istanbul ignore next */
				if (res.ok) {
					callback(null);
				} 
				/* istanbul ignore next */
			}).catch(error => callback(error));
		}
			/* istanbul ignore next */
			callback(err);
	});
}

/**
 * Finds and update the textBlock passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} textBlock The textBlock to be updated.
 * @param {Object} date The date
 * @param {Object} parent The parent of the textBlock being updated
 * @param {Object} addParent The new parent of the textBlock
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
export function updateTextBlockPouch (db, textBlock, date, parent, addParent, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {

			if (parent && addParent && textBlock.parent != parent.id) {
				parent.content = parent.content.filter(block => block !== textBlock.id);
				user[`${parent.objectType}s`] = user[`${parent.objectType}s`].filter(object => object.id !== parent.id);
				user[`${parent.objectType}s`].push(parent);
				addParent.content.push(textBlock.id);
				user[`${addParent.objectType}s`] = user[`${addParent.objectType}s`].filter(object => object.id !== addParent.id);
				user[`${addParent.objectType}s`].push(addParent);
			} else if ((user.textBlocks.filter(block => block.id === audioBlock.id))[0].parent !== textBlock.parent){
				callback("You are changing the parent without providing the original and old one");
				return;
			}

			let textBlockArr = doc.textBlocks;
			let oldBlock = {};
			for (let i = 0; i < textBlockArr.length; i++) {
				if (textBlockArr[i].id === textBlock.id) {
					oldBlock = textBlockArr[i];
					textBlockArr[i] = textBlock;
				}
			}

			if (textBlock.kind === "task") {
				if (oldBlock.kind === "event") {
					let eventArr = [];
					Array.prototype.push.apply(eventArr, doc.events);
					let events = eventArr.filter((element) => element.id === textBlock.objectReference);
					let event = events[0];

					localStorage.deleteEvent(event, false, (error) => {
						if (error) {
							console.log(error);
						} else {
							localStorage.createTask(textBlock.id, textBlock.text, 0, textBlock.signifier, false, (error2, task) => {
								if (error2) {
									console.log(error2);
									callback(error2, null);
								} else {
									textBlock.objectReference = task.id;
									updateBlock(db, textBlockArr, (error3) => {
										if (error3) {
											console.log(error3);
											callback(error3);
										}
									})
								}
							})
						}
					})
				} else if (oldBlock.kind === "task") {
					let taskArr = doc.tasks;
					let tasks = taskArr.filter((element) => element.id === textBlock.objectReference);
					let task = tasks[0];

					task.text = textBlock.text;
					console.log("task before updating it is ", task);
					localStorage.updateTask(task, false, (error) => {
						if (error) {
							console.log(error);
							callback(error);
						} else {
							console.log("textBlockArr before updateBlock @65 is, ", textBlockArr);
							updateBlock(db, textBlockArr, (error2) => {
								if (error2) {
									console.log(error2);
									callback(error2);
								}
							})
						}
					})
				} else if (oldBlock.kind !== "task") {
					localStorage.createTask(textBlock.id, textBlock.text, 0, textBlock.signifier, false, (error, task) => {
						if (error) {
							console.log(error);
							callback(error);
						} else {
							textBlock.objectReference = task.id;
							updateBlock(db, textBlockArr, (error2) => {
								if (error2) {
									console.log(error2);
									callback(error2);
								}
							});
						}
					})
				}
			} else if (textBlock.kind !== "task" && oldBlock.kind === "task") {
				let taskArr = [];
				Array.prototype.push.apply(taskArr, doc.tasks);
				let tasks = taskArr.filter((element) => element.id === oldBlock.objectReference);
				let task = tasks[0];

				localStorage.deleteTask(task, false, (error) => {
					if (error) {
						console.log(error);
						callback(error);
					} else {
						textBlock.objectReference = null;
						updateBlock(db, textBlockArr, (error2) => {
							if (error2) {
								console.log(error2);
								callback(error2);
							}
						})
					}
				})
			} else if (textBlock.kind !== "event" && oldBlock.kind === "event") {
				let eventArr = [];
				Array.prototype.push.apply(eventArr, doc.events);
				let events = eventArr.filter((element) => element.id === textBlock.objectReference);
				let event = events[0];

				localStorage.deleteEvent(event, false, (error) => {
					if (error) {
						console.log(error);
						callback(error);
					} else {
						textBlock.objectReference = null;
						updateBlock(db, textBlockArr, (error2) => {
							if (error2) {
								console.log(error2);
								callback(error2);
							}
						})
					}
				})
			} else if (textBlock.kind === "event") {
				if (oldBlock.kind === "event") {
					let eventArr = [];
					Array.prototype.push.apply(eventArr, doc.events);
					let events = eventArr.filter((element) => element.id === textBlock.objectReference);
					let event = events[0];
					console.log("event is ", doc);
					event.title = textBlock.text;
					event.date = date;
					localStorage.updateEvent(event, false, (error) => {
						if (error) {
							console.log(error);
							callback(error);
						} else {
							updateBlock(db, textBlockArr, (error2) => {
								if (error2) {
									console.log(error2);
									callback(error2);
								}
							})
						}
					})
				} else if (oldBlock.kind === "task") {
					let taskArr = [];
					Array.prototype.push.apply(taskArr, doc.tasks);
					let tasks = taskArr.filter((element) => element.id === textBlock.objectReference);
					let task = tasks[0];

					localStorage.deleteTask(task, false, (error) => {
						if (error) {
							console.log(error);
						} else {
							localStorage.createEvent(textBlock.text, textBlock.id, date, textBlock.signifier, false, (error2, event) => {
								if (error2) {
									console.log(error2);
									callback(error2, null);
								} else {
									textBlock.objectReference = event.id;
									updateBlock(db, textBlockArr, (error3) => {
										if (error3) {
											console.log(error3);
											callback(error3);
										}
									})
								}
							})
						}
					})

				} else if (oldBlock.kind !== "event") {
					localStorage.createEvent(textBlock.text, textBlock.id, date, textBlock.signifier, false, (error, event) => {
						if (error) {
							console.log(error);
							callback(error);
						} else {
							textBlock.objectReference = event.id;
							updateBlock(db, textBlockArr, (error2) => {
								if (error2) {
									console.log(error2);
									callback(error2);
								}
							})
						}
					})
				}
			}
		}
	})
}
