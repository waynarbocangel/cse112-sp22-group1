import { TextBlock } from "./block.js";
import * as localStorage from "../localStorage/userOperations.js";

export class Controller extends Object {
	constructor(container, parent){
		super();
		this.blockArray = [];
		this.creatingFromBullet = {isTrue: false, kind: ""};
		this.currentTabLevel = 0;
		this.resetPosition = true;
		this.currentBlockIndex = 0;
		this.container = container;
		this.parent = parent;
	}

	createNewBlock(parent, callback){
		let newBlock = new TextBlock(this, parent, (success) => {
			if (this.currentBlockIndex < this.blockArray.length - 1){
				this.container.insertBefore(newBlock, this.blockArray[this.currentBlockIndex + 1]);
				this.blockArray.splice(this.currentBlockIndex + 1, 0, newBlock);
				this.currentBlockIndex = this.currentBlockIndex + 1;
			} else {
				this.container.appendChild(newBlock);
				this.blockArray.push(newBlock);
				this.currentBlockIndex = this.blockArray.length - 1;
			}
			newBlock.focus();
			callback(newBlock);
		});
	}
	
	addNewBlock (parent) {
		let newBlock = new TextBlock(this, parent, (success) => {
			if (this.currentBlockIndex < this.blockArray.length - 1){
				this.container.insertBefore(newBlock, this.blockArray[this.currentBlockIndex + 1]);
				this.blockArray.splice(this.currentBlockIndex + 1, 0, newBlock);
				this.currentBlockIndex = this.currentBlockIndex + 1;
			} else {
				this.container.appendChild(newBlock);
				this.blockArray.push(newBlock);
				this.currentBlockIndex = this.blockArray.length - 1;
			}
			newBlock.focus();
		});
	}

	moveToNextBlock () {
		let currentBlock = this.blockArray[this.currentBlockIndex];
		if (this.currentBlockIndex < this.blockArray.length - 1){
			let nextBlock = this.blockArray[this.currentBlockIndex + 1];
			nextBlock.moveToSpot(currentBlock.currentPointerSpot, false);
		}
	}

	moveToPreviousBlock () {
		let currentBlock = this.blockArray[this.currentBlockIndex];
		if (this.currentBlockIndex > 0){
			let nextBlock = this.blockArray[this.currentBlockIndex - 1];
			nextBlock.moveToSpot(currentBlock.currentPointerSpot, true);
		}
	}

	removeBlock () {
		let currentBlock = this.blockArray[this.currentBlockIndex];
		this.blockArray.splice(this.currentBlockIndex, 1);
		this.currentBlockIndex = (this.currentBlockIndex == 0) ? this.currentBlockIndex : this.currentBlockIndex - 1;
		console.log(this.currentBlockIndex);
		let nextBlock = this.blockArray[this.currentBlockIndex];
		console.log(nextBlock);
		nextBlock.moveToSpot(100000, false);
		this.container.removeChild(currentBlock);
	}
}

export function createEditor (container, parent, callback) {

	let controller = new Controller(container, parent);
	setTimeout(() => {
		let itemObject = null;
		let objectArr = [];
		localStorage.readUser((err, doc) => {
			if (err) {
				callback(err);
			} else {
				let arrays = [];
				Array.prototype.push.apply(arrays, doc.dailyLogs);
				Array.prototype.push.apply(arrays, doc.monthlyLogs);
				Array.prototype.push.apply(arrays, doc.futureLogs);
				Array.prototype.push.apply(arrays, doc.collections);
				Array.prototype.push.apply(arrays, doc.trackers);

				if(parent.objectType != "index") {
					let itemArrs = arrays.filter(element => element.id == parent.id);
						
					if(itemArrs.length > 0){
						itemObject = itemArrs[0];
						console.log("itemObject is ", itemObject);
						console.log("itemObject contnetn length is " + itemObject.content.length);
						
						let tempArr = [];
						Array.prototype.push.apply(tempArr, doc.dailyLogs);
						Array.prototype.push.apply(tempArr, doc.monthlyLogs);
						Array.prototype.push.apply(tempArr, doc.futureLogs);
						Array.prototype.push.apply(tempArr, doc.textBlocks);
						for(let i = 0; i < itemObject.content.length; i++) {
							Array.prototype.push.apply(objectArr, tempArr.filter(element => element.id == itemObject.content[i]));
						}

						populateEditor(controller, objectArr, itemObject, (res) => {
							console.log(res);
							let newBlock = new TextBlock(controller, itemObject, (success) => {
								if (success){
									container.appendChild(newBlock);
									controller.blockArray.push(newBlock);
									controller.currentBlockIndex = controller.blockArray.length - 1;
									newBlock.focus();
								}
								callback(controller);
							});
						})
					}
				} else {
					let newBlock = new TextBlock(controller, itemObject, (success) => {
						if (success){
							container.appendChild(newBlock);
							controller.blockArray.push(newBlock);
							controller.currentBlockIndex = controller.blockArray.length - 1;
							newBlock.focus();
							console.log("newblock created successfully");
						} else {
							console.log("newBlock not being created");
						}
						callback(controller);
					});
				}
			}
		})
	}, 20);
}

export function populateEditor (controller, items, parent, callback) {
	populateEditorRecursive(controller, items, parent, 0, (res) => {
		callback(res);
	});
}

function populateEditorRecursive(controller, items, parent, index, callback) {
	console.log("in recursive populate editor");
	console.log(items.length);
	if(index < items.length) {
		controller.createNewBlock(parent, (block) => {
	 		block.tabLevel = items[index].tabLevel
	 		block.setupTabLevel();
			
			if (items[index].kind == "note" || items[index].objectType == "eventBlock" || items[index].objectType == "taskBlock") {
				block.setupBullet();
			} else if (items[index].kind == "h1") {
				block.setupHeader1();
			} else if (items[index].kind == "h2") {
				block.setupHeader2();
			}
			//block.item = item;
	 		block.item = items[index];
	 		block.shadowRoot.getElementById("textBlock").innerText = items[index].text;//= item.text;
	 	});

		//rec call
		populateEditorRecursive(controller, items, parent, index + 1, (res) => {
			callback(res);
		});
	} else {
		callback("done populating items");
	}
}