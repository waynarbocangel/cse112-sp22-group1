import { TextBlock } from "./block.js";

export class Controller extends Object {
	constructor(container){
		super();
		this.blockArray = [];
		this.creatingFromBullet = false;
		this.currentTabLevel = 0;
		this.resetPosition = true;
		this.currentBlockIndex = 0;
		this.container = container;
		//this.
	}

	createNewBlock(callback){
		let newBlock = new TextBlock(this, (success) => {
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
	
	addNewBlock () {
		let newBlock = new TextBlock(this, (success) => {
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

export function createEditor (container, callback) {

	let controller = new Controller(container);
	setTimeout(() => {
		let newBlock = new TextBlock(controller, (success) => {
			if (success){
				container.appendChild(newBlock);
				controller.blockArray.push(newBlock);
				controller.currentBlockIndex = controller.blockArray.length - 1;
				newBlock.focus();
				newBlock.style.width = "100%";
			}
			callback(controller);
		});
	}, 20);
}

export function populateEditor (controller, items, index, callback) {
	populateEditorRecursive(controller, items, 0, (res) => {
		console.log(res);
	});
}

function populateEditorRecursive(controller, items, index, callback) {
	if(index < items.length) {
		controller.createNewBlock((block) => {
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
		populateEditorRecursive(controller, items, index + 1, (res) => {
			callback(res);
		});
	} else {
		callback("done populating items");
	}
}