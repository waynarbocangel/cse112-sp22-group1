require("dotenv").config();
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function readUserPouch (db, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			callback(doc);
		}
	});
}

function readUser (userData, callback) {
	schema.User.findOne({email: userData.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			let newCollections = [];
			for(let i = 0; i < user.collections.lenght; i++){
				let collection = user.collection[i];
				collection.title = security.decrypt(collection.title, userData.pwd);
				newCollections.push(collection);
			}
			let newTextBlocks = [];
			for(let i = 0; i < user.textBlocks.lenght; i++){
				let block = user.textBlocks[i];
				block.text = security.decrypt(block.text, userData.pwd);
				newTextBlocks.push(block);
			}
			let newTaskBlocks = [];
			for(let i = 0; i < user.taskBlocks.lenght; i++){
				let block = user.taskBlocks[i];
				block.text = security.decrypt(block.text, userData.pwd);
				newTextBlocks.push(block);
			}
			let newEventBlocks = [];
			for(let i = 0; i < user.eventBlocks.lenght; i++){
				let block = user.eventBlocks[i];
				block.text = security.decrypt(block.text, userData.pwd);
				newTextBlocks.push(block);
			}
			let newSignifiers = [];
			for(let i = 0; i < user.signifiers.lenght; i++){
				let signifier = user.signifiers[i];
				signifier.text = security.decrypt(signifier.meaning, userData.pwd);
				newTextBlocks.push(signifier);
			}
			let decodedUser = {
				email: user.email,
				pwd: userData.pwd,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				trackers: user.trackers,
				collections: newCollections,
				textBlocks: newTextBlocks,
				eventBlocks: newEventBlocks,
				taskBlocks: newTaskBlocks,
				signifiers: newSignifiers
			}
			callback(decodedUser);
		}
	});
}

module.exports = {
	readUser: readUser,
	readUserPouch: readUserPouch
}
