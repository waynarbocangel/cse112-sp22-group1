// TODO: UNFINISHED, edit schema
import { readUser } from "../userOperations";

/**
 * Finds and update the task passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} task The task to be deleted.
 * @param {Object} parent The parent of the task being updated
 * @param {Object} addParent The new parent of the task
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateTaskPouch (db, task, parent, addParent, callback) {
	/* istanbul ignore next */
	readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err);
			/* istanbul ignore next */
		} else {

			if (parent && addParent && task.parent != parent.id) {
				/* TODO */
				parent.content = parent.content.filter(block => block !== task.id);
				user.textBlocks = user.textBlocks.filter(object => object.id !== parent.id);
				user.textBlocks.push(parent);
				addParent.content.push(task.id);
				user.textBlocks = user.textBlocks.filter(object => object.id !== addParent.id);
				user.textBlocks.push(addParent);
			} else if ((user.tasks.filter(block => block.id === tasks.id))[0].parent !== task.parent){
				callback("You are changing the parent without providing the original and old one");
				return;
			}

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
			
			return db.put(newUser).then((res) => {
				/* istanbul ignore next */
				if (res) {
					callback(res);
				}
				/* istanbul ignore next */
			}).catch(error => callback(error));
		}
	})
}
