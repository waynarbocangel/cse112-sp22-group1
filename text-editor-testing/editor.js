import { TextBlock } from "./block.js";
let contentWrapper = document.getElementById("contentWrapper");
export var blockArray = [];
var idTable = [];
var controller = {
	creatingFromBullet: false,
	currentTabLevel: 0,
	resetPosition: true,
	currentBlockIndex: 0,
	addNewBlock: () => {
		let newBlock = new TextBlock(controller, (success) => {
			if (controller.currentBlockIndex < blockArray.length - 1){
				contentWrapper.insertBefore(newBlock, blockArray[controller.currentBlockIndex + 1]);
				blockArray.splice(controller.currentBlockIndex + 1, 0, newBlock);
				controller.currentBlockIndex = controller.currentBlockIndex + 1;
			} else {
				contentWrapper.appendChild(newBlock);
				blockArray.push(newBlock);
				controller.currentBlockIndex = blockArray.length - 1;
			}
			newBlock.focus();
		});
	},
	moveToNextBlock: () => {
		let currentBlock = blockArray[controller.currentBlockIndex];
		if (controller.currentBlockIndex < blockArray.length - 1){
			let nextBlock = blockArray[controller.currentBlockIndex + 1];
			nextBlock.moveToSpot(currentBlock.currentPointerSpot, false);
		}
	},
	moveToPreviousBlock: () => {
		let currentBlock = blockArray[controller.currentBlockIndex];
		if (controller.currentBlockIndex > 0){
			let nextBlock = blockArray[controller.currentBlockIndex - 1];
			nextBlock.moveToSpot(currentBlock.currentPointerSpot, true);
		}
	},
	removeBlock: () => {
		let currentBlock = blockArray[controller.currentBlockIndex];
		blockArray.splice(controller.currentBlockIndex, 1);
		controller.currentBlockIndex = (controller.currentBlockIndex == 0) ? controller.currentBlockIndex : controller.currentBlockIndex - 1;
		console.log(controller.currentBlockIndex);
		let nextBlock = blockArray[controller.currentBlockIndex];
		console.log(nextBlock);
		nextBlock.moveToSpot(100000, false);
		contentWrapper.removeChild(currentBlock);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	let newBlock = new TextBlock(controller, (success) => {
		contentWrapper.appendChild(newBlock);
		blockArray.push(newBlock);
		controller.currentBlockIndex = blockArray.length - 1;
		newBlock.focus();
	});
});
