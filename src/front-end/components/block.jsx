import * as localStorage from "../localStorage/userOperations.js";
import * as shadow from "./shadow.js";
import {currentObject} from "../index.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

const tabSize = 20;
const paddingSize = 10;
const protectedKeys = ["Control", "Alt", "CapsLock", "Escape", "PageUp", "PageDown", "End", "Home", "PrintScreen", "Insert", "Delete", "Backspace", "Tab", "Enter", "Meta", "ArrowTop", "ArrowBottom", "ArrowRight", "ArrowLeft", "Shift", " "]

/**
 * Handles instances when event year is a leap year
 *
 * @param {Number} year year in event creation text
 * @returns true if year is leapyear false otherwise
 */
 function isLeapyear (year) {
	return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

/**
 * Calculates the number of days depending on month and year
 *
 * @param {Number} month
 * @param {Number} year
 * @returns the number of days for month and year
 */
function days (month, year) {
	if (month === "3" || month === "5" || month === "8" || month === "10") {
		return 30;
	} else if (month === "1" && isLeapyear(year)) {
		return 29;
	} else if (month === "1") {
		return 28;
	}
	return 31;
}

/**
 * Returns the next day of the week depending onthe day passed in
 *
 * @param {String} dayName a weekday
 * @param {Boolean} excludeToday boolean to check if current day should be included or not
 * @param {Date} refDate current date
 * @returns the next day of the week
 */
function getNextDayOfTheWeek (dayName, excludeToday = true, refDate = new Date()) {
    const dayOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].
                      indexOf(dayName.toLowerCase());
    if (dayOfWeek < 0) {
 return;
}
    refDate.setHours(0, 0, 0, 0);
    refDate.setDate((refDate.getDate() + Number(Boolean(excludeToday)) + (dayOfWeek + 7 - refDate.getDay() - Number(Boolean(excludeToday)))) % 7);
    return refDate;
}

/**
 * Handles time and parsing from event text for event creation
 *
 * @param {Object} block the textblock instanse to set the time and date for
 * @param {String} text the text to parse the time and date from
 * @param {Boolean} first boolean to check if the text had a time or not
 */
 function includesClock (block, text, first) {
	for (let i = 0; i < text.length; i++) {
		if (text.charCodeAt(i) === 56517) {
			if (first) {
				block.dateSetter = true;
			} else {
				block.hashPressed = true;
				block.atPressed = false;
			}
		}

		if (text.charCodeAt(i) === 56688) {
			if (first) {
				block.timeSetter = true;
			} else {
				block.atPressed = true;
				block.hashPressed = false;
			}
		}
	}
}

/**
 * Gets the date from the textblock text
 *
 * @param {Object} textBlock block to set the time for
 * @param {Boolean} deleteString check to see if the date string shuld be removed from the text
 * @returns date parsed from textBlock text
 */
