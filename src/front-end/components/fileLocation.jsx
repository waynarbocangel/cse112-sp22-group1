import { router } from "../state/router.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="fileLocation.css" />
	<section id="fileLocation">
        <img id="fileImg" src="../public/resources/futureLog.png"></img>
        <p id="locationTitle"></p> 
	</section>
</template>

/**
 * Class that Creates navbar
 */
export class FileLocation extends HTMLElement {
	static get observedAttributes () {
		return ["open"];
	}

	/**
	 * Navbar constructor
	 */
	constructor (title, type, collectionID, slash) {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.collectionID = collectionID;
        this.img = this.shadowRoot.getElementById("fileImg");
        this.locationTitle = this.shadowRoot.getElementById("locationTitle");
		this.type = type;
        if (slash) {
            this.locationTitle.innerHTML = title + " /"
        } else {
            this.locationTitle.innerHTML = title 
        }

        if(type == "dailyLog") {
            this.img.src = "../public/resources/todaysLog.png";
        } else if (type == "monthlyLog") {
            this.img.src = "../public/resources/monthlyLog.png";
        } else if (type == "index") {
            this.img.src = "../public/resources/index.png";
        } else {
            this.img.src = "../public/resources/futureLog.png";
        }
	}

	/**
	 * When a log instance is created sets event listeners for all header buttons in the callback
	 */
	connectedCallback () {
		// normal open menu button
		this.locationTitle.onclick = () => {
			router.navigate(`/${this.type}/${this.collectionID}`);
		};
	}

}

customElements.define("filelocation-component", FileLocation);
