import { creationMenu } from "../index.js";

const template = document.createElement("template");

template.innerHTML = `
	<style>
        :host {
            z-index: 1;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: var(--navbar-background-color); /* rgba(236, 223, 207, 1); */
            width: 190px;
            overflow: auto;
        }

        .dropdown-content ul {
            padding: 5px 8px;
			margin: 0;
            list-style-type: none;
        }

        #myDropdown button {
            background-color: transparent; /* Green */
            border: none;
            color: var(--content-foreground-color); /*balck;*/
            padding: 10px 18px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 18px;
            font-family: "SF-Pro";
            cursor: pointer;
        }
        
        .show {display: block;}


	</style> 
	<div class="dropdown">
		<div id="myDropdown" class="dropdown-content">
			<ul id="dropdownList">
			</ul>
		</div>
	</div>
	
`;

/**
 * Class that Creates Inline DropDown
 */
export class InlineDropdown extends HTMLElement {
    /**
     * Inline DropDown constructor
     */
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.dropdown = this.shadowRoot.getElementById("myDropdown");
        this.list = this.shadowRoot.getElementById("dropdownList");
        this.clicked = false;
    }

    connectedCallback() {
        document.addEventListener('resize', (e) => {
            this.hide();
        });

        document.addEventListener('click', (e) => {
            if (!this.contains(e.target) && !this.clicked) {
                this.hide();
            }
            this.clicked = false;
        });
    }

    /**
     * Displays dropdown if hidden or hides it if shown
     */
    toggleDropdown() {
        this.dropdown.classList.toggle("show");
        this.clicked = true;
    }

    /**
     * Hides dropdown
     */
    hide() {
        this.dropdown.classList.toggle("show", false);
    }

    /**
     * Shows dropdown
     */
    show() {
        this.dropdown.classList.toggle("show", true);
    }

    /**
     * Fill the dropdown
     * @param {Array<Object>} elements 
     */
    fillDropdown(elements) {
        while (this.list.childNodes.length > 0) {
            this.list.childNodes[0].remove();
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
    }

    /**
     * Sets the position of the dropdown
     * @param {Number} x - distance of top
     * @param {Number} y - distance of left
     */
    setPosition(x, y) {
        this.dropdown.style.top = `${x}px`;
        this.dropdown.style.left = `${y}px`;
    }
}

window.customElements.define("inline-dropdown", InlineDropdown);
