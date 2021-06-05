import {makeid} from "./makeId.js";
let collectionObject;

/**
 * Creates and stores a new collection created from the given parameters.
 *
 * @param {database} db The local pouch database.
 * @param {String} title The title to give to the collection.
 * @param {String} parent The id of the parent of the new collection.
 * @param {Array} content An array of textBlocks to add to the collection.
 * @callback (err,collection) Eihter sends the newly created collection or an error if there is one to the callback.
 */
export function createCollectionPouch (db, title, parent, content, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err, null);
		} else {
			console.log(doc);
			let id = makeid();
			let arrays = [];
			Array.prototype.push.apply(arrays, doc.dailyLogs);
			Array.prototype.push.apply(arrays, doc.monthlyLogs);
			Array.prototype.push.apply(arrays, doc.futureLogs);
			Array.prototype.push.apply(arrays, doc.collections);
			Array.prototype.push.apply(arrays, doc.trackers);
			Array.prototype.push.apply(arrays, doc.textBlocks);
			Array.prototype.push.apply(arrays, doc.tasks);
			Array.prototype.push.apply(arrays, doc.events);
			Array.prototype.push.apply(arrays, doc.signifiers);
			Array.prototype.push.apply(arrays, doc.imageBlocks);
			Array.prototype.push.apply(arrays, doc.audioBlocks);
			
			while(arrays.filter(element => element.id == id).length > 0){
				id = makeid();
			}
			collectionObject = {
				id: id,
				objectType: "collection",
				title: title,
				parent: parent,
				content: content,
			};

			doc.collections.push(collectionObject);
			doc.index.contents.push(collectionObject.id);

			return db.put(
				{
					_id: "0000",
					_rev: doc._rev,
					email: doc.email,
					pwd: doc.pwd,
					theme: doc.theme,
					index: doc.index,
					dailyLogs: doc.dailyLogs,
					monthlyLogs: doc.monthlyLogs,
					futureLogs: doc.futureLogs,
					collections: doc.collections,
					trackers: doc.trackers,
					imageBlocks: doc.imageBlocks,
					audioBlocks: doc.audioBlocks,
					textBlocks: doc.textBlocks,
					tasks: doc.tasks,
					events: doc.events,
					signifiers: doc.signifiers
				}
			).then((res) => {
			}).catch((err) => {
				console.log(err);
				callback(err, null);
			});
		}
	}).then((res) => {
		console.log(res);
		callback(null, collectionObject);
	});
}