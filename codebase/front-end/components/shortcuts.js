// shortcuts sidemenu component

export class ShortcutPage extends HTMLElement {
    static get observedAttributes() {
        return ['open'];
    }

    constructor(title) {
        super();
        
        this.attachShadow({ mode: 'open'});
        this.close = this.close.bind(this);
        
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
                background-color: var(--shortcuts-background-color); /* #2B2D42 */
                color: var(--shortcuts-foreground-color);
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
            
            .shortcuts_header {
                display: flex;
                justify-content: flex-start;

                margin: 0 20px;
                height: 75px;
				border-bottom: solid var(--shortcuts-border-color); /*rgba(157, 148, 241, 0.7);*/
            }
            
            .shortcuts_header h1 {
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

            .shortcuts_menu {
                overflow-y: auto;
            }

            .page_img {
                float: left;
            }

            .page_nav_info {
                padding: 2%;
            }
        </style>
        <div class="wrapper closed">
        <div class="shortcuts_header">
                <h1 class="shortcuts_h1">Help</h1>
        </div>
        <div>
            <h2 class="help_nav">Page navigation</h2>
            <ul>
                <li class="page_nav_info">
                    <img src="../public/resources/home_icon" class="page_img" />
                    <span class="page_text">
                        return home
                    </span>
                </li>
            </ul>
        </div>

        <div>
            <h2 class="help_nav">Text editor</h2>
            <ul>
                <li><strong>#, /h1</strong> header 1</li>
                <li><strong>##, /h2</strong> header 2</li>
                <li><strong>###, /h3</strong> header 2</li>
                <li><strong>/note, -</strong> creates a bullet point</li>
                <li><strong>/event</strong> creates an event, includes space for time and date; can be clicked to cross out</li>
                <li><strong>/task </strong> creates a task with a checkbox</li>
                <li><strong>/futurelog </strong> creates a new future log</li>
                <li><strong>/monthlylog</strong> creates a new monthly log</li>
                <li><strong>/dailylog</strong> creates a new dailylog</li>
                <li><strong>/collection</strong> creates a nrew collection</li>
            </ul>
        </div>
    </div>
    `;

    this.closeButton = this.shadowRoot.querySelector(".close_button");
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

    close() {
        this.open = false;
    }
}

customElements.define('shortcuts', ShortcutPage);