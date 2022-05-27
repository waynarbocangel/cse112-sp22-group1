import * as localStorage from "../userOperations.js";
import {makeid} from "./makeId.js";

/**
 * Handles sub-component creation for a given block if needed
 * @memberof createFunctions
 * @param {Object} textBlock The textblock parent object
 * @param {Date} date The date in case of event creation
 * @param {doubleParameterCallback} callback Callback after sub-component has been handled
 */
function handleSubComponent (textBlock, date, callback) {
	if (textBlock.kind === "task" && textBlock.objectReference === null) {
		/* istanbul ignore next */
		localStorage.createTask(textBlock.id, textBlock.text, 0, textBlock.signifiers, false, (failedCreateTask, task) => {
			/* istanbul ignore next */
			if (failedCreateTask) {
				/* istanbul ignore next */
				callback(failedCreateTask, null);
				/* istanbul ignore next */
			} else {
				textBlock.objectReference = task.id;
				callback(null, textBlock);
			}
		});
	} else if (textBlock.kind === "event" && textBlock.objectReference === null) {
		/* istanbul ignore next */
		localStorage.createEvent(textBlock.text, textBlock.id, date, textBlock.signifiers, false, (failedCreateEvent, journalEvent) => {
			/* istanbul ignore next */
			if (failedCreateEvent) {
				/* istanbul ignore next */
				callback(failedCreateEvent, null);
				/* istanbul ignore next */
			} else {
				textBlock.objectReference = journalEvent.id;
				callback(null, textBlock);
			}
		});
		/* istanbul ignore next */
	} else {
		/* istanbul ignore next */
		callback(null, textBlock);
	}
}

/**
 * Creates and stores a new event created from the given parameters.
 * @memberof createFunctions
 * @param {database} db The local pouch database.
 * @param {Object} parent The id of the parent of the new textBlock.
 * @param {Number} index The index of where the textBlock should be stored in its parent.
 * @param {String} content The task description to be inserted if kind was a task (optional)
 * @param {Number} tablevel The tablevel of the textBlock.
 * @param {String} kind The kind of textBlock (task, event, or paragraph)
 * @param {String} objectReference The id of the task or event linked to the textBlock.
 * @param {Array<Object>} signifiers The signifiers used by the textBlock.
 * @param {Date} date The date of the event if the textBlock kind was an event (opional).
 * @param {doubleParameterCallback} callback Eihter sends the newly created textBlock or an error if there is one to the callback.
 */
