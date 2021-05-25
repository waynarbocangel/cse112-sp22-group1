import { createEditor } from './blockController.js';
const tabspace = 3;

export class DropdownBlock extends HTMLElement {
    constructor(title, item, level=1) {
        super();
        this.currentHeight = 5;
        this.item = item;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
		<style>
			@font-face {
				font-family:"SF-Pro";
				src: url("./public/fonts/SF-Pro.ttf");
			}
			#title{
				display: inline-block;
				font-family: "SF-Pro";
				font-size: calc(20pt - ${level * 2}pt);
			}

            #arrow {
                width: 12px;
                height: 12px;
				background-color: rgba(0,0,0,0);
                border: none;
            }

            #arrow img {
                max-width: 18px;
                max-height: 18px;
            }
            :not(.closed) #arrow img {
                transform: rotate(0deg);
                transition: 0.2s;
            }

            .closed #arrow img {


                transform: rotate(90deg);
                transition: 0.2s;
            }

            #contentWrapper {
                position: relative;
                left: ${tabspace}em;
                width: calc(100% - ${tabspace * level}em);
                overflow-x: none;
            }

		</style>
        <div id="wrapper">
            <h1 id="title"></h1>
            <button id="arrow"><img src="../public/resources/right-chevron.png" /></button>
            <div id="contentWrapper"></div>
        </div>
        `;
        this.button = this.shadowRoot.getElementById("arrow");
        this.wrapper = this.shadowRoot.getElementById("wrapper");
        this.contentWrapper = this.shadowRoot.getElementById("contentWrapper");
        this.header = this.shadowRoot.querySelector("h1");

        this.toggleItems = this.toggleItems.bind(this);
        this.hide = this.hide.bind(this);
        this.display = this.display.bind(this);

        this.title = title;
    }

    connectedCallback() {
        this.closed = true;
        this.button.addEventListener("click", () => { this.toggleItems(); });
    }

    set title(title) {
        this.header.innerText = title;
    }

    get closed() {
        return this.wrapper.hasAttribute('closed');
    }

    set closed(isClosed) {
        if (isClosed) {
            this.hide();
        } else {
            this.display();
        }
    }

    display() {
        this.wrapper.classList.toggle('closed', true);

        for (let child of this.contentWrapper.children) {
            child.style.display = '';
        }
    }

    hide() {
        this.wrapper.classList.toggle('closed', false);

        for (let child of this.contentWrapper.children) {
            child.style.display = 'none';
        }
    }

    toggleItems() {
        this.wrapper.classList.toggle('closed');

        if (this.wrapper.classList.contains('closed')) {
            for (let child of this.contentWrapper.children) {
                child.style.display = '';
            }
        } else {
            for (let child of this.contentWrapper.children) {
                child.style.display = 'none';
            }
        }
    }
}

customElements.define('drop-down', DropdownBlock);
