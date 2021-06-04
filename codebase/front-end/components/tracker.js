import { TrackerBlock } from "./trackerBlock.js";
import { currentObject } from "../index.js";
import * as localStorage from "../localStorage/userOperations.js";
import { CreatorBlock } from "./creator.js";

// tracker side menu web component
export class TrackerMenu extends HTMLElement {
    static get observedAttributes() {
        return ['open'];
    }

    constructor(title) {
        super();
		this.attachShadow({ mode: 'open' });
        this.close = this.close.bind(this);
        this.clear = this.clear.bind(this);
		this.shadowRoot.innerHTML = `
        <style>
			@font-face {
				font-family:"SF-Pro";
				src: url("./public/fonts/SF-Pro.ttf");
			}

			text-block {
				display: block;
				margin: 0;
				padding: 0;
				width: 100%;
				left: 0;
				right: 0;
			}

			tracker-block{
				display: block;
				margin: 0;
				padding: 0;
				width: 100%;
				left: 0;
				right: 0;
			}

			creator-block{
				display: block;
				margin: 0;
				padding: 0;
				width: 100%;
				left: 0;
				right: 0;
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

            .wrapper {
                display: flex;
                flex-direction: column;
                position: fixed;
                top: 0;
                right: 0;
                z-index: 5;
                width: 40%;
                min-width: 40ch;
                height: 100vh;
                background-color: var(--tracker-background-color); /* #2B2D42 */
                color: var(--tracker-foreground-color);
                font-family: "SF-Pro";
                transition: transform .4s ease-in-out
            }

            .wrapper.closed {
                transform: translate3d(100%, 0, 0);
            }
                        
            .wrapper.open {
                transform: translate3d(0, 0, 0);
            }

            .tracker_header {
                display: flex;
                justify-content: flex-start;

                margin: 0 20px;
                padding: 0 20px;
                height: 75px;
                border-bottom: 2px solid var(--tracker-border-color); /*rgba(157, 148, 241, 0.7);*/
            }
            
            .tracker_header h1 {
                text-align: center;
                flex: 1;
                font-size: 24pt;
            }

            button {
                margin: 0;
                border: none;
                background-color: rgba(0,0,0,0);
            }

            .close_button img {
                filter: invert();
                opacity: 50%;
				width: 15px;
				cursor: pointer;
            }
            
            .close_button:hover img {
                opacity: 100%;
            }

            .tracker_menu {
                overflow-y: auto;
            }
            
            #editor {
                margin: 20px 20px 0px;
            }

            @media screen and (max-width: 900px) {
                .wrapper{
                    width: 100%;
                }
            }
            </style>

        <div class="wrapper closed">
            <div class="tracker_header">
                    <button class="close_button"> <img src="../public/resources/right-chevron.png"> </button>
                    <h1 class="tracker_h1">Future Log Tracker</h1>
            </div>

            <div class="tracker_menu"><div id="editor"></div></div>
        </div>
        `;

        this.title = title;
        this.closeButton = this.shadowRoot.querySelector(".close_button");
        this.editor = this.shadowRoot.getElementById("editor");
		this.isInsideTracker = false;
    }

	/**
	 * changes attribute if the value parameters differ
	 * 
	 * @param {String} attr attribute to change 
	 * @param {String} oldVal old value passed in
	 * @param {String} newVal new value passed in
	 */
    attributeChangedCallback(attr, oldVal, newVal) {
        if (oldVal !== newVal) {
            this[attr] = this.hasAttribute(attr);
        }
    }

	/**
	 * when a tracker instance is created it listens to when tracker is clicked
	 * and if it is toggled when clicked it will close, otherwise it will toggle
	 */
    connectedCallback() {
        //console.log('can this event print');
        this.closeButton.addEventListener("click", () => {
			if (!this.isInsideTracker) {
				this.close();
			} else {
				this.isInsideTracker = false;
				this.clear();
				let trackerBlockWrapper = this.shadowRoot.getElementById("editor");
				localStorage.readUser((err, user) => {
					if (err) {
						console.log(err);
					} else {
						let userArr = user.trackers;
						let trackerArr = [];
						for (let i = 0; i < currentObject.trackers.length; i++) {
							console.log("hello");
							trackerArr.push(userArr.filter(object => object.id == currentObject.trackers[i])[0]);
						}
						console.log(trackerArr);
						setTimeout(() => {
							for(let i = 0; i < trackerArr.length; i++) {
								let currentTracker = trackerArr[i];
								let dropdownTracker = new TrackerBlock(currentTracker.title, currentObject.id, currentTracker, this);
								trackerBlockWrapper.appendChild(dropdownTracker);
							}
							trackerBlockWrapper.appendChild(new CreatorBlock());
						}, 10);
					}
				});
				if (currentObject.objectType == "futureLog") {
					this.title = "Future Log Trackers";
				} else if (currentObject.objectType == "monthlyLog") {
					this.title = "Monthly Log Trackers";
				} else {
					this.title = "Daily Log Trackers";
				}
			}
		});
    }

	/**
	 * toggles the tracker menu to the opposite state that it is in
	 */
    toggle() {
        this.open = !this.open;
    }

	/**
	 * returns the attributes that are open(?)
	 */
    get open() {
        return this.hasAttribute('open');
    }

	/**
	 * sets or removes attributes based on whether parameter is true or false
	 * 
	 * @param {Boolean} isOpen parameter to decide setting or removing attributes
	 */
    set open(isOpen) {
        this.shadowRoot.querySelector('.wrapper').classList.toggle('open', isOpen);
        this.shadowRoot.querySelector('.wrapper').classList.toggle('closed', !isOpen);
        this.shadowRoot.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
            this.setAttribute('open', 'true');
            this.focus();
        } else {
            this.removeAttribute('open');
        }
    }

	/**
	 * sets tracker title
	 */
    set title(text) {
        this.shadowRoot.querySelector(".tracker_header h1").innerText = text;
    }

	/**
	 * closes tracker
	 */
    close() {
        this.open = false;
    }

	/**
	 * clears tracker items
	 */
    clear() {
        while (this.editor.childNodes.length > 0) {
            this.editor.childNodes[0].remove();
        }
    }
}

window.customElements.define('tracker-menu', TrackerMenu);