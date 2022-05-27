import * as localStorage from "../userOperations.js";

/**
 * Finds and deletes the monthlyLog and all children associated
 * @memberof deleteFunctions
 * @param {Database} db 
 * @param {*} log 
 * @param {*} parent 
 * @param {*} callback 
 */
export function deleteMonthlyLogPouch (db, log, parent, callback) {
	localStorage.readUser((error, user) => {
		if (error === null) {
			
		}
	});
}