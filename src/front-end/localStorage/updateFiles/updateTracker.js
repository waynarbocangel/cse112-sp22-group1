import { readUser } from "../userOperations";

/**
 * Finds and update the tracker passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} tracker The tracker to be deleted.
 * @param {Object} parent The original parent
 * @param {Object} addParent The new parent
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateTrackerPouch (db, tracker, parent, addParent, callback) {
	readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err);
			/* istanbul ignore next */
		} else {
			
			if (parent && addParent && tracker.parent != parent.id) {
				parent.trackers = parent.trackers.filter(block => block !== tracker.id);
				user[`${parent.objectType}s`] = user[`${parent.objectType}s`].filter(object => object.id !== parent.id);
				user[`${parent.objectType}s`].push(parent);
				addParent.tracker.push(collection.id);
				user[`${addParent.objectType}s`] = user[`${addParent.objectType}s`].filter(object => object.id !== addParent.id);
				user[`${addParent.objectType}s`].push(addParent);
			} else if ((user.trackers.filter(block => block.id === tracker.id))[0].parent !== tracker.parent) {
				callback("You are changing the parent without providing the original and old one");
				return;
			}

			user.trackers = user.trackers.filter((element) => element.id !== tracker.id);
			user.trackers.push(tracker);
			let newUser = {
				_id: "0000",
				_rev: user._rev,
				email: user.email,
				theme: user.email,
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
				signifiers: user.signifers
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
