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

export function updateUserFromMongo(db, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			schema.User.findOne({email: doc.userObject.email}, (error, user) => {
				if (error) {
					callback(error);
				} else {
					let newCollections = [];
					for(let i = 0; i < user.collections.lenght; i++){
						let collection = user.collection[i];
						collection.title = security.decrypt(collection.title, userData.pwd);
						newCollections.push(collection);
					}
					let newTextBlocks = [];
					for(let i = 0; i < user.textBlocks.lenght; i++){
						let block = user.textBlocks[i];
						block.text = security.decrypt(block.text, userData.pwd);
						newTextBlocks.push(block);
					}
					let newTaskBlocks = [];
					for(let i = 0; i < user.taskBlocks.lenght; i++){
						let block = user.taskBlocks[i];
						block.text = security.decrypt(block.text, userData.pwd);
						newTextBlocks.push(block);
					}
					let newEventBlocks = [];
					for(let i = 0; i < user.eventBlocks.lenght; i++){
						let block = user.eventBlocks[i];
						block.text = security.decrypt(block.text, userData.pwd);
						newTextBlocks.push(block);
					}
					let newSignifiers = [];
					for(let i = 0; i < user.signifiers.lenght; i++){
						let signifier = user.signifiers[i];
						signifier.text = security.decrypt(signifier.meaning, userData.pwd);
						newTextBlocks.push(signifier);
					}

					db.put({_id: "0000", _rev: user._rev,
						email: user.email,
						pwd: userData.pwd,
						index: user.index,
						dailyLogs: user.dailyLogs,
						monthlyLogs: user.monthlyLogs,
						futureLogs: user.futureLogs,
						trackers: user.trackers,
						collections: newCollections,
						textBlocks: newTextBlocks,
						eventBlocks: newEventBlocks,
						taskBlocks: newTaskBlocks,
						signifiers: newSignifiers}, (err, res) => {
						if (err) {
							callback(err);
						} else {
							callback(res);
						}
					});
				}
			});
		}
	})
}
