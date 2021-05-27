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
				Array.prototype.push.apply(arrays, doc.textBlocks);
				Array.prototype.push.apply(arrays, doc.tasks);
				Array.prototype.push.apply(arrays, doc.events);
				Array.prototype.push.apply(arrays, doc.signifiers);
				
				if(parent.objectType != "index") {
					let itemArrs = arrays.filter(element => element.id == parent.id);
					
					if(itemArrs.length > 0){
						itemObject = itemArrs[0];
						for(let i = 0; i < itemObject.content.length; i++) {
							Array.prototype.push.apply(objectArr, arrays.filter(element => element.id == itemObject.content[i].id));
						}
						populateEditor(controller, objectArr, itemObject, (res) => {
							console.log(res);
						})
					}
				} else {
					itemObject = doc.index;
					for(let i = 0; i < itemObject.contents.length; i++) {
						Array.prototype.push.apply(objectArr, arrays.filter(element => element.id == itemObject.contents[i].id));
					}
					populateEditor(controller, objectArr, itemObject, (res) => {
						console.log(res);
					})
				}
				//console.log("itemArrs length is :" + itemArrs.length);
			}
		})

		let newBlock = new TextBlock(controller, itemObject, (success) => {
			if (success){
				container.appendChild(newBlock);
				controller.blockArray.push(newBlock);
				controller.currentBlockIndex = controller.blockArray.length - 1;
				newBlock.focus();
			}
			callback(controller);
		});
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
	 		block.tabLevel = item[index].tabLevel
	 		block.setupTabLevel();
			
			if (item[index].kind == "note" || item[index].objectType == "eventBlock" || item[index].objectType == "taskBlock") {
				block.setupBullet();
			} else if (item[index].kind == "h1") {
				block.setupHeader1();
			} else if (item[index].kind == "h2") {
				block.setupHeader2();
			}
	 		block.item = item;
	 		block.shadowRoot.getElementById("textBlock").innerText = item.text;
	 	});

		//rec call
		populateEditorRecursive(controller, items, parent, index + 1, (res) => {
			callback(res);
		});
	} else {
		callback("done populating items");
	}
}