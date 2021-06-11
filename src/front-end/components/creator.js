/**
 * Creator Module
 * @module creatorModule
 */
/* eslint-disable */ 
import * as dropdown from "../fillDropdown.js";
import * as localStorage from "../localStorage/userOperations.js";
import {adderDropdown, currentObject, creationMenu} from "../index.js";
/* eslint-disable */
let template = document.createElement("template");
template.innerHTML = `
	<style>
		@font-face {
			font-family:"SF-Pro";
			src: url("./public/fonts/SF-Pro.ttf");
		}
		#textBlock {
			font-family: "SF-Pro";
			border: none;
			overflow: auto;
			outline: none;
			resize: none;
			display: inline-block;
		}

		#textBlock:empty::before{
			content: attr(placeholder);
			color: gray;
		}

		.unstylized{
			margin: 7px 0 12px;
			font-size: 18px;
			line-height: 28px;
			width: calc(100% - 44px);
		}

		#editorIcons{
			display: inline-block;
			vertical-align: top;
		}
		
		#editorIcons img{
			margin-right: 7px;
			height: 15px;
			cursor: pointer;
			filter: var(--icon-filter);
		}

		.unfocusedIcons{
			opacity: 0.3;
			transition: 0.2s;
		}

		.focusedIcons{
			opacity: 0.5;
			transition: 0.2s;
		}

		#editorIcons img:hover{
			opacity: 0.8;
			transition: opacity 0.2s;
		}

		.paragraphIcons{
			margin-top: 10px;
		}
	</style>
	<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons" id="plus" /><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons" id="more" /></div>
	<div id="textBlock" contenteditable="true" ondrop="return false;" class="unstylized" placeholder='Type "/" to create an item: future log, collection, etc'></div>
`;

/*
 * Class to create new creator
 */
export class CreatorBlock extends HTMLElement {
	/**
	 * Creator constructor
	 */
	constructor () {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.plus = this.shadowRoot.getElementById("plus");
		this.more = this.shadowRoot.getElementById("more");
	}

	/**
	 * When a creator is created, it updates page to show textblock children and
	 * the user will be alerted what type of object is being created.
	 */
	connectedCallback () {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		this.plus.onclick = () => {
            let offsetValue = textBlock.getBoundingClientRect().top + textBlock.offsetHeight + 105 > window.innerHeight ? -100 : textBlock.offsetHeight + 5;
            dropdown.openCreationDropdown(textBlock.getBoundingClientRect().top + document.body.scrollTop + offsetValue, this.plus.getBoundingClientRect().left);
		}
		textBlock.onkeydown = (e) => {
			let key = e.key;
			if (key === "Enter") {
				e.preventDefault();
				let content = textBlock.innerHTML;
				if (content === "/futurelog" && currentObject.objectType === "index") {
					creationMenu.setKind("futureLog");
					creationMenu.show();
					adderDropdown.hide();
				} else if (content === "/monthlylog" && currentObject.objectType === "futureLog") {
					creationMenu.setKind("monthlyLog");
					creationMenu.show();
					adderDropdown.hide();
				} else if (content === "/dailylog" && currentObject.objectType === "monthlyLog") {
					creationMenu.setKind("dailyLog");
					creationMenu.show();
					adderDropdown.hide();
				} else if (content === "/collection" && currentObject.objectType === "index") {
					creationMenu.setKind("collection");
					creationMenu.show();
					adderDropdown.hide();
				} else if (content === "/tracker") {
					localStorage.createTracker("Practice Tracker", [], currentObject.id, true, (err, tracker) => {
						if (err) {
							console.log(err);
						} else {
							console.log(tracker);
						}
					});
				}
			}
		}
	}
}
window.customElements.define("creator-block", CreatorBlock);
