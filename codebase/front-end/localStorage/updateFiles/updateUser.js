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