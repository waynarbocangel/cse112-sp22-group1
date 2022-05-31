import { readUser } from "../userOperations";

/**
 * Finds and update the futureLog passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} log The futureLog to be deleted.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateFutureLogPouch (db, log, callback) {
	/* istanbul ignore next */
	readUser((err, doc) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err);
			/* istanbul ignore next */
		} else {
			let futureLogArr = doc.futureLogs.filter((element) => element.id !== log.id);
			futureLogArr.push(log);
			let newUser = {
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: futureLogArr,
				collections: doc.collections,
				trackers: doc.trackers,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers
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
