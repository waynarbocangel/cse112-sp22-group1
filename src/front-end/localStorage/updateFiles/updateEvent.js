import { readUser } from "../userOperations";

/**
 * Finds and update the event passed in.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {Object} event The event to be deleted.
 * @param {Object} reference The reference of the event being updated
 * @param {Object} addReference The new reference of the event
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
 export function updateEventPouch (db, event, reference, addReference, callback) {
	/* istanbul ignore next */
	readUser((err, user) => {
		/* istanbul ignore next */
		if (err) {
			/* istanbul ignore next */
			callback(err);
			/* istanbul ignore next */
		} else {

			if (reference && event.references.filter(block => block.id === reference.id).length === 0) {
				reference.objectReference = null;
				user.textBlocks = user.textBlocks.filter(object => object.id !== reference.id);
				user.textBlocks.push(reference);
				if (addReference) {
					addReference.objectReference = event.id;
					user.textBlocks = user.textBlocks.filter(object => object.id !== addReference.id);
					user.textBlocks.push(addReference);
				}
			}

			user.events = user.events.filter((element) => element.id !== event.id);

			if (event.references.length > 0) {	
				user.events.push(event);
			}
			
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
				tasks: user.tasks,
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
