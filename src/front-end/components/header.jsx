import * as dropdown from "../fillDropdown.js";
import * as localStorage from "../localStorage/userOperations.js";
import { navbar } from "../index.js";
import { currentState } from "../state/stateManager.js";
import { FileLocation } from "../components/fileLocation.jsx"

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="header.css" />
	<div id="file">
	</div>
	<div id="container">
		<div id="menuToggle">
			<input type="checkbox" />
			<span></span>
			<span></span>
			<span></span>
		</div>
		<span class="header">
			<div>
				<h1 id="title_page">Template Page Title</h1>
				<button class="edit-button">Edit</button>
			</div>
			<button class="new-button">New</button>
		</span> 
		<span class="search_bar" id="searchBar">
			<input type="text" placeholder="Search" />
			<img src="../public/resources/search_icon.png" />
		</span>
	</div>
</template>

/**
 * Class that creates Page Header
 */
export class PageHeader extends HTMLElement {
	/**
	 * PageHeader constructor
	 */
	constructor () {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.headerTitle = this.shadowRoot.getElementById("title_page");

		this.file = this.shadowRoot.getElementById("file");
		// this.futureLog = new FileLocation(" Future Log   ", "futureLog");
		// this.monthlyLog = new FileLocation(" Monthly log   ", "monthlyLog");
		// this.todaysLog = new FileLocation(" Today's log   ", "todaysLog");
		// this.file.appendChild(this.futureLog);
		// this.file.appendChild(this.monthlyLog);
		// this.file.appendChild(this.todaysLog);



		this.futureLogButton = this.shadowRoot.querySelector(".new-button");
		this.titleHeader = this.shadowRoot.querySelector(".header");
		this.imgbuttons = this.shadowRoot.querySelectorAll(".imgbutton");
		this.menuToggle = this.shadowRoot.querySelector("#menuToggle input");
		this.searchBar = this.shadowRoot.getElementById("searchBar");

	}

	/**
	 * When header is created, the callback will listen to when the menu is toggled
	 */
	connectedCallback () {
		this.futureLogButton.addEventListener("click", () => {
			const headerTopOffset = this.titleHeader.offsetTop + this.titleHeader.offsetHeight;
			const headerLeftOffset = this.titleHeader.offsetLeft + this.titleHeader.offsetWidth - 206;
			/* dropDown window appears to be 206 px, not sure why previous value was 210 */
			dropdown.openCreationDropdown(headerTopOffset, headerLeftOffset);
		});

		this.menuToggle.addEventListener("change", () => {
			navbar.toggle();
		});

		this.headerTitle.onblur = () => {
			if (this.headerTitle.contentEditable) {
				currentState.title = this.headerTitle.innerText;
				localStorage.updateCollection(currentState, true, (err) => {
					if (err) {
						console.log(err);
					}
				});
			}
		};
	}

	/**
	 * Makes header content editable
	 */
	makeEditable () {
		this.headerTitle.contentEditable = true;
	}

	/**
	 * Makes header content uneditable
	 */
	makeUneditable () {
		this.headerTitle.contentEditable = false;
	}

	set title (title) {
		this.shadowRoot.getElementById("title_page").innerHTML = title;
	}

	/**
	 * Gets the header's current title
	 */
	get title () {
		return this.headerTitle.innerText;
	}

	/**
	 * Creates a futureLog
	 */
	createFutureLog () {
		localStorage.createFutureLog(new Date(2021, 5, 22), new Date(2021, 8, 23), [], [], [], true, (err, futureLog) => {
			if (err) {
				console.log(err);
			} else {
				localStorage.readUser((error, res) => {
					if (error) {
						console.log(error);
					} else if (res.ok) {
						console.log(futureLog);
					}
				})
			}
		});
	}
}

window.customElements.define("page-header", PageHeader);
