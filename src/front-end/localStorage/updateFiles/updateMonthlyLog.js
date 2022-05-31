import { readUser } from "../userOperations";

/**
 * Finds and update the monthlyLog passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} log The monthlyLog to be deleted.
 * @param {Object} parent The parent of the monthlyLog being updated
 * @param {Object} addParent The new parent of the monthlyLog
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateMonthlyLogPouch (db, log, parent, addParent, callback) {
	/* istanbul ignore next */
	readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err);
			/* istanbul ignore next */
		} else {

			if (parent && addParent && monthlyLog.parent != parent.id) {
				parent.months = parent.months.filter(month => month.id !== monthlyLog.id);
				user.futureLogs = user.futureLogs.filter(object => object.id !== parent.id);
				user.futureLogs.push(parent);
				addParent.months.push({
					id: monthlyLog.id,
					date: monthlyLog.date
				});
				user.futureLogs = user.futureLogs.filter(object => object.id !== addParent.id);
				user.futureLogs.push(addParent);
			} else if ((user.monthlyLogs.filter(block => block.id === monthlyLog.id))[0].parent !== monthlyLog.parent){
				callback("You are changing the parent without providing the original and old one");
				return;
			}

			let monthlyLogArr = user.monthlyLogs.filter((element) => element.id !== log.id);
			monthlyLogArr.push(log);
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				theme: user.theme,
				index: user.index,
				dailyLogs: user.dailyLogs,
				monthlyLogs: monthlyLogArr,
				futureLogs: user.futureLogs,
				trackers: user.trackers,
				collections: user.collections,
				imageBlocks: user.imageBlocks,
				audioBlocks: user.audioBlocks,
				textBlocks: user.textBlocks,
				events: user.events,
				tasks: user.tasks,
				signifiers: user.signifiers
			};
			
			return db.put(newUser).then((res) => {
				/* istanbul ignore next */
				if (res) {
					callback(null, log);
				}
				/* istanbul ignore next */
			}).catch(error => callback(error));
		}
	})
}
