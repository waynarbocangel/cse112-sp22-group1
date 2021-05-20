
import {createUserPouch} from "../../back-end/createFiles/createUser.js";
import {readUserPouch} from "./readFiles/readUser.js";
import {createCollectionPouch} from "./createFiles/createCollection.js";
import {createDailyLogPouch} from "./createFiles/createDailyLog.js";
import {createEventBlockPouch} from "/createFiles/createEventBlock.js";
import {createFutureLogPouch} from "./createFiles/createFutureLog.js";
import {createMonthlyLogPouch} from "./createFiles/createMonthlyLog.js"
import {createSignifierPouch} from "./createFiles/createSignifier.js";
import {createTextBlockPouch} from "./createFiles/TextBlock.js";
import {createTrackerPouch} from "./createFiles/createTracker.js";
//---------------importing from delete-------------------------------------------
import {deleteCollectionPouch} from "./deleteFiles/deleteCollection.js";
import {deleteEventBlockPouch} from "./deleteFiles/deleteEventBlock.js";
import {deleteSignifierPouch} from "./deleteFiles/deleteSignifie.js";
import {deleteTaskBlockPouch} from "./deleteFiles/deleteTaskBlock.js";
import {deleteTextBlockPouch} from "./deleteFiles/deleteTextBlock.js";
import {deleteTrackerPouch} from "./deleteFiles/deleteTracker.js";
import {deleteUserPouch} from "./deleteFiles/deleteUser.js";



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

export function createCollection(title, parent, content, callback){
	createCollectionPouch(db, title, parent, content, callback);
}

export function createDailyLog(parent, content, trackers, callback){
    createDailyLogPouch(db, parent, content, trackers, (user) => {
		callback(user);
	});
}

export function createEventBlock(parent, text, date, signifier, callback) {
	createEventBlockPouch(db, parent, text, date, signifier, (user) => {
		callback(user);
	})
}

export function createFutureLog(startDate, endDate, months, content, trackers, callback) {
	createFutureLogPouch(db, startDate, endDate, months, content, trackers, (user) => {
		callback(user);
	})
}

export function createMonthlyLog(parent, content, days, trackers, callback) {
	createMonthlyLogPouch(db, parent, content, days, trackers, (user) => {
		callback(user);
	})
}

export function createSignifier(meaning, symbol, callback) {
	createSignifierPouch(db, meaning, symbol, (user) => {
		callback(user);
	})
}

export function createTaskBlock(parent, text, complete, signifier, callback) {
	createTaskBlockPouch(db, parent, text, complete, signifier, (user) => {
		callback(user);
	})
}

export function createTextBlock(parent, content, trackers, callback){
	createTextBlockPouch(db, parent, content, trackers, callback);
}

export function createTracker(content, parent, callback) {
	createTrackerPouch(db, content, parent, (user) => {
		callback(user);
	})
}

export function readUser(callback){
	readUserPouch(db, (user) => {
		callback(user);
	});
}

export function deleteUser(){
	deleteUserPouch(db, (user) => {
		return res.send(user);
	});
}

export function deleteCollection(collection, callback){
	deleteCollectionPouch(db, collection.id, callback);
}

export function deleteCollectionByID (id, callback){
	deleteCollectionPouch(db, id, callback);
}

export function deleteEvent(event, callback){
	deleteEventBlockPouch(db, event.id, callback);
}

export function deleteEventByID(id, callback){
	deleteEventBlockPouch(db, id, callback);
}

export function deleteEventAtIndex(container, index, callback){
	deleteEventBlockPouch(db, container.content[index], callback);
}

export function deleteSignifier(signifier, callback){
	deleteSignifierPouch(db, signifier.id, callback);
}

export function deleteSignifierByID(id, callback){
	deleteSignifierPouch(db, id, callback);
}

export function deleteSignifierAtBlock(block, callback){
	deleteSignifierPouch(db, block.signifier, callback);
}

export function deleteTask(task, callback){
	deleteTaskBlockPouch(db, task.id, callback);
}

export function deleteTaskByID(id, callback){
	deleteTaskBlockPouch(db, id, callback);
}

export function deleteTextBlock(block, callback){
	deleteTextBlockPouch(db, block.id, callback);
}

export function deleteTextBlockByID(id, callback){
	deleteTextBlockPouch(db, id, callback);
}

export function deleteTextBlockFromContainer(container, index, callback){
	deleteTextBlockPouch(db, container.contents[index], callback);
}

export function deleteTracker(tracker, callback){
	deleteTrackerPouch(db, tracker.id, callback);
}

export function deleteTrackerByID(id, callback){
	deleteTrackerPouch(db, id, callback);
}

export function deleteTrackerFromContainer(container, index, callback){
	deleteTrackerPouch(db, container.trackers[index], callback);
}
