import {makeid} from "./makeId.js";
import * as localStorage from "../userOperations.js";

/**
 * Creates and stores a new audioBlock created from the given parameters.
 * @memberof createFunctions
 * @param {database} db The local pouch database.
 * @param {String} parent The id of the parent of new audioBlock.
 * @param {String} arrangement Arrangement of the audioBlock.
 * @param {Buffer} data audio of the audioBlock stored as a buffer.
 * @param {doubleParameterCallback} callback Eihter sends the newly created audioBlock or an error if there is one to the callback.
 */
export function createAudioBlockPouch (db, parent, arrangement, data, callback) {
	let audioBlockObject = {};
	/* istanbul ignore next */
	localStorage.readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err, null);
			/* istanbul ignore next */
		} else {
			let id = makeid(user);
			audioBlockObject = {
				id: id,
				objectType: "audioBlock",
				parent: parent,
				arrangement: arrangement,
				data: data
			};

			user.audioBlocks.push(audioBlockObject);
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
					callback(null, audioBlockObject);
				}
				/* istanbul ignore next */
			}).catch((error) => {
				/* istanbul ignore next */
				callback(error, null);
			});
		}
	});
}
