/**
 * Creator Module
 * @module creatorModule
 */
 import * as dropdown from "../fillDropdown.js";
 import * as localStorage from "../localStorage/userOperations.js";
 import {adderDropdown, currentObject, creationMenu} from "../index.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="creator.css" />
	<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons" id="plus" /><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons" id="more" /></div>
	<div id="textBlock" contentEditable="true" ondrop={()=>{return false;}} class="unstylized" placeholder='Type "/" to create an item: future log, collection, etc'></div>
</template>

export class CreatorBlock extends HTMLElement {
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
