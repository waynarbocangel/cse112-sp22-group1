import * as localStorage from "../localStorage/userOperations.js";
import {currentObject} from "../index.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="creator.css" />
	<div id="editorIcons" class="paragraphIcons"><img src="./public/resources/plusIcon.png" class="unfocusedIcons"/><img src="./public/resources/sixDotIcon.png" class="unfocusedIcons"/></div>
	<div id="textBlock" contentEditable="true" onDrop={() => {return false;}} class="unstylized" placeholder='Type "/" to create an item: future log, collection, etc'></div>
</template>

export class CreatorBlock extends HTMLElement {
	constructor () {
		super();
		console.log(template);
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback () {
		let textBlock = this.shadowRoot.getElementById("textBlock");
		textBlock.onkeydown = (e) => {
			let key = e.key;
			if (key === "Enter") {
				e.preventDefault();
				let content = textBlock.innerHTML;
				if (content === "/futurelog") {
					alert("New Future Log will be created");
				} else if (content === "/monthlylog") {
					alert("New Monthly Log will be created");
				} else if (content === "/dailylog") {
					alert("New Daily Log will be created");
				} else if (content === "/collection") {
					alert("New Collection will be created");
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
