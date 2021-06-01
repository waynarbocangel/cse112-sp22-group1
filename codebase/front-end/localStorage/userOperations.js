import {createUserPouch} from "./createFiles/createUser.js";
import {readUserPouch} from "./readFiles/readUser.js";
import {createCollectionPouch} from "./createFiles/createCollection.js";
import {createDailyLogPouch} from "./createFiles/createDailyLog.js";
import {createEventPouch} from "./createFiles/createEvent.js";
import {createFutureLogPouch} from "./createFiles/createFutureLog.js";
import {createMonthlyLogPouch} from "./createFiles/createMonthlyLog.js"
import {createSignifierPouch} from "./createFiles/createSignifier.js";
import {createTextBlockPouch} from "./createFiles/createTextBlock.js";
import {createTrackerPouch} from "./createFiles/createTracker.js";
import {createTaskPouch} from "./createFiles/createTask.js";
import {createImageBlockPouch} from "./createFiles/createImageBlock.js";
import {createAudioBlockPouch} from "./createFiles/createAudioBlock.js";
//---------------importing from delete-------------------------------------------
import {deleteCollectionPouch} from "./deleteFiles/deleteCollection.js";
import {deleteEventPouch} from "./deleteFiles/deleteEvent.js";
import {deleteSignifierPouch} from "./deleteFiles/deleteSignifier.js";
import {deleteTaskPouch} from "./deleteFiles/deleteTask.js";
import {deleteTextBlockPouch} from "./deleteFiles/deleteTextBlock.js";
import {deleteTrackerPouch} from "./deleteFiles/deleteTracker.js";
import {deleteUserPouch} from "./deleteFiles/deleteUser.js";
import {deleteImageBlockPouch} from "./deleteFiles/deleteImageBlock.js";
import {deleteAudioBlockPouch} from "./deleteFiles/deleteAudioBlock.js";
//---------------importing from update-------------------------------------------
import {updateUserPouch, updateUserOnline} from "./updateFiles/updateUser.js";
import {updateDailyLogPouch} from "./updateFiles/updateDailyLog.js";
import {updateMonthlyLogPouch} from "./updateFiles/updateMonthlyLog.js";
import {updateFutureLogPouch} from "./updateFiles/updateFutureLog.js";
import {updateCollectionPouch} from "./updateFiles/updateCollection.js";
import {updateTrackerPouch} from "./updateFiles/updateTracker.js";
import {updateTextBlockPouch} from "./updateFiles/updateTextBlock.js";
import {updateTaskPouch} from "./updateFiles/updateTask.js";
import {updateEventPouch} from "./updateFiles/updateEvent.js";
import {updateSignifierPouch} from "./updateFiles/updateSignifier.js";
import {updateImageBlockPouch} from "./updateFiles/updateImageBlock.js";
import {updateAudioBlockPouch} from "./updateFiles/updateAudioBlock.js";

export let db = new PouchDB("Users");

