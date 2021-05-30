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
            .wrapper {
                display: flex;
                flex-direction: column;
                position: fixed;
                z-index: 5;
                top: 0;
                width: 40vw;
                height: 100vh;
				background-color: var(--tracker-background-color); /* #2B2D42 */
                color: var(--tracker-foreground-color);
                font-family: "SF-Pro";
            }

            .wrapper.closed {
                transform: translate3d(140vw, 0, 0);
                transition: transform .4s ease-in-out /*cubic-bezier(0, .52, 0, 1);*/
            }
                        
            .wrapper.open {
                transform: translate3d(60vw, 0, 0);
                transition: transform .4s ease-in-out /*cubic-bezier(0, .52, 0, 1);*/
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
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (oldVal !== newVal) {
            this[attr] = this.hasAttribute(attr);
        }
    }

    connectedCallback() {
        this.closeButton.addEventListener("click", this.close);
    }

    toggle() {
        this.open = !this.open;
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(isOpen) {
        this.shadowRoot.querySelector('.wrapper').classList.toggle('open', isOpen);
        this.shadowRoot.querySelector('.wrapper').classList.toggle('closed', !isOpen);
        this.shadowRoot.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen)
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
        this.close();
        for (let child of this.editor.children) {
            child.remove();
        }
    }
}

customElements.define('tracker-menu', TrackerMenu);

