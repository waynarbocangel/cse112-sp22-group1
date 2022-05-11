
import * as localStorage from "../localStorage/userOperations.js";
import {createEditor} from "./blockController.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="trackerBlock.css" />
    <div id="container">
		<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons"/><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons"/></div>
		<div id="title">Test</div>
	</div>
</template>

/**
 * Class that creates TrackerBlock
 */
export class TrackerBlock extends HTMLElement {

	/**
	 * TrackerBlock constructor
	 * @param {String} title - Title to give the tracker
	 * @param {String} parent - The id of the tracker's parent
	 * @param {Object} tracker - The tracker object
	 * @param {Object} trackerMenu - The menu where the tracker block was created from
	 */
	constructor (title, parent, tracker, trackerMenu) {
		super();
		this.parent = parent;
		this.item = tracker;
		this.trackerMenu = trackerMenu;
		this.attachShadow({mode: "open"});
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.trackerButton = this.shadowRoot.querySelector(".plus");
		this.plusButton = this.shadowRoot.querySelector("#editorIcons img");
		this.plusButton = this.shadowRoot.querySelector("#editorIcons img + img");
		this.titleSpan = this.shadowRoot.getElementById("title");
		this.titleSpan.innerHTML = title;
	}

	/**
	 * When a tracker block is created the callback will check when a tracker add button is clicked
	 */
	connectedCallback () {
		this.plusButton.onclick = () => {
			this.createTracker();
		};

		this.titleSpan.onclick = () => {
			this.trackerMenu.clear();
			this.trackerMenu.title = this.titleSpan.innerHTML;
			this.trackerMenu.isInsideTracker = true;
			createEditor(this.trackerMenu.shadowRoot.getElementById("editor"), this.item, null, (success) => {
				if (!success) {
					console.log("Error loading tracker");
				}
			});
		};
	}

	/**
	 * Creates a tracker for when the add button is clicked
	 */
	createTracker () {
		localStorage.createTracker(this.title.innerHTML, [], this.parent, true, (err, tracker) => {
			if (err) {
				console.log(err);
			} else {
				console.log(tracker);
			}
		});
	}
}

window.customElements.define("tracker-block", TrackerBlock);
