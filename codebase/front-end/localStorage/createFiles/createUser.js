
/**
 * Creates and stores a new user created from the given parameters.
 *
 * @param {database} db The local pouch database.
 * @param {Object} userObject The user as an object.
 * @callback (response) Eihter sends the newly created user or an error if there is one to the callback.
 */
export function createUserPouch (db, userObject, callback) {
	db.put(
		{
			_id: "0000",
			email: userObject.email,
			pwd: userObject.pwd,
			theme: userObject.theme,
			index: userObject.index,
			dailyLogs: userObject.dailyLogs,
			monthlyLogs: userObject.monthlyLogs,
			futureLogs: userObject.futureLogs,
			collections: userObject.collections,
			trackers: userObject.trackers,
			imageBlocks: userObject.imageBlocks,
			audioBlocks: userObject.audioBlocks,
			textBlocks: userObject.textBlocks,
			tasks: userObject.tasks,
			events: userObject.events,
			signifiers: userObject.signifiers
		}
	).then((res) => {
		callback(res);
	}).catch((err) => {
		callback(err);
	});	
}
/*export function createUserPouch (db, userObject, callback) {
	console.log(userObject);
	db.put({_id: "0000", _rev: userObject._rev,
		email: userObject.email,
		pwd: userObject.pwd,
		index: userObject.index,
		dailyLogs: userObject.dailyLogs,
		monthlyLogs: userObject.monthlyLogs,
		futureLogs: userObject.futureLogs,
		collections: userObject.collections,
		trackers: userObject.trackers,
		textBlocks: userObject.textBlocks,
		taskBlocks: userObject.taskBlocks,
		eventBlocks: userObject.eventBlocks,
		signifiers: userObject.signifiers}, (err, res) => {
			if (err) {
				callback(err);//err when i use callback
			} else {
				callback(res);//err when i use callback
			}
		});
}*/
