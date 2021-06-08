/**
 * Finds and update the user in the local db from the online db.
 * @memberof updateFunctions
 * @param {database} db The local pouch database.
 * @param {singleParameterCallback} callback Sends an error if there is one to the callback.
 */
export function updateUserOnline (db, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			try {
				console.log(doc);
				fetch("http://localhost:3000/updateUser", {
					headers: {
						"content-type": "application/json; charset=UTF-8"
					},
					body: JSON.stringify(doc),
					method: "POST"
				}).then((data) => data.json()).then((userData) => {
					console.log(userData);
				});
			} catch (error) {
				console.log(error.text);
			}
		}
	})
}