export function createTextBlockPouch (db, parent, index, content, tabLevel, kind, objectReference, signifiers, date, callback) {
	localStorage.readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err, null);
			/* istanbul ignore next */
		} else {
			// Sets up the Text block itself
			let id = makeid(user);
			let textBlockObject = {
				id: id,
				objectType: "textBlock",
				tabLevel: tabLevel,
				parent: parent.id,
				kind, kind,
				objectReference: objectReference,
				text: content,
				signifiers: []
			};
			signifiers.forEach(signifier => {textBlockObject.signifiers.push(signifier.id)});
			
			// Handles sub components if needed
			handleSubComponent(textBlockObject, date, (failedSubComponent, textBlock) => {
				/* istanbul ignore next */
				if (failedSubComponent) {
					/* istanbul ignore next */
					callback(failedSubComponent, null);
					/* istanbul ignore next */
				} else {
					localStorage.readUser((error, updatedUser) => {
						if (error) {
							callback(error, null);
						} else {
							if (index === null) {
								parent.content.push(id);
							} else {
								parent.content.splice(index, 0, id);
							}
							updatedUser[`${parent.objectType}s`] = updatedUser[`${parent.objectType}s`].filter(object => object.id !== parent.id);
							updatedUser[`${parent.objectType}s`].push(parent);
							updatedUser.textBlocks.push(textBlock);
							let newUser = {
								_id: "0000",
								_rev: updatedUser._rev,
								email: updatedUser.email,
								theme: updatedUser.theme,
								index: updatedUser.index,
								dailyLogs: updatedUser.dailyLogs,
								monthlyLogs: updatedUser.monthlyLogs,
								futureLogs: updatedUser.futureLogs,
								collections: updatedUser.collections,
								trackers: updatedUser.trackers,
								imageBlocks: updatedUser.imageBlocks,
								audioBlocks: updatedUser.audioBlocks,
								textBlocks: updatedUser.textBlocks,
								tasks: updatedUser.tasks,
								events: updatedUser.events,
								signifiers: updatedUser.signifiers
							};

							return db.put(newUser).then((res) => {
								if (res.ok) {
									localStorage.setUser(newUser);
									callback(null, textBlock);
								}				
								/* istanbul ignore next */	
							}).catch((error) => {
								/* istanbul ignore next */
								callback(error, null);
							});
						}
					});
				}
			});

		}
	});
	// db.get("0000", (err, doc) => {
	// 	if (err) {
	// 		callback(err, null);
	// 	} else {
	// 		let id = makeid(doc);
	// 		let signifiersIDs = [];
	// 		signifiers.forEach((signifier) => {
	// 			signifiersIDs.push(signifier.id);
	// 		})
	// 		textBlockObject = {
	// 			id: id,
	// 			objectType: "textBlock",
	// 			tabLevel: tabLevel,
	// 			parent: parent,
	// 			kind: kind,
	// 			objectReference: objectReference,
	// 			text: content,
	// 			signifiers: signifiersIDs
	// 		};

	// 		if (kind === "task" || kind === "event") {
	// 			if (kind === "task") {
	// 				// Index == null for now just for testing
	// 				localStorage.createTask(id, content, 0, null, false, (error, task) => {
	// 					if (error) {
	// 						callback(error, null);
	// 					} else {
	// 						textBlockObject.objectReference = task.id;
	// 						localStorage.readUser((error2, user) => {
	// 							if (error2) {
	// 								callback(error2, null);
	// 							} else {
	// 								let userArr = [];
	// 								Array.prototype.push.apply(userArr, user.dailyLogs);
	// 								Array.prototype.push.apply(userArr, user.monthlyLogs);
	// 								Array.prototype.push.apply(userArr, user.trackers);
	// 								Array.prototype.push.apply(userArr, user.collections);

	// 								let parentArr = userArr.filter((object) => object.id === parent);

	// 								if (parent === null) {
	// 									if (index === null) {
	// 										user.index.contents.push(id);
	// 									} else {
	// 										user.index.contents.splice(index, 0, id);
	// 									}
	// 								} else if (index === null) {
	// 									if (subParent === null) {
	// 										parentArr[0].content.push(id);
	// 									} else if (parentArr[0].objectType === "monthlyLog") {
	// 										let newContents = parentArr[0].days.filter((day) => day.dailyLog === subParent)[0];
	// 										newContents.content.push(id);
	// 									} else if (parentArr[0].objectType === "futureLog") {
	// 										let newContents = parentArr[0].months.filter((month) => month.monthlyLog === subParent)[0];
	// 										newContents.content.push(id);
	// 									}
	// 								} else if (subParent === null) {
	// 									parentArr[0].content.splice(index, 0, id);
	// 								} else if (parentArr[0].objectType === "monthlyLog") {
	// 									let newContents = parentArr[0].days.filter((day) => day.dailyLog === subParent)[0];
	// 									newContents.content.splice(index, 0, id);
	// 								} else if (parentArr[0].objectType === "futureLog") {
	// 									let newContents = parentArr[0].months.filter((month) => month.monthlyLog === subParent)[0];
	// 									newContents.content.splice(index, 0, id);
	// 								}

	// 								user.textBlocks.push(textBlockObject);

	// 								let newUser = {
	// 									_id: "0000",
	// 									_rev: user._rev,
	// 									email: user.email,
	// 									theme: user.theme,
	// 									index: user.index,
	// 									dailyLogs: user.dailyLogs,
	// 									monthlyLogs: user.monthlyLogs,
	// 									futureLogs: user.futureLogs,
	// 									collections: user.collections,
	// 									trackers: user.trackers,
	// 									imageBlocks: user.imageBlocks,
	// 									audioBlocks: user.audioBlocks,
	// 									textBlocks: user.textBlocks,
	// 									tasks: user.tasks,
	// 									events: user.events,
	// 									signifiers: user.signifiers
	// 								};

	// 								return db.put(newUser).then((res) => {
	// 									if (res.ok) {
	// 										localStorage.setUser(newUser);
	// 									}
	// 									console.log(res);
	// 									callback(null, textBlockObject);
	// 								}).catch((error3) => {
	// 									console.log(error3);
	// 									callback(error3, null);
	// 									return;
	// 								});
	// 							}
	// 						});
	// 					}
	// 				})
	// 			} else if (kind === "event") {
	// 				// Index == null for now just for testing
	// 				localStorage.createEvent(content, id, date, null, true, (error, event) => {
	// 					if (error) {
	// 						callback(error, null);
	// 					} else {
	// 						textBlockObject.objectReference = event.id;
	// 						localStorage.readUser((err2, user) => {
	// 							if (err2) {
	// 								callback(err2, null);
	// 							} else {
	// 								let userArr = [];
	// 								Array.prototype.push.apply(userArr, user.dailyLogs);
	// 								Array.prototype.push.apply(userArr, user.monthlyLogs);
	// 								Array.prototype.push.apply(userArr, user.trackers);
	// 								Array.prototype.push.apply(userArr, user.collections);

	// 								let parentArr = userArr.filter((object) => object.id === parent);

	// 								if (parent === null) {
	// 									if (index === null) {
	// 										user.index.contents.push(id);
	// 									} else {
	// 										user.index.contents.splice(index, 0, id);
	// 									}
	// 								} else if (index === null) {
	// 									if (subParent === null) {
	// 										parentArr[0].content.push(id);
	// 									} else if (parentArr[0].objectType === "monthlyLog") {
	// 										let newContents = parentArr[0].days.filter((day) => day.dailyLog === subParent)[0];
	// 										newContents.content.push(id);
	// 									} else if (parentArr[0].objectType === "futureLog") {
	// 										let newContents = parentArr[0].months.filter((month) => month.monthlyLog === subParent)[0];
	// 										newContents.content.push(id);
	// 									}
	// 								} else if (subParent === null) {
	// 									parentArr[0].content.splice(index, 0, id);
	// 								} else if (parentArr[0].objectType === "monthlyLog") {
	// 									let newContents = parentArr[0].days.filter((day) => day.dailyLog === subParent)[0];
	// 									newContents.content.splice(index, 0, id);
	// 								} else if (parentArr[0].objectType === "futureLog") {
	// 									let newContents = parentArr[0].months.filter((month) => month.monthlyLog === subParent)[0];
	// 									newContents.content.splice(index, 0, id);
	// 								}

	// 								user.textBlocks.push(textBlockObject);
									
	// 								let newUser = {
	// 									_id: "0000",
	// 									_rev: user._rev,
	// 									email: user.email,
	// 									theme: user.theme,
	// 									index: user.index,
	// 									dailyLogs: user.dailyLogs,
	// 									monthlyLogs: user.monthlyLogs,
	// 									futureLogs: user.futureLogs,
	// 									collections: user.collections,
	// 									trackers: user.trackers,
	// 									imageBlocks: user.imageBlocks,
	// 									audioBlocks: user.audioBlocks,
	// 									textBlocks: user.textBlocks,
	// 									tasks: user.tasks,
	// 									events: user.events,
	// 									signifiers: user.signifiers
	// 								};

	// 								return db.put(newUser).then((res) => {
	// 									if (res.ok) {
	// 										localStorage.setUser(newUser);
	// 									}
	// 									console.log(res);
	// 								}).catch((error2) => {
	// 									console.log(error2);
	// 									callback(error2, null);
	// 									return;
	// 								});
	// 							}
	// 						});
	// 					}
	// 				})
	// 			}
	// 		} else {
	// 			let userArr = [];
	// 			Array.prototype.push.apply(userArr, doc.dailyLogs);
	// 			Array.prototype.push.apply(userArr, doc.monthlyLogs);
	// 			Array.prototype.push.apply(userArr, doc.futureLogs);
	// 			Array.prototype.push.apply(userArr, doc.trackers);
	// 			Array.prototype.push.apply(userArr, doc.collections);

	// 			let parentArr = userArr.filter((object) => object.id === parent);

	// 			if (parent === null) {
	// 				if (index === null) {
	// 					doc.index.contents.push(id);
	// 				} else {
	// 					doc.index.contents.splice(index, 0, id);
	// 				}
	// 			} else if (index === null) {
	// 				if (subParent === null) {
	// 					parentArr[0].content.push(id);
	// 				} else if (parentArr[0].objectType === "monthlyLog") {
	// 					let newContents = parentArr[0].days.filter((day) => day.dailyLog === subParent)[0];
	// 					newContents.content.push(id);
	// 				} else if (parentArr[0].objectType === "futureLog") {
	// 					let newContents = parentArr[0].months.filter((month) => month.monthlyLog === subParent)[0];
	// 					newContents.content.push(id);
	// 				}
	// 			} else if (subParent === null) {
	// 				parentArr[0].content.splice(index, 0, id);
	// 			} else if (parentArr[0].objectType === "monthlyLog") {
	// 				let newContents = parentArr[0].days.filter((day) => day.dailyLog === subParent)[0];
	// 				newContents.content.splice(index, 0, id);
	// 			} else if (parentArr[0].objectType === "futureLog") {
	// 				let newContents = parentArr[0].months.filter((month) => month.monthlyLog === subParent)[0];
	// 				newContents.content.splice(index, 0, id);
	// 			}

	// 			doc.textBlocks.push(textBlockObject);
				
	// 			let newUser = {
	// 				_id: "0000",
	// 				_rev: doc._rev,
	// 				email: doc.email,
	// 				theme: doc.theme,
	// 				index: doc.index,
	// 				dailyLogs: doc.dailyLogs,
	// 				monthlyLogs: doc.monthlyLogs,
	// 				futureLogs: doc.futureLogs,
	// 				collections: doc.collections,
	// 				trackers: doc.trackers,
	// 				imageBlocks: doc.imageBlocks,
	// 				audioBlocks: doc.audioBlocks,
	// 				textBlocks: doc.textBlocks,
	// 				tasks: doc.tasks,
	// 				events: doc.events,
	// 				signifiers: doc.signifiers
	// 			};

	// 			return db.put(newUser).then((res) => {
	// 				if (res.ok) {
	// 					localStorage.setUser(newUser);
	// 				}
	// 				console.log(res);
	// 			}).catch((error) => {
	// 				callback(error, null);
	// 				return;
	// 			});
	// 		}
	// 	}
	// }).then((res) => {
	// 	if (res.ok) {
	// 		console.log(textBlockObject);
	// 		callback(null, textBlockObject);
	// 	}
	// });
}
