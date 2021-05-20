import { createDailyLogPouch } from "./createFiles/createDailyLog.js";
import {createUserPouch} from "./createFiles/createUser.js";
import {deleteUserPouch} from "./deleteFiles/deleteUser.js";
import {readUserPouch} from "./readFiles/readUser.js";
// import {db} from "../login/login.js";
// import {updateUserPouch} from "./updateUser.js";
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

export function createDailyLog(parent, content, trackers, callback){
    createDailyLogPouch(db, parent, content, trackers, (user) => {
		callback(user);
	});
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