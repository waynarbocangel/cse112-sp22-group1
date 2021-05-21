// tracker side menu web component
class TrackerMenu extends HTMLElement {
    static get observedAttributes() {
        return ['open'];
    }

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.close = this.close.bind(this);
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (oldVal !== newVal) {
            this[attr] = this.hasAttribute(attr);
        }
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            .wrapper {
                position: fixed;
                z-index: 1000;
                top: 0;
                width: 35vw;
                height: 100vh;
                
                transform: translate3d(100vw, 0, 0);
                transition: transform .25s ease-in /*cubic-bezier(0, .52, 0, 1);*/
            }
                        
            .wrapper.open {
                transform: translate3d(65vw, 0, 0);
                transition: transform .25s ease-in /*cubic-bezier(0, .52, 0, 1);*/
            }
            
            .tracker_menu {
                background-color: #2B2D42;
                color: white;
                opacity: 95%;
            
                width: 35vw;
                height: calc(100vh - 80px);
                overflow-y: scroll;
            }
            
            .tracker_header {
                top: 0;
                right: 0;
                width: 35vw;
                height: 80px;
                background-color: #2B2D42;
                color: white;
                opacity: 95%;
            
                border-bottom: solid rgba(157, 148, 241, 0.7);
            }
            
            .tracker_header_content {
                position: relative;
                top: 1em;
            }
            
            .tracker_header .close_button {
                margin-top: 10px;
                margin-left: 10px;
                line-height: 36px;
                vertical-align: sub;
            }
            
            .tracker_header h1 {
                display: inline;
                text-align: center;
                font-size: 24pt;
            }
            
            .tracker_header .close_button img {
                filter: invert() opacity(50%);
            }
            
            .tracker_header .close_button img:hover {
                filter: invert() opacity(100%);
            }

            button {
                border: none;
                background-color: rgba(0,0,0,0);
            }
            
            button.imgbutton img {
                filter: opacity(50%);
            }
            
            button.imgbutton:hover img {
                filter: opacity(100%);
                transition: 150ms;
            }

            .tracker_menu .content {
                margin-top: 10px;
            }
        </style>
        <div class="wrapper">
            <div class="tracker_header">
                <div class="tracker_header_content">
                    <button class="close_button"> <img src="images/right-chevron.png"> </button>
                    <h1 class="tracker_h1">Future Log Tracker</h1>
                </div>
            </div>
            <div class=tracker_menu>
                <article class="content">
                </article>
            </div>
        </div>
        `;

        this.title = "Future log tracker";
        this.closeButton = this.shadowRoot.querySelector(".close_button");
        this.closeButton.addEventListener("click", this.close);
    }

    disconnectedCallback() {
    }

    toggle() {
        this.open = !this.open;
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(isOpen) {
        this.shadowRoot.querySelector('.wrapper').classList.toggle('open', isOpen);
        this.shadowRoot.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen)
        if (isOpen) {
            this.setAttribute('open', '');
            this.focus();
        } else {
            this.removeAttribute('open');
        }
    }

    set title(text) {
        this.shadowRoot.querySelector(".tracker_header h1").innerText = text;
    }

    set content(placeholder) {

    }

    appendBlock() {
        
    }

    close() {
        this.open = false;
    }
}

customElements.define('tracker-menu', TrackerMenu);

/* Test code */
const trackerButton = document.getElementById("tracker_button");
trackerButton.addEventListener("click", () => {
    document.querySelector('tracker-menu').toggle();
});
