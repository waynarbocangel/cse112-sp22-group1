import {makeid} from "./makeId.js";
import * as localStorage from "../userOperations.js";

/**
 * Creates and stores a new task created from the given parameters.
 * @memberof createFunctions
 * @param {database} db The local pouch database.
 * @param {String} parent The id of the parent of the new task.
 * @param {String} text Description of the task.
 * @param {Number} complete Number to keep track if task is complete or not. (zero for non-complete and non-zero for complete)
 * @param {Array<String>} signifiers The id of the signifier the task is supposed to use.
 * @param {doubleParameterCallback} callback Eihter sends the newly created task or an error if there is one to the callback.
 */
export function createTaskPouch (db, parent, text, complete, signifiers, callback) {
	localStorage.readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err, null);
		} else {
			let id = makeid(user);
			let taskObject = {};
			taskObject = {
				id: id,
				objectType: "task",
				parent: parent,
				text: text,
				complete: complete,
				signifiers: signifiers
			};

			user.tasks.push(taskObject);
			
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				theme: user.theme,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				collections: user.collections,
				trackers: user.trackers,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				tasks: user.tasks,
				events: user.events,
				signifiers: user.signifiers
			};

			return db.put(newUser).then((res) => {
				/* istanbul ignore next */
				if (res.ok) {
					localStorage.setUser(newUser);
					callback(null, taskObject);
				}
				/* istanbul ignore next */
			}).catch((error) => {
				/* istanbul ignore next */
				callback(error, null);
			});
		}
	});
}
