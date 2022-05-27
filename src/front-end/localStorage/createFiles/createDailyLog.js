import {makeid} from "./makeId.js";
import * as localStorage from "../userOperations.js";
let dailyObject = {};

/**
 * Creates and stores a new dailyLog created from the given parameters.
 * @memberof createFunctions
 * @param {database} db The local pouch database.
 * @param {String} parent The id of the parent of the new dailyLog.
 * @param {Array} content Array of textBlocks that should appear in dailyLog.
 * @param {Array} collections Array of collections that should appead in dailyLog
 * @param {Array} trackers Array of trackers that should appear in dailyLog.
 * @param {Date} date The date of the dailyLog.
 * @param {doubleParameterCallback} callback Eihter sends the newly created dailyLog or an error if there is one to the callback.
 */
export function createDailyLogPouch (db, parent, content, collections, trackers, date, callback) {
	localStorage.readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err, null);
		} else {
			let id = makeid(user);
			
			dailyObject = {
				id: id,
				objectType: "dailyLog",
				date: date,
				parent: parent,
				content: content,
				collections: collections,
				trackers: trackers
			};

			user.dailyLogs.push(dailyObject);
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
				if (res.ok) {
					callback(null, dailyObject);
					localStorage.setUser(newUser);
				}
			/* istanbul ignore next */
			}).catch((err) => {
				/* istanbul ignore next */
				callback(err, null);
				/* istanbul ignore next */
				return;
			});
		}
	});
}
