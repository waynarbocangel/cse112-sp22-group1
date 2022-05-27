import { readUser } from "../userOperations";

/**
 * Finds and update the task passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} task The task to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateTaskPouch (db, task, callback) {
	console.log("task when calling update task", task);
	readUser((err, user) => {
		if (err) {
			callback(err);
		} else {
			let taskArr = user.tasks.filter((element) => element.id !== task.id);
			taskArr.push(task);
			console.log("taskArr is, ", taskArr);
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
				textBlocks: user.textBlocks,
				tasks: taskArr,
				events: user.events,
				signifiers: user.signifiers
			};
			db.put(newUser).then((res) => {
				if (res) {
					callback(res);
				}
			}).catch(error => callback(error));
		}
	})
}
