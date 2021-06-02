export function readUserPouch (db, callback) {
	db.get("0000", (err, user) => {
		if (err) {
			callback(err, null);
		} else {
<<<<<<< HEAD
=======
			//console.log("user is ", user);
>>>>>>> front-end_drop
			callback(null, user);
		}
	});
}