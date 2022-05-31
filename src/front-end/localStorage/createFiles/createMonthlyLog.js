import { readUser } from "../userOperations.js";
import {makeid} from "./makeId.js";

/**
 * Creates and stores a new monthlyLog created from the given parameters.
 * @memberof createFunctions
 * @param {Database} db The local pouch database.
 * @param {String} parent The id of the parent of the new monthlyLog.
 * @param {Array} days The ids of the days included in the monthlyLog.
 * @param {Array} content The ids for the blocks included in the monthlyLog
 * @param {Array} collections The ids for the collections included in the monthlyLog
 * @param {Array} trackers The ids of the trackers included in the monthlyLog.
 * @param {Date} startDate The start date for the month
 * @param {Date} endDate The end date for the month
 * @param {doubleParameterCallback} callback Eihter sends the newly created monthlyLog or an error if there is one to the callback.
 */
export function createMonthlyLogPouch (db, parent, days, content, collections, trackers, startDate, endDate, callback) {
	let monthlyObject = null;
	readUser((err, doc) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err, null);
		} else {
			let id = makeid(doc);
			monthlyObject = {
				id: id,
				objectType: "monthlyLog",
				parent: parent,
				startDate: startDate,
				endDate: endDate,
				content: content,
				collections: collections,
				days: days,
				trackers: trackers,
				recurringTrackers: []
			};
			doc.monthlyLogs.push(monthlyObject);
			let newUser = {
				_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
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
				if (res) callback(null,monthlyObject);
				/* istanbul ignore next */
			}).catch((err) => {
				/* istanbul ignore next */
				callback(err, null);
			});
		}
	});
}
