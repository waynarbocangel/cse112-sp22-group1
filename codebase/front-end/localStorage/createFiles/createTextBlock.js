import {makeid} from "./makeId.js";
import * as localStorage from "./../userOperations.js";

let textBlockObject;

export function createTextBlockPouch (db, parent, subParent, index, content, tabLevel, kind, objectReference, signifier, date, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err, null);
		} else {
			let id = makeid();
			let arrays = [];
			Array.prototype.push.apply(arrays, doc.dailyLogs);
			Array.prototype.push.apply(arrays, doc.monthlyLogs);
			Array.prototype.push.apply(arrays, doc.futureLogs);
			Array.prototype.push.apply(arrays, doc.collections);
			Array.prototype.push.apply(arrays, doc.trackers);
			Array.prototype.push.apply(arrays, doc.textBlocks);
			Array.prototype.push.apply(arrays, doc.tasks);
			Array.prototype.push.apply(arrays, doc.events);
			Array.prototype.push.apply(arrays, doc.signifiers);
			
			while(arrays.filter(element => element.id == id).length > 0){
				id = makeid();
			}
			textBlockObject = {
				id: id,
				objectType: "textBlock",
				tabLevel: tabLevel,
				parent: parent,
				kind: kind,
				objectReference: objectReference,
				text: content,
				signifier: signifier
			};
			
			if(kind == "task" || kind == "event"){
				if (kind == "task") {
					//index == null for now just for testing
					localStorage.createTask(id, content, 0, null, (err, task) => {
						if (err) {
							console.log(err);
							callback(err, null);
						} else {
							textBlockObject.objectReference = task.id;
							localStorage.readUser((err, user) => {
								if (err){
									callback(err, null);
								} else {
									let userArr = [];
									Array.prototype.push.apply(userArr, user.dailyLogs);
									Array.prototype.push.apply(userArr, user.monthlyLogs);
									Array.prototype.push.apply(userArr, user.trackers);
									Array.prototype.push.apply(userArr, user.collections);

									let parentArr = userArr.filter(object => object.id == parent);

									if (parent == null){
										if(index == null) {
											user.index.contents.push(id);
										} else {
											user.index.contents.splice(index, 0, id);
										}
									} else if(index == null) {
										if (subParent == null){
											parentArr[0].content.push(id);
										} else if (parentArr[0].objectType == "monthlyLog"){
											let newContents = parentArr[0].days.filter(day => day.id == subParent);
											newContents.content.push(id);
										} else if (parentArr[0].objectType == "futureLog"){
											let newContents = parentArr[0].months.filter(month => month.id == subParent);
											newContents.content.push(id);
										}
									} else {
										if (subParent == null){
											parentArr[0].content.splice(index, 0, id);
										} else if (parentArr[0].objectType == "monthlyLog"){
											let newContents = parentArr[0].days.filter(day => day.id == subParent);
											newContents.content.splice(index, 0, id);
										} else if (parentArr[0].objectType == "futureLog"){
											let newContents = parentArr[0].months.filter(month => month.id == subParent);
											newContents.content.splice(index, 0, id);
										}
									}

									user.textBlocks.push(textBlockObject);

									return db.put(
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
									).then((res) => {
									}).catch((err) => {
										console.log(err);
										callback(err, null);
									});
								}
							});
						}
					})
				} else if (kind = "event") {
					//index == null for now just for testing
					localStorage.createEvent(null, id, date, null, (err, event) => {
						if (err) {
							callback(err, null);
						} else {
							textBlockObject.objectReference = event.id;
							localStorage.readUser((err, user) => {
								if (err){
									callback(err, null);
								} else {
									let userArr = [];
									Array.prototype.push.apply(userArr, user.dailyLogs);
									Array.prototype.push.apply(userArr, user.monthlyLogs);
									Array.prototype.push.apply(userArr, user.trackers);
									Array.prototype.push.apply(userArr, user.collections);

									let parentArr = userArr.filter(object => object.id == parent);

									if (parent == null){
										if(index == null) {
											user.index.contents.push(id);
										} else {
											user.index.contents.splice(index, 0, id);
										}
									} else if(index == null) {
										if (subParent == null){
											parentArr[0].content.push(id);
										} else if (parentArr[0].objectType == "monthlyLog"){
											let newContents = parentArr[0].days.filter(day => day.id == subParent);
											newContents.content.push(id);
										} else if (parentArr[0].objectType == "futureLog"){
											let newContents = parentArr[0].months.filter(month => month.id == subParent);
											newContents.content.push(id);
										}
									} else {
										if (subParent == null){
											parentArr[0].content.splice(index, 0, id);
										} else if (parentArr[0].objectType == "monthlyLog"){
											let newContents = parentArr[0].days.filter(day => day.id == subParent);
											newContents.content.splice(index, 0, id);
										} else if (parentArr[0].objectType == "futureLog"){
											let newContents = parentArr[0].months.filter(month => month.id == subParent);
											newContents.content.splice(index, 0, id);
										}
									}

									user.textBlocks.push(textBlockObject);

									return db.put(
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
									).then((res) => {
									}).catch((err) => {
										console.log(err);
										callback(err, null);
									});
								}
							});
						}
					})
				}
			} else {
				console.log("this still happens");
				let userArr = [];
				Array.prototype.push.apply(userArr, doc.dailyLogs);
				Array.prototype.push.apply(userArr, doc.monthlyLogs);
				Array.prototype.push.apply(userArr, doc.trackers);
				Array.prototype.push.apply(userArr, doc.collections);
	
				let parentArr = userArr.filter(object => object.id == parent);
	
				if (parent == null){
					if(index == null) {
						doc.index.contents.push(id);
					} else {
						doc.index.contents.splice(index, 0, id);
					}
				} else if(index == null) {
					if (subParent == null){
						parentArr[0].content.push(id);
					} else if (parentArr[0].objectType == "monthlyLog"){
						let newContents = parentArr[0].days.filter(day => day.id == subParent);
						newContents.content.push(id);
					} else if (parentArr[0].objectType == "futureLog"){
						let newContents = parentArr[0].months.filter(month => month.id == subParent);
						newContents.content.push(id);
					}
				} else {
					if (subParent == null){
						parentArr[0].content.splice(index, 0, id);
					} else if (parentArr[0].objectType == "monthlyLog"){
						let newContents = parentArr[0].days.filter(day => day.id == subParent);
						newContents.content.splice(index, 0, id);
					} else if (parentArr[0].objectType == "futureLog"){
						let newContents = parentArr[0].months.filter(month => month.id == subParent);
						newContents.content.splice(index, 0, id);
					}
				}
	
				doc.textBlocks.push(textBlockObject);
	
				return db.put(
					{
						_id: "0000",
						_rev: doc._rev,
						email: doc.email,
						pwd: doc.pwd,
						index: doc.index,
						dailyLogs: doc.dailyLogs,
						monthlyLogs: doc.monthlyLogs,
						futureLogs: doc.futureLogs,
						collections: doc.collections,
						trackers: doc.trackers,
						textBlocks: doc.textBlocks,
						tasks: doc.tasks,
						events: doc.events,
						signifiers: doc.signifiers
					}
				).then((res) => {
				}).catch((err) => {
					callback(err, null);
				});
			}
		}
	}).then((res) => {
		console.log(textBlockObject);
		callback(null, textBlockObject);
	});
}
