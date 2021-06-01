import { TrackerBlock } from "./trackerBlock.js";
import { createEditor } from './blockController.js';
import { currentObject } from "../index.js";
import * as localStorage from "../localStorage/userOperations.js";

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
			
			.noteContainer {
				margin-top: 7px;
				margin-bottom: 7px;
				margin-left: 65px;
				display: list-item;
				list-style-type: disc;
				list-style-position: outside;
			}
			
			.eventContainer {
				margin-top: 7px;
				margin-bottom: 7px;
				margin-left: 65px;
				display: list-item;
				list-style-type: circle;
				list-style-position: outside;
			}

            .wrapper {
                display: flex;
                flex-direction: column;
                position: fixed;
                z-index: 5;
                top: 0;
                width: 500px;
				padding-left: 20px;
				padding-right: 20px;
                height: 100vh;
				background-color: var(--tracker-background-color); /* #2B2D42 */
                color: var(--tracker-foreground-color);
                font-family: "SF-Pro";
                transform: translate3d(calc(100vw + 540px), 0, 0);
                transition: transform .4s ease-in-out;
            }

            .wrapper.closed {
                transform: translate3d(calc(100vw + 540px), 0, 0);
                transition: transform .4s ease-in-out /*cubic-bezier(0, .52, 0, 1);*/
            }
                        
            .wrapper.open {
                transform: translate3d(calc(100vw - 540px), 0, 0);
                transition: transform .4s ease-in-out /*cubic-bezier(0, .52, 0, 1);*/
            }
            
            #tracker_menu {
                background-color: #2B2D42;
                color: white;
                opacity: 95%;
				padding-left: 0;
				padding-right: 0;
                width: 100%;
            }
            
            .tracker_header {
                display: flex;
                justify-content: flex-start;

                margin: 0 20px;
                height: 75px;
				border-bottom: 2px solid var(--tracker-border-color); /*rgba(157, 148, 241, 0.7);*/
            }
            
            .tracker_header h1 {
                text-align: center;
                flex: 1;
                font-size: 24pt;
				paddign-right: 27px;
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
					width: calc(100% - 40px);
					transform: translate3d(calc(200vw), 0, 0);
					transition: transform .4s ease-in-out;
				}

				.wrapper.open{
					transform: translate3d(0, 0, 0);
					transition: transform .4s ease-in-out;
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

        this.titleText = title;
        this.closeButton = this.shadowRoot.querySelector(".close_button");
        this.editor = this.shadowRoot.getElementById("editor");
		this.isInsideTracker = false;
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (oldVal !== newVal) {
            this[attr] = this.hasAttribute(attr);
        }
    }

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
							createEditor(trackerBlockWrapper, null, null, (success) => {
								console.log(success);
							});
						}, 10);
					}
				});
				if (currentObject.objectType == "futureLog") {
					this.titleText = "Future Log Trackers";
				} else if (currentObject.objectType == "monthlyLog") {
					this.titleText = "Monthly Log Trackers";
				} else {
					this.titleText = "Daily Log Trackers";
				}
			}
		});
    }

    toggle() {
        this.open = !this.open;
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(isOpen) {
        this.shadowRoot.querySelector('.wrapper').classList.toggle('open', isOpen);
        this.shadowRoot.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
            this.setAttribute('open', 'true');
            this.focus();
        } else {
            this.removeAttribute('open');
        }
    }

    set title(text) {
        this.shadowRoot.querySelector(".tracker_header h1").innerText = text;
    }

    close() {
        this.open = false;
    }

    clear() {
        while (this.editor.childNodes.length > 0) {
            this.editor.childNodes[0].remove();
        }
    }
}

window.customElements.define('tracker-menu', TrackerMenu);