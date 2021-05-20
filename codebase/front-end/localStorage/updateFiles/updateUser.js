export function  updateUserPouch(db, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			console.log(doc);
			updateUser(doc, (res) => {
				callback(res);
			});
		}
	});
}