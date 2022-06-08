import * as localStorage from "../localStorage/userOperations.js";

// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
	<link type="text/css" rel="stylesheet" href="generalSettingsPanel.css" />
	<label for="email">Email:</label>
	<input id="email" name="email" />
	<label for="passord">Change Password:</label>
	<span>
		<input id="password" name="password" placeholder="New Password" />
		<button id="passwordConfirm" >Confirm</button>
	</span>
    <button id="logout"> Logout </button>
	<button id="deleteUser"> Delete Account </button>
</template>

export class GeneralSettingsPanel extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.email = this.shadowRoot.getElementById("email");
		this.password = this.shadowRoot.getElementById("password");
		this.confirmPasswordChange = this.shadowRoot.getElementById("passwordConfirm");
		localStorage.readUser((err, user) => {
			if (err) {
				console.log(err);
			} else {
				this.email.value = user.email;
			}
		});
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