export function deleteDB(){
    db.destroy( (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

    db.info( (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});
}

export function loginUser(email, pwd, callback){
	fetch(`http://localhost:3000/readUser`, {
		headers:{
			"content-type": "application/json; charset=UTF-8"
		},
		body:JSON.stringify({
			email: email,
			pwd: pwd
		}),
		method: "POST"
	}).then((data) => {return data.json()}).then((res) => {
		callback(res);
	});
}

export function createUser(email, pwd, callback){
    fetch(`http://localhost:3000/createUser`, {
		headers:{
			"content-type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify({
			email: email,
			pwd: pwd
		}),
		method: "POST"
	}).then((data) => {
        return data.json();
    }).then((userData) => {
		userData.pwd = pwd;
        createUserPouch(db, userData, (user) => {
			callback(user);
		});
    });
}

export function createImageBlock(parent, arrangement, data, callback){
	createImageBlockPouch(db, parent, arrangement, data, (err, image) => {
		updateUserFromMongo();
		callback(err, image);
	});
}

export function createAudioBlock(parent, arrangement, data, callback){
	createAudioBlockPouch(db, parent, arrangement, data, (err, audio) => {
		updateUserFromMongo();
		callback(err, audio);
	});
}

export function createCollection(title, parent, content, callback){
	createCollectionPouch(db, title, parent, content, (err, collection) => {
		updateUserFromMongo();
		callback(err, collection);
	});
}

export function createDailyLog(parent, content, trackers, date, callback){
    createDailyLogPouch(db, parent, content, trackers, date, (err, day) => {
		updateUserFromMongo();
		callback(err, day);
	});
}

export function createEvent(title, parent, date, signifier, callback) {
	createEventPouch(db, title, parent, date, signifier, (error, event) => {
		updateUserFromMongo();
		callback(error, event);
	})
}

export function createFutureLog(startDate, endDate, months, content, trackers, callback) {
	createFutureLogPouch(db, startDate, endDate, months, content, trackers, (err, futureLog) => {
		updateUserFromMongo();
		callback(err, futureLog);
	})
}

export function createMonthlyLog(parent, content, days, trackers, date, callback) {
	createMonthlyLogPouch(db, parent, content, days, trackers, date, (error, month) => {
		updateUserFromMongo();
		callback(error, month);
	})
}

export function createSignifier(meaning, symbol, callback) {
	createSignifierPouch(db, meaning, symbol, (err, signifier) => {
		updateUserFromMongo();
		callback(err, signifier);
	})
}

export function createTask(parent, text, complete, signifier, callback) {
	createTaskPouch(db, parent, text, complete, signifier, (error, task) => {
		updateUserFromMongo();
		callback(error, task);
	})
}

export function createTextBlock(parent, subParent, index, content, tabLevel, kind, objectReference, signifier, date, callback){
	createTextBlockPouch(db, parent, subParent, index, content, tabLevel, kind, objectReference, signifier, date, (error, textBlock) => {
		updateUserFromMongo();
		callback(error, textBlock);
	});
}

export function createTracker(title, content, parent, callback) {
	createTrackerPouch(db, title, content, parent, (err, tracker) => {
		updateUserFromMongo();
		callback(err, tracker);
	})
}

export function readUser(callback){
	readUserPouch(db, (err, user) => {
		updateUserFromMongo();
		callback(err, user);
	});
}

export function deleteUser(callback){
	deleteUserPouch(db, (user) => {
		updateUserFromMongo();
		callback(user);
	});
}

export function deleteImageBlock(imageBlock, callback){
	deleteImageBlockPouch(db, imageBlock.id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteImageBlockByID(id, callback){
	deleteImageBlockPouch(db, id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteAudioBlock(audioBlock, callback){
	deleteAudioBlockPouch(db, audioBlock.id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteAudioBlockByID(id, callback){
	deleteAudioBlockPouch(db, id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteCollection(collection, callback){
	deleteCollectionPouch(db, collection.id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteCollectionByID (id, callback){
	deleteCollectionPouch(db, id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteEvent(event, callback){
	deleteEventPouch(db, event.id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteEventByID(id, callback){
	deleteEventPouch(db, id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteEventAtIndex(container, index, callback){
	deleteEventPouch(db, container.content[index], (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteSignifier(signifier, callback){
	deleteSignifierPouch(db, signifier.id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteSignifierByID(id, callback){
	deleteSignifierPouch(db, id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteSignifierAtBlock(block, callback){
	deleteSignifierPouch(db, block.signifier, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteTask(task, callback){
	deleteTaskPouch(db, task.id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteTaskByID(id, callback){
	deleteTaskPouch(db, id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteTextBlock(block, callback){
	deleteTextBlockPouch(db, block.id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteTextBlockByID(id, callback){
	deleteTextBlockPouch(db, id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteTextBlockFromContainer(container, index, callback){
	deleteTextBlockPouch(db, container.contents[index], (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteTracker(tracker, callback){
	deleteTrackerPouch(db, tracker.id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteTrackerByID(id, callback){
	deleteTrackerPouch(db, id, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function deleteTrackerFromContainer(container, index, callback){
	deleteTrackerPouch(db, container.trackers[index], (err) => {
		updateUserFromMogo();
		callback(err);
	});
}

//-------------------------------Update Functions----------------------------------
export function updateUser(callback){
	updateUserPouch(db, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateUserFromMongo(){
	updateUserOnline(db, (user) => {
		console.log(user);
	});
}


export function updateImageBlock(imageBlock, callback){
	updateImageBlockPouch(db, imageBlock, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateImageBlockByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let imageBlock = doc.userObject.imageBlocks.filter(element => element.id == id);
			updateImageBlockPouch(db, imageBlock[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});
		}
	});
}

export function updateAudioBlock(AudioBlock, callback){
	updateAudioBlockPouch(db, AudioBlock, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateAudioBlockByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let audioBlock = doc.userObject.audioBlocks.filter(element => element.id == id);
			updateAudioBlockPouch(db, audioBlock[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});
		}
	});
}

export function updateDailyLog(dailyLog, callback) {
	updateDailyLogPouch(db, dailyLog, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateDailyLogByID (id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const dailyLog = doc.userObject.dailyLogs.filter(element => element.id == id);
			updateDailyLogPouch(db, dailyLog[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});	
		}
	});
}

export function updateMonthlyLog(monthlyLog, callback) {
	updateMonthlyLogPouch(db, monthlyLog, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateMonthlyLogByID (id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const monthlyLog = doc.userObject.monthlyLogs.filter(element => element.id == id);
			updateMonthlyLogPouch(db, monthlyLog[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});		
		}
	});
}

export function updateFutureLog(futureLog, callback) {
	updateFutureLogPouch(db, futureLog, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateFutureLogByID (id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const futureLog = doc.userObject.futureLogs.filter(element => element.id == id);
			updateFutureLogPouch(db, futureLog[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});
		}
	});
}

export function updateCollection(collection, callback){
	updateCollectionPouch(db, collection, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateCollectionByID (id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const collection = doc.userObject.collections.filter(element => element.id == id);
			updateCollectionPouch(db, collection[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});		
		}
	});
}

export function updateEvent(event, callback){
	updateEventPouch(db, event, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}


export function updateEventByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const event = doc.events.filter(element => element.id == id);
			updateEventPouch(db, event[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});		
		}
	});
}

export function updateEventAtIndex(container, index, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const event = doc.events.filter(element => element.id == container.content[index]);
			updateEventPouch(db, event[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});		
		}
	});
}

export function updateSignifier(signifier, callback){
	updateSignifierPouch(db, signifier, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateSignifierByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const signifier = doc.userObject.signifiers.filter(element => element.id == id);
			updateSignifierPouch(db, signifier[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});		
		}
	});
}

export function updateSignifierAtBlock(block, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const signifier = doc.userObject.signifiers.filter(element => element.id == block.signifier);
			updateSignifierPouch(db, signifier[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});
		}
	});
}

export function updateTask(task, callback){
	updateTaskPouch(db, task, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateTaskByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const task = doc.tasks.filter(element => element.id == id);
			updateTaskPouch(db, task[0], (err) => {
				updateUserFromMongo();
				callback(err)
			});
		}
	});
}

export function updateTextBlock(block, date, callback){
	updateTextBlockPouch(db, block, date, (err) => {
		updateUserFromMongo();
		callabck(err);
	});
}

export function updateTextBlockByID(id, date, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const text = doc.userObject.textBlocks.filter(element => element.id == id);
			updateTextBlockPouch(db, text[0], date, (err) => {
				updateUserFromMongo();
				callback(err);
			});
		}
	});
}

export function updateTextBlockFromContainer(container, index, date, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const text = doc.userObject.textBlocks.filter(element => element.id == container.content[index]);
			updateTextBlockPouch(db, text[0], date, (err) => {
				updateUserFromMongo();
				callback(err);
			});		
		}
	});
}

export function updateTracker(tracker, callback){
	updateTrackerPouch(db, tracker, (err) => {
		updateUserFromMongo();
		callback(err);
	});
}

export function updateTrackerByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const tracker = doc.userObject.trackers.filter(element => element.id == id);
			updateTrackePouch(db, tracker[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});
		}
	});
}

export function updateTrackerFromContainer(container, index, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const tracker = doc.userObject.trackers.filter(element => element.id == container.content[index]);
			updateTrackerPouch(db, tracker[0], (err) => {
				updateUserFromMongo();
				callback(err);
			});
		}
	});
}
