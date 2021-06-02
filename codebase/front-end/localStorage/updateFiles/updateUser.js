
/**
 * Updates the user in the local db.
 *
 * @param {database} db The local pouch database.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function  updateUserPouch(db, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			console.log(doc);
			updateUser(doc.userObject, (res) => {
				callback(res);
			});
		}
	});
}

/**
 * Finds and update the user in the local db from the online db.
 *
 * @param {database} db The local pouch database.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function updateUserOnline(db, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			try{
				fetch(`http://localhost:3000/updateUser`, {
					headers:{
						"content-type": "application/json; charset=UTF-8"
					},
					body: JSON.stringify(doc),
					method: "POST"
				}).then((data) => {
					return data.json();
				}).then((userData) => {
					console.log(userData);
				});
			} catch (error){
				console.log(error.text);
			}
		}
	})
}