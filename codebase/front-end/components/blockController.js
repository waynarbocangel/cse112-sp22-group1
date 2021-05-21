import { TextBlock } from "./block.js";
import {blockArray} from "../index.js";

export let Controller = class extends Object {
	constructor(){
		super();
		this.creatingFromBullet = false;
		this.currentTabLevel = 0;
		this.resetPosition = true;
		this.currentBlockIndex = 0;
	}
	
	addNewBlock () {
		let newBlock = new TextBlock(this, (success) => {
			if (this.currentBlockIndex < blockArray.length - 1){
				contentWrapper.insertBefore(newBlock, blockArray[this.currentBlockIndex + 1]);
				blockArray.splice(this.currentBlockIndex + 1, 0, newBlock);
				this.currentBlockIndex = this.currentBlockIndex + 1;
			} else {
				contentWrapper.appendChild(newBlock);
				blockArray.push(newBlock);
				this.currentBlockIndex = blockArray.length - 1;
			}
			newBlock.focus();
		});
	}

	moveToNextBlock () {
		let currentBlock = blockArray[this.currentBlockIndex];
		if (this.currentBlockIndex < blockArray.length - 1){
			let nextBlock = blockArray[this.currentBlockIndex + 1];
			nextBlock.moveToSpot(currentBlock.currentPointerSpot, false);
		}
	}

	moveToPreviousBlock () {
		let currentBlock = blockArray[this.currentBlockIndex];
		if (this.currentBlockIndex > 0){
			let nextBlock = blockArray[this.currentBlockIndex - 1];
			nextBlock.moveToSpot(currentBlock.currentPointerSpot, true);
		}
	}

	removeBlock () {
		let currentBlock = blockArray[this.currentBlockIndex];
		blockArray.splice(this.currentBlockIndex, 1);
		this.currentBlockIndex = (this.currentBlockIndex == 0) ? this.currentBlockIndex : this.currentBlockIndex - 1;
		console.log(this.currentBlockIndex);
		let nextBlock = blockArray[this.currentBlockIndex];
		console.log(nextBlock);
		nextBlock.moveToSpot(100000, false);
		contentWrapper.removeChild(currentBlock);
	}
}