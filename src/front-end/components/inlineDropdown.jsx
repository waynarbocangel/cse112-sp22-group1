// JSX Engine Import
/* eslint-disable */
/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from "../jsxEngine.js";
/* eslint-enable */

let template = <template>
    <link type="text/css" rel="stylesheet" href="inlineDropdown.css" />
    <div class="dropdown">
		<div id="myDropdown" class="dropdown-content">
			<ul id="dropdownList">
			</ul>
		</div>
	</div>
</template>;

/**
 * Class that Creates Inline DropDown
 */
export class InlineDropdown extends HTMLElement {
	/* eslint-disable */
	/**
     * Inline DropDown constructor
     */
	/* eslint-disable */
    constructor () {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.dropdown = this.shadowRoot.getElementById("myDropdown");
        this.list = this.shadowRoot.getElementById("dropdownList");
        this.clicked = false;
    }
	/* eslint-disable */
    connectedCallback() {
        document.addEventListener("resize", (e) => {
            this.hide();
        });

        document.addEventListener("click", (e) => {
            if (!this.contains(e.target) && !this.clicked) {
                this.hide();
            }
            this.clicked = false;
        });
    }
	/* eslint-disable */

    /**
     * Displays dropdown if hidden or hides it if shown
     */
    toggleDropdown () {
        this.dropdown.classList.toggle("show");
        this.clicked = true;
    }

    /**
     * Hides dropdown
     */
    hide () {
        this.dropdown.classList.toggle("show", false);
        this.clicked = false;
    }

    /**
     * Shows dropdown
     */
    show () {
        this.dropdown.classList.toggle("show", true);
        this.clicked = true;
    }

    /**
     * Fill the dropdown
     * @param {Array<Object>} elements 
     */
    fillDropdown(elements) {
        while (this.list.firstChild) {
            this.list.lastChild.remove();
        }
        if (!elements.length) {
            this.hide();
            return;
        }
        for (let i = 0; i < elements.length; i++) {
            let title = elements[i].title;
            let newButton = document.createElement("button");
            newButton.innerHTML = title;
            let listWrapper = document.createElement("li");
            listWrapper.appendChild(newButton);
            this.list.appendChild(listWrapper);
            newButton.onclick = elements[i].listener;
        }

        this.show();
    }

    /**
     * Sets the position of the dropdown
     * @param {Number} x - pixels from the left side of the screen
     * @param {Number} y - pixels from the top of the screen
     */
    setPosition (x, y) {
        this.dropdown.style.top = `${x}px`;
        this.dropdown.style.left = `${y}px`;
    }
}

window.customElements.define("inline-dropdown", InlineDropdown);