function getDate (textBlock, deleteString) {
	let date = null;
	let text = textBlock.shadowRoot.querySelector("#textBlock");
	if (textBlock.dateSetter && deleteString) {
		let start = 1;
		for (let i = 0; i < text.textContent.length; i++) {
			if (text.textContent.charCodeAt(i) === 56517) {
				start = i + 1;
				break;
			}
		}
		let end = text.textContent.length;
		if (textBlock.dateSetter) {
			let timeIndex = 0;
			for (let i = 0; i < text.textContent.length; i++) {
				if (text.textContent.charCodeAt(i) === 56688) {
					timeIndex = i;
					break;
				}
			}
			if (timeIndex >= end) {
				end = timeIndex;
			}
		}
		let newString = text.textContent.substring(start, end);
		newString = newString.replaceAll(" ", "");
		let valid = false;
		let dayArray = ["today", "tomorrow", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
		if (dayArray.includes(newString.toLowerCase())) {
			valid = true;
		} else {
			valid = true;
			if (newString.length > 10 || newString.length < 10) {
				valid = false;
			} else if (newString.charAt(0).match(/[^01]/g)) {
				valid = false;
			} else if (newString.charAt(0) === "1" && newString.charAt(1).match(/[^01]/g)) {
				valid = false;
			} else if (newString.charAt(1).match(/[^0123456789]/g)) {
				valid = false;
			} else if (newString.charAt(2) !== "/" || newString.charAt(5) !== "/") {
				valid = false;
			} else if (newString.charAt(6).match(/[^0123456789]/g) || newString.charAt(7).match(/[^0123456789]/g) || newString.charAt(8).match(/[^0123456789]/g) || newString.charAt(9).match(/[^0123456789]/g)) {
				valid = false;
			} else if (newString.charAt(0) === "0" && newString.charAt(1) === "2" && newString.charAt(3).match(/[^012]/g)) {
				valid = false;
			} else if (newString.charAt(3).match(/[^0123]/g)) {
				valid = false;
			} else if (newString.charAt(4).match(/[^0123456789]/g)) {
				valid = false;
			} else if (days((newString.substring(0, 2), newString.substring(6)) === "28" || days(newString.substring(0, 2), newString.substring(6)) === "29") && newString.charAt(3).match(/[^012]/g)) {
				valid = false;
			} else if (days(newString.substring(0, 2), newString.substring(6)) === "31" && newString.charAt(3) === "3" && newString.charAt(4).match(/[^01]/g)) {
				valid = false;
			} else if (days(newString.substring(0, 2), newString.substring(6)) === "30" && newString.charAt(3) === "3" && newString.charAt(4).match(/[^0]/g)) {
				valid = false;
			} else if (days(newString.substring(0, 2), newString.substring(6)) === "28" && newString.charAt(3) === "2" && newString.charAt(4).match(/[^012345678]/g)) {
				valid = false;
			}
		}
		if (!valid && deleteString) {
			newString = `${text.textContent.substring(0, start - 2)}${text.textContent.substring(end + 1)}`;
			console.log("\n\n\n\n\n\n\n\n\n");
			text.innerHTML = newString;
			textBlock.timeSetter = false;
			textBlock.atPressed = false;
		} else if (dayArray.includes(newString.toLowerCase())) {
				if (newString.toLowerCase() === "today") {
					date = new Date();
				} else if (newString.toLowerCase() === "tomorrow") {
					date = new Date();
					date.setDate(date.getDate() + 1);
				} else {
					date = getNextDayOfTheWeek(newString);
				}
			} else {
				date = new Date(newString);
			}
	}

	if (textBlock.timeSetter && deleteString) {
		let start = 1;
		for (let i = 0; i < text.textContent.length; i++) {
			if (text.textContent.charCodeAt(i) === 56688) {
				start = i + 1;
				break;
			}
		}
		let end = text.textContent.length;
		if (textBlock.dateSetter) {
			let dateIndex = 0;
			for (let i = 0; i < text.textContent.length; i++) {
				if (text.textContent.charCodeAt(i) === 56517) {
					dateIndex = i;
					break;
				}
			}
			if (dateIndex >= end) {
				end = dateIndex;
			}
		}
		let newString = text.textContent.substring(start, end);
		newString = newString.replaceAll(" ", "");
		console.log(newString);
		let valid = true;
		if (newString.length !== 5) {
			valid = false;
		} else if (newString.charAt(0).match(/[^012]/g)) {
				valid = false;
			} else if (newString.charAt(0) === "2" && newString.charAt(1).match(/[^0123]/g)) {
				valid = false;
			} else if (newString.charAt(1).match(/[^0123456789]/g)) {
				valid = false;
			} else if (newString.charAt(2) !== ":") {
				valid = false;
			} else if (newString.charAt(3).match(/[^012345]/g)) {
				valid = false;
			} else if (newString.charAt(4).match(/[^0123456789]/g)) {
				valid = false;
			}
		if (!valid && deleteString) {
			newString = `${text.textContent.substring(0, start - 2)}${text.textContent.substring(end + 1)}`;
			text.innerHTML = newString;
			textBlock.timeSetter = false;
			textBlock.atPressed = false;
		} else {
			if (date === null) {
				date = new Date();
			}
			date.setHours(newString.substring(0, 2), newString.substring(3));
		}
	}
	return date;
}

let blockTemplate = <template>
	<link type="text/css" rel="stylesheet" href="./block.css" />
	<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons"/><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons"/><div id="signifier"></div></div>
	<div id="checkerContainer" checked=""><div id="taskChecker"></div></div>
	<div id="textBlock" contenteditable="true" ondrop={()=>false} placeholder='Type "/" to create a block'></div>
</template>;

export class TextBlock extends HTMLElement {
	constructor (controller, itemObject, signifier, callback) {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(blockTemplate.content.cloneNode(true));
		this.shadowRoot.adoptedStyleSheets = []
		this.root = this.shadowRoot;
		this.characterIndex = 0;
		this.kind = "paragraph";
		this.initialHeight = 3;
		this.item = itemObject;
		this.controller = controller;
		this.shadowRoot.getElementById("textBlock").classList.add("unstylized");
		this.currentBlock = null;
		this.checkBox = this.shadowRoot.getElementById("checkerContainer");
		this.checkBox.style.display = "none";
		this.currentPointerSpot = 0;
		this.editorIcons = this.shadowRoot.getElementById("editorIcons");
		this.currentPointerHeight = 2;
		if (this.controller.creatingFromBullet.isTrue) {
			if (this.controller.creatingFromBullet.kind === "note") {
				this.setupNote();
			} else if (this.controller.creatingFromBullet.kind === "event") {
				this.setupEvent();
			} else {
				this.setupTask();
			}
		}
		this.tabLevel = controller.currentTabLevel;
		this.atPressed = false;
		this.hashPressed = false;
		this.timeSetter = false;
		this.dateSetter = false;
		this.eventDelete = true;
		this.signifier = signifier
		this.signifierIcon = this.shadowRoot.getElementById("signifier");
		this.signifierIcon.innerHTML = this.signifier.symbol;
		this.setupTabLevel();
		setTimeout(() => {
			callback(true);
		}, 30);
	}

	/**
	 * Keeps track of current location of textBlock
	 */
	setCurrentSpot () {
		let container = this.shadowRoot.getElementById("textBlock");
		let range = shadow.getRange(this.shadowRoot);
		if (range === null) {
			let computedTab = this.tabLevel * tabSize;
			this.currentPointerSpot = computedTab + paddingSize;
			this.currentPointerHeight = this.initialHeight;
		} else {
			let computedTab = this.tabLevel * tabSize;
			let preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(container);
			preCaretRange.setEnd(range.endContainer, range.endOffset);
			this.atPressed = false;
			this.hashPressed = false;
			includesClock(this, container.innerText.slice(0, range.endOffset), false);
			this.characterIndex = range.endOffset;
			this.currentPointerSpot = range.getClientRects()[0] === undefined ? computedTab + paddingSize : range.getClientRects()[0].x;
			this.currentPointerHeight = range.getClientRects()[0] === undefined ? this.initialHeight : range.getClientRects()[0].y - container.getBoundingClientRect().top;
		}

	}

	/**
	 * Moves the textBlock to the location it was last dragged to(?)
	 *
	 * @param {*} newSpotToMove
	 * @param {*} up
	 */
	moveToSpot (newSpotToMove, up) {
		let newSpot = newSpotToMove
		let container = this.shadowRoot.getElementById("textBlock");
		if (container.childNodes.length > 0) {
			if (!this.controller.resetPosition) {
				newSpot = this.currentPointerSpot;
			}
			container.focus();
			let range = shadow.getRange(this.shadowRoot);
			container.blur();
			console.log(newSpot);
			console.log(newSpot);
			setTimeout(() => {
				let offset = 0;
				if (up) {
					offset = container.textContent.length;
				}
				range.setStart(container.childNodes[0], offset);
				let currentCoordinate = range.getClientRects()[0].x;
				let currentOffset = offset;
				let counter = 0;
				newSpot = Math.floor(newSpot);
				while (counter < 1000) {
					if (up) {
						offset = offset > 0 ? offset - 1 : offset;
					} else {
						offset = offset < container.textContent.length ? offset + 1 : offset;
					}
					range.setStart(container.childNodes[0], offset);
					range.collapse(true);
					let nextCoordinate = range.getClientRects()[0].x;
					if (Math.abs(Math.floor(currentCoordinate) - newSpot) <= Math.abs(Math.floor(nextCoordinate) - newSpot)) {
						range.setStart(container.childNodes[0], currentOffset);
						break;
					}
					currentCoordinate = nextCoordinate;
					currentOffset = offset;
					counter += 1;
				}
				range.collapse(true);
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(range);
				container.focus();
			}, 0.01);
		} else {
			container.focus();
		}

	}

	/**
	 * Sets up textBlock styling for header 1 text
	 */
	setupHeader1 () {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		while (this.editorIcons.classList.length > 0) {
			this.editorIcons.classList.remove(this.editorIcons.classList[0]);
		}
		while (textBlock.classList.length > 0) {
			textBlock.classList.remove(textBlock.classList[0]);
		}
		while (this.classList.length > 0) {
			this.classList.remove(this.classList[0]);
		}
		this.controller.creatingFromBullet = { isTrue: false, kind: "" };
		this.kind = "h1";
		this.initialHeight = 0;
		textBlock.setAttribute("placeholder", "Header 1");
		textBlock.classList.add("header1");
		this.editorIcons.classList.add("header1Icons");
		textBlock.innerHTML = "";
		this.checkBox.style.display = "none";
	}

	/**
	 * Sets up textBlock styling for header 2 text
	 */
	setupHeader2 () {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		while (this.editorIcons.classList.length > 0) {
			this.editorIcons.classList.remove(this.editorIcons.classList[0]);
		}
		while (textBlock.classList.length > 0) {
			textBlock.classList.remove(textBlock.classList[0]);
		}
		while (this.classList.length > 0) {
			this.classList.remove(this.classList[0]);
		}
		this.controller.creatingFromBullet = { isTrue: false, kind: "" };
		this.kind = "h2";
		this.initialHeight = 0;
		textBlock.setAttribute("placeholder", "Header 2");
		textBlock.classList.add("header2");
		this.editorIcons.classList.add("header2Icons");
		textBlock.innerHTML = "";
		this.checkBox.style.display = "none";
	}

	/**
	 * Sets up textBlock syling for header 3 text
	 */
	setupHeader3 () {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		while (this.editorIcons.classList.length > 0) {
			this.editorIcons.classList.remove(this.editorIcons.classList[0]);
		}
		while (textBlock.classList.length > 0) {
			textBlock.classList.remove(textBlock.classList[0]);
		}
		while (this.classList.length > 0) {
			this.classList.remove(this.classList[0]);
		}
		this.controller.creatingFromBullet = { isTrue: false, kind: "" };
		this.kind = "h3";
		this.initialHeight = 0;
		textBlock.setAttribute("placeholder", "Header 3");
		textBlock.classList.add("header3");
		this.editorIcons.classList.add("header3Icons");
		textBlock.innerHTML = "";
		this.checkBox.style.display = "none";
	}

	/**
	 * Sets up textBlock styling for note text and adds bullet
	 */
	setupNote () {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		while (this.editorIcons.classList.length > 0) {
			this.editorIcons.classList.remove(this.editorIcons.classList[0]);
		}
		while (textBlock.classList.length > 0) {
			textBlock.classList.remove(textBlock.classList[0]);
		}
		while (this.classList.length > 0) {
			this.classList.remove(this.classList[0]);
		}
		this.kind = "note";
		this.controller.creatingFromBullet = { isTrue: true, kind: this.kind };
		this.initialHeight = 3;
		textBlock.setAttribute("placeholder", "Note");
		this.classList.add("noteContainer");
		this.editorIcons.classList.add("noteIcons");
		textBlock.classList.add("note");
		textBlock.innerHTML = "";
		this.checkBox.style.display = "none";
	}

	/**
	 * Sets up textBlock styling for event text and handles event date and time parsing
	 */
	setupEvent () {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		while (this.editorIcons.classList.length > 0) {
			this.editorIcons.classList.remove(this.editorIcons.classList[0]);
		}
		while (textBlock.classList.length > 0) {
			textBlock.classList.remove(textBlock.classList[0]);
		}
		while (this.classList.length > 0) {
			this.classList.remove(this.classList[0]);
		}
		this.kind = "event";
		this.controller.creatingFromBullet = { isTrue: true, kind: this.kind };
		this.initialHeight = 3;
		textBlock.setAttribute("placeholder", "Event:");
		let dateFiller = "";
		if (!this.timeSetter) {
			dateFiller = `${dateFiller} use @ for time HH:MM`;
			if (!this.dateSetter) {
				dateFiller = `${dateFiller} and # for weekdays or dates MM/DD/YY`;
			}
		} else if (!this.dateSetter) {
			dateFiller = `${dateFiller} use # for weekdays or dates MM/DD/YY`;
		}
		textBlock.setAttribute("dateFiller", dateFiller);
		this.classList.add("eventContainer");
		this.editorIcons.classList.add("noteIcons");
		textBlock.classList.add("note");
		textBlock.classList.add("eventNodateFocused");
		textBlock.innerHTML = "";
		this.checkBox.style.display = "none";
	}

	/**
	 * Sets up textBlock styling for task text and adds task check off block
	 */
	setupTask () {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		while (this.editorIcons.classList.length > 0) {
			this.editorIcons.classList.remove(this.editorIcons.classList[0]);
		}
		while (textBlock.classList.length > 0) {
			textBlock.classList.remove(textBlock.classList[0]);
		}
		while (this.classList.length > 0) {
			this.classList.remove(this.classList[0]);
		}
		this.kind = "task";
		this.controller.creatingFromBullet = { isTrue: true, kind: this.kind };
		this.initialHeight = 3;
		textBlock.classList.add("task");
		textBlock.setAttribute("placeholder", "Task");
		textBlock.innerHTML = "";
		this.editorIcons.classList.add("paragraphIcons");
		this.checkBox.style.display = "inline";
	}

	/**
	 * Removes any styling from a textBlock in case one type of textblock
	 * is converted to a different one
	 */
	removeStyles () {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		while (this.editorIcons.classList.length > 0) {
			this.editorIcons.classList.remove(this.editorIcons.classList[0]);
		}
		while (textBlock.classList.length > 0) {
			textBlock.classList.remove(textBlock.classList[0]);
		}
		while (this.classList.length > 0) {
			this.classList.remove(this.classList[0]);
		}
		this.kind = "paragraph";
		this.initialHeight = 3;
		textBlock.classList.add("unstylized");
		textBlock.setAttribute("placeholder", "Type \"/\" to create a block");
		textBlock.innerHTML = "";
		this.editorIcons.classList.add("paragraphIcons");
		this.controller.creatingFromBullet = { isTrue: false, kind: "" };
		this.checkBox.style.display = "none";
	}

	/**
	 * Sets the textBlocks indenting using the tab level as a multiple
	 */
	setupTabLevel () {
		this.style.position = "relative";
		let computedTab = this.tabLevel * tabSize;
		this.style.left = computedTab + "px";
		this.controller.currentTabLevel = this.tabLevel;
		this.setCurrentSpot();
	}

	setupSignifier (signifier) {
		this.signifier = signifier;
		this.signifierIcon.innerHTML = signifier.symbol;
	}

	/**
	 * When a textBlock is created, the editor is added to the page and if the block is a task
	 * then the text is crossed off
	 */
	connectedCallback () {

		let textBlock = this.shadowRoot.getElementById("textBlock");
		textBlock.focus();

		document.addEventListener(shadow.eventName, () => {
			this.controller.blockArray[this.controller.currentBlockIndex].setCurrentSpot();
		});

		this.checkBox.onclick = (e) => {
			if (this.checkBox.getAttribute("checked") === "checked") {
				this.checkBox.setAttribute("checked", "");
				textBlock.classList.remove("crossed");
				setTimeout(() => {
					localStorage.readUser((err, user) => {
						if (err === null) {
							let task = user.tasks.filter((currentTask) => currentTask.id === this.item.objectReference)[0];
							task.complete = 0;
							localStorage.updateTask(task, true, (error, taskBlock) => {
								console.log(error);
								console.log(taskBlock);
							})
						}
					});
				}, 10);
			} else {
				this.checkBox.setAttribute("checked", "checked");
				textBlock.classList.add("crossed");
				setTimeout(() => {
					localStorage.readUser((err, user) => {
						if (err === null) {
							let task = user.tasks.filter((currentTask) => currentTask.id === this.item.objectReference)[0];
							console.log(task)
							task.complete = 1;
							localStorage.updateTask(task, true, (error, taskBlock) => {
								console.log(error);
								console.log(taskBlock);
							})
						} else {
							console.log(err);
						}
					});
				}, 10);
			}
			e.preventDefault();
		}

		/**
		 * Gets the user's clipboard data, filters for valid editor text, and pastes it to the textBlock.
		 *
		 * @param {User} e
		 */
		textBlock.onpaste = (e) => {
			// Get user's pasted data
			let data = e.clipboardData.getData("text/html") ||
				e.clipboardData.getData("text/plain");

			// Filter out everything except simple text and allowable HTML elements
			let regex = /<(?!(\/\s*)?(a|b|i|em|s|strong|u)[>,\s])([^>])*>/g;
			data = data.replace(regex, "");

			// Insert the filtered content
			document.execCommand("insertText", false, data);

			// Prevent the standard paste behavior
			e.preventDefault();
		};

		/**
		 * Handles the creation, update, or deletion of a textBlock when the user stops interacting
		 * with a textBlock and moves on.
		 */
		textBlock.onblur = () => {
			textBlock.classList.remove("eventNodateFocused");
			for (let i = 0; i < this.editorIcons.childNodes.length - 1; i++) {
				this.editorIcons.childNodes[i].classList.remove("focusedIcons");
				this.editorIcons.childNodes[i].classList.add("unfocusedIcons");
			}
			let date = null;
			if (this.kind === "event") {
				date = getDate(this, this.eventDelete);
				console.log(date);
			}
			if (!this.eventDelete) {
				this.eventDelete = true;
			}
			if (this.item !== null) {
				if (textBlock.textContent === "") {
					console.log("goodbye my very old friend " + textBlock.textContent);

					localStorage.deleteTextBlock(this.item, true, (res) => {
						console.log(res);
					});
				} else {
					console.log("hello my very old friend " + textBlock.textContent);
					this.item.kind = this.kind;
					this.item.text = textBlock.textContent;
					setTimeout(() => {
						localStorage.updateTextBlock(this.item, date, true, (res) => {
							console.log(res);
						})
					}, 150);
				}
			} else if (textBlock.textContent !== "") {
				localStorage.createTextBlock(this.controller.parent.id, this.controller.subParent, this.controller.currentBlockIndex, textBlock.textContent, this.tabLevel, this.kind, null, this.signifier.id, date, true, (err, block) => {
					if (err) {
						console.log(err);
					} else {
						this.item = block;
						console.log(err);
					}
				})
			}
		};

		/**
		 * Handles the times when the user wants to create an event with an associated time and/or date.
		 */
		textBlock.addEventListener("input", () => {
			let content = textBlock.innerHTML;
			if (this.kind === "event") {
				if (content.includes("@")) {
					textBlock.innerHTML = content.replace(/(@)/g, "&#128368;  ");
					content = textBlock.innerHTML;
					this.moveToSpot(1000000, true);
				}

				if (content.includes("#")) {
					textBlock.innerHTML = content.replace(/(#)/g, "&#128197;  ");
					content = textBlock.innerHTML;
					this.moveToSpot(1000000, true);
				}
			}
			this.setCurrentSpot();
			this.timeSetter = false;
			this.dateSetter = false;
			includesClock(this, textBlock.textContent, true);
			if (this.kind === "event") {
				let dateFiller = "";
				if (!this.timeSetter) {
					dateFiller = `${dateFiller} use @ for time HH:MM`;
					if (!this.dateSetter) {
						dateFiller = `${dateFiller} and # for weekdays or dates MM/DD/YY`;
					}
				} else if (!this.dateSetter) {
					dateFiller = `${dateFiller} use # for weekdays or dates MM/DD/YY`;
				}
				textBlock.setAttribute("dateFiller", dateFiller);
			}
			if (content === "#&nbsp;") {
				this.setupHeader1();
			} else if (content === "##&nbsp;") {
				this.setupHeader2();
			} else if (content === "###&nbsp;") {
				this.setupHeader3();
			} else if (content === "-&nbsp;") {
				this.setupNote();
			} else if (content === "--&nbsp;") {
				this.setupEvent();
			} else if (content === "=-&nbsp;") {
				this.setupTask();
			} else if (content === "<div><br></div>") {
				this.removeStyles();
			} else if (content === "<br>") {
				textBlock.innerHTML = "";
			} else if (textBlock.textContent !== "") {
				this.controller.resetPosition = true;
			}
		});

		/**
		 * Handles providing the framework for editor populaing.
		 */
		textBlock.onfocus = () => {
			this.controller.resetPosition = false;
			this.setCurrentSpot();
			for (let i = 0; i < this.editorIcons.childNodes.length - 1; i++) {
				this.editorIcons.childNodes[i].classList.remove("unfocusedIcons");
				this.editorIcons.childNodes[i].classList.add("focusedIcons");
			}
			this.controller.currentBlockIndex = this.controller.blockArray.indexOf(this);
			this.controller.currentTabLevel = this.tabLevel;
			if (this.classList.contains("noteContainer") || this.classList.contains("eventContainer") || this.checkBox.style.display !== "none") {
				this.controller.creatingFromBullet = { isTrue: true, kind: this.kind };
				if (this.kind === "event") {
					textBlock.classList.add("eventNodateFocused");
				}
			} else {
				this.controller.creatingFromBullet = { isTrue: false, kind: "" };
			}
		};


		/**
		 * If "tab" is hit, then the tab level is increased and the textBlock styling is
		 * set up for each type of block type(?)
		 *
		 * @param {*} e
		 */
		textBlock.onkeydown = (e) => {
			let key = e.key || e.keyCode;
			if (key === "Backspace" || key === "Delete") {
				let tabLevelNotZero = this.tabLevel > 0;
				let calculatedTab = this.tabLevel * tabSize;
				let currentSpot18 = this.currentPointerSpot - calculatedTab === paddingSize;
				let currentSpotNote = this.currentPointerSpot - calculatedTab === paddingSize + 20 && this.classList.contains("noteContainer");
				let isAtBegining = currentSpot18 || currentSpotNote;
				if (textBlock.innerHTML === "" && textBlock.getAttribute("placeholder") === "Type \"/\" to create a block" && this.controller.blockArray.length > 1) {
					this.controller.removeBlock();
				} else if ((textBlock.innerHTML === "" || textBlock.innerHTML === "<br>") && this.tabLevel === 0) {
					this.removeStyles();
				} else if (tabLevelNotZero && isAtBegining) {
					this.tabLevel -= 1;
					this.setupTabLevel();
				}
			} else if (key === "Enter") {
				let content = textBlock.innerHTML;
				if (content === "/h1") {
					this.setupHeader1();
					e.preventDefault();
				} else if (content === "/h2") {
					this.setupHeader2()
					e.preventDefault();
				} else if (content === "/h3") {
					this.setupHeader3()
					e.preventDefault();
				} else if (content === "/note") {
					this.setupNote();
					e.preventDefault();
				} else if (content === "/event") {
					this.setupEvent();
					e.preventDefault();
				} else if (content === "/task") {
					this.setupTask();
					e.preventDefault();
				} else if (content === "/futurelog") {
					alert("New Future Log will be created");
					e.preventDefault();
				} else if (content === "/monthlylog") {
					alert("New Monthly Log will be created");
					e.preventDefault();
				} else if (content === "/dailylog") {
					alert("New Daily Log will be created");
					e.preventDefault();
				} else if (content === "/collection") {
					alert("New Collection will be created");
					e.preventDefault();
				} else if (content === "/tracker") {
					localStorage.createTracker("Practice Tracker", [], currentObject.id, (err, tracker) => {
						if (err) {
							console.log(err);
						} else {
							console.log(tracker);
						}
					});
					e.preventDefault();
				} else {
					this.controller.resetPosition = false;
					this.controller.addNewBlock();
					e.preventDefault();
				}
			} else if (key === "ArrowDown") {
				let lineheight = textBlock.classList.contains("header1") ? 80 : textBlock.classList.contains("header2") ? 57 : this.kind === "note" || this.kind === "event" || this.kind === "task" ? 47 : 42;
				if (this.currentPointerHeight > textBlock.offsetHeight - lineheight) {
					this.controller.moveToNextBlock();
				}
			} else if (key === "ArrowUp") {
				let lineheight = textBlock.classList.contains("header1") ? 50 : textBlock.classList.contains("header2") ? 36 : 28;
				if (this.currentPointerHeight < lineheight + this.initialHeight) {
					this.controller.moveToPreviousBlock();
				}
			} else if (key === "Tab") {
				this.tabLevel += 1;
				this.setupTabLevel();
				e.preventDefault();
			} else if (key === "@" && this.kind === "event") {
				if (this.atPressed) {
					e.stopPropagation();
					e.preventDefault();
				} else {
					this.eventDelete = false;
					this.atPressed = true;
					this.timeSetter = true;
					let dateFiller = "";
					if (!this.timeSetter) {
						dateFiller = `${dateFiller} use @ for time HH:MM`;
						if (!this.dateSetter) {
							dateFiller = `${dateFiller} and # for weekdays or dates MM/DD/YY`;
						}
					} else if (!this.dateSetter) {
						dateFiller = `${dateFiller} use # for weekdays or dates MM/DD/YY`;
					}
					textBlock.setAttribute("dateFiller", dateFiller);
				}
			} else if (key === "#" && this.kind === "event") {
				if (this.hashPressed) {
					e.stopPropagation();
					e.preventDefault();
				} else {
					this.eventDelete = false;
					this.hashPressed = true;
					this.dateSetter = true;
					let dateFiller = "";
					if (!this.timeSetter) {
						dateFiller = `${dateFiller} use @ for time HH:MM`;
						if (!this.dateSetter) {
							dateFiller = `${dateFiller} and # for weekdays or dates MM/DD/YY`;
						}
					} else if (!this.dateSetter) {
						dateFiller = `${dateFiller} use # for weekdays or dates MM/DD/YY`;
					}
					textBlock.setAttribute("dateFiller", dateFiller);
				}
			} else if (this.atPressed && this.kind === "event" && key.match(/[^0123456789:]/g) && !protectedKeys.includes(key)) {
				e.stopPropagation();
				e.preventDefault()
			} else if (this.hashPressed && this.kind === "event" && key.match(/[.:"'=,`~|[{}]/g) && !protectedKeys.includes(key)) {
				e.stopPropagation();
				e.preventDefault();
			}
		};

		textBlock.onkeyup = (e) => {
			let key = e.key || e.keyCode;
			if (key === "ArrowRight" || key === "ArrowLeft" || key === "ArrowDown" || key === "ArrowUp") {
				this.setCurrentSpot();
				if (key === "ArrowRight" || key === "ArrowLeft") {
					this.controller.resetPosition = true;
				}
			}
		};
	}
}


window.customElements.define("text-block", TextBlock);
