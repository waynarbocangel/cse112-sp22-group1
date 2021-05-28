export function readUserPouch (db, callback) {
	db.get("0000", (err, user) => {
		if (err) {
			callback(err, null);
		} else {
			//console.log("user is ", user);
			callback(null, user);
		}
	});
}