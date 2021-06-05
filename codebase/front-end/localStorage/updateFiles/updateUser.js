/**
 * Finds and update the user in the local db from the online db.
 *
 * @param {database} db The local pouch database.
 * @callback (res) Sends an error if there is one to the callback.
 */
export function updateUserOnline(db, callback){
	console.trace();
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			try{
				console.log(doc);
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