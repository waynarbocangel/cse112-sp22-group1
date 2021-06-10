import {navbar, currentObject, adderDropdown, creationMenu} from "../index.js";
import {router} from "../router.js";
const tabspace = 3;

/**
 * Class that creates a dropdown
 */
export class DropdownBlock extends HTMLElement {
	/**
	 * Dropdown Constructor
	 * @param {String} title - A title to give the dropdown.
	 * @param {Object} item - The object being contained within dropdown.
	 * @param {Number} level - The level of the dropdown in respect to others.
	 */
    constructor (title, item, level = 1) {
        super();
        this.currentHeight = 5;
        this.item = item;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
		<style>
            :host {
				font-family:"SF-Pro";

				user-select: none; 
				-webkit-user-select: none;
				-moz-user-select: none; 
				-khtml-user-select: none; 
				-ms-user-select: none;
            }

			.noteContainer {
				margin-top: 7px;
				margin-bottom: 7px;
				margin-left: 87px;
				display: list-item;
				list-style-type: disc;
				list-style-position: outside;
			}

			.eventContainer {
				margin-top: 7px;
				margin-bottom: 7px;
				margin-left: 87px;
				display: list-item;
				list-style-type: circle;
				list-style-position: outside;
			}
			
			#wrapper{
				padding-bottom: 0;
				width: calc(100% - 70px);
			}

			#title{
				display: inline-block;
				font-family: "SF-Pro";
				margin-left: 7.5px;
				font-size: calc(20pt - ${level * 2}pt);
				font-weight: calc(900 - ${level * 200});
				letter-spacing: calc(1.2px - ${level * 0.35}px);
				cursor: pointer;
				border-bottom: 2px solid var(--content-foreground-color); /*rgba(0,0,0,0.4);*/
				transition: 0.2s;
			}

			#title:hover{
				border-bottom: 2px solid var(--content-foreground-color); /*rgba(0,0,0,0.9);*/
				transition: 0.2s;
			}

            #arrow {
                width: 12px;
                height: 12px;
				background-color: rgba(0,0,0,0);
                border: none;
				cursor: pointer;
            }

            #arrow img {
                max-width: calc(22px - ${level * 3}px);
                max-height: calc(22px - ${level * 3}px);

                filter: var(--icon-filter);
            }
            :not(.closed) #arrow img {
                transform: rotate(0deg);
                transition: transform 0.2s;
            }

            .closed #arrow img {
                transform: rotate(90deg);
                transition: 0.2s;
            }

			:not(.closed) #contentWrapper{
				max-height: 0;
				overflow: hidden;
				transition: max-height 0.2s ease-out;
			}

			.closed #contentWrapper{
				max-height: auto;
				transition: max-height 0.2s ease-out;
			}

            #contentWrapper {
                position: relative;
                left: ${tabspace}em;
                width: calc(100% - ${tabspace * level}em);
                overflow-x: none;
            }

			.singleItemWrapper{
				border-top: 1px solid var(--border-color);
			}

			#editorIcons{
				position: relative;
				display: inline;
				float: left;
				top: calc(17.5px - ${Number(level)}px);
				vertical-align: top;
			}
			
			#editorIcons img{
				margin-right: 7px;
				height: 15px;
				cursor: pointer;
				filter: var(--icon-filter);
			}
			.unfocusedIcons{
				opacity: 0.5;
				transition: 0.2s;
			}
	
			#editorIcons img:hover{
				opacity: 0.8;
				transition: opacity 0.2s;
			}
		</style>
		<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons" id="plus"/><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons" id="more"/></div>
        <div id="wrapper">
			<div id="titleWrapper" class="${level > 1 ? "singleItemWrapper" : ""}">
				<h1 id="title"></h1>
				<button id="arrow"><img src="../public/resources/right-chevron.png" /></button>
			</div>
            <div id="contentWrapper"></div>

        `;
        this.button = this.shadowRoot.getElementById("arrow");
        this.wrapper = this.shadowRoot.getElementById("wrapper");
        this.contentWrapper = this.shadowRoot.getElementById("contentWrapper");
        this.header = this.shadowRoot.querySelector("h1");
        this.title = title;
		this.titleWrapper = this.shadowRoot.querySelector("#titleWrapper");
		this.plus = this.shadowRoot.getElementById("plus");
		this.more = this.shadowRoot.getElementById("more");
    }

	/**
	 * When creating a new dropdown instance, it displays the dropdown,
	 * listens to when the dropdown button is clicked to display items inside dropdown,
	 * and listens to when a dropdown header is clicked to navigate to the page for the dropdown object
	 */
    connectedCallback () {
		this.plus.onclick = () => {
			if (currentObject.objectType == "index") {
				adderDropdown.fillDropdown([{
					title: "New Future Log",
					listener: () => {
						creationMenu.setKind("futureLog");
						creationMenu.show();
						adderDropdown.hide();
					}
				}, {
					title: "New Collection",
					listener: () => {
						creationMenu.setKind("collection");
						creationMenu.show();
						adderDropdown.hide();
					}
				}]);
				let offsetValue = this.plus.getBoundingClientRect().top + this.plus.offsetHeight + 105 > window.innerHeight ? - 105 : this.plus.offsetHeight + 10;
				adderDropdown.setPosition(this.plus.getBoundingClientRect().top + document.body.scrollTop + offsetValue, this.plus.getBoundingClientRect().left);
				adderDropdown.toggleDropdown();
			}
		}
		this.removeAttribute("closed");
        this.button.addEventListener("click", () => {
			this.toggleItems();
		});
		this.header.addEventListener("click", () => {
			console.log(this.item);
			this.navigateToObject();
		})
		// This.contentWrapper.style.display = 'none';
    }

	/**
	 * Gets the dropDown title.
	 * @return Returns the dropDown title.
	 */
	get title () {
		return this.header.innerText;
	}

	/**
	 * Sets the title for the dropdown
	 * @param {String} title the new title of the dropdown
	 */
    set title (title) {
        this.header.innerText = title;
    }

	/**
	 * Hides the items inside the dropdown
	 */
    get closed () {
        return this.wrapper.hasAttribute("closed");
    }

    set closed (isClosed) {
        if (isClosed) {
            this.hide();
        } else {
            this.display();
        }
    }

	/**
	 * When an object is clicked, it will toggle the page for that object
	 */
	navigateToObject () {
		router.setState(`#${this.item.objectType}~${this.item.id}`, false);
		navbar.open = false;
	}

	/**
	 * Displays the dropdown when called
	 */
    display () {
        this.wrapper.classList.toggle("closed", true);
    }

	/**
	 * Closes the dropdown when called
	 */
    hide () {
        this.wrapper.classList.toggle("closed", false);
    }

	/**
	 * Displays the items inside the dropdown when called or hides them if already shown
	 */
    toggleItems () {
        this.wrapper.classList.toggle("closed");

        if (this.wrapper.classList.contains("closed")) {
            this.display();
        } else {
            this.hide();
        }
    }
}

window.customElements.define("drop-down", DropdownBlock);
