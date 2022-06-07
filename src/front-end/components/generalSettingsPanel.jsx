import * as localStorage from "../localStorage/userOperations.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="generalSettingsPanel.css" />
    <div class="profile">Profile placeholder</div>
    <button id="logout"> Logout </button>
</template>

export class GeneralSettingsPanel extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        let themeRadios = this.shadowRoot.querySelectorAll("input[type=radio]");
        for (let themeRadio of themeRadios) {
            themeRadio.addEventListener("change", () => this.updateTheme(themeRadio.id));
        }

		this.logoutButton = this.shadowRoot.getElementById("logout");

    }

	connectedCallback () {
		this.logoutButton.onclick = () => {
			if (navigator.onLine) {
				localStorage.deleteDB();
				window.location.href = "/login";
			} else if (confirm("You're logging out while offline, all your local changes will be deleted if you continue!")) {
				localStorage.deleteDB();
				window.location.href = "/login";
			}
		}
	}
}

customElements.define("general-settings-panel", GeneralSettingsPanel);
