import { createEditor } from './blockController.js';
const tabspace = 3;

export class DropdownBlock extends HTMLElement {
    constructor(title, item, level) {
        super();
        this.currentHeight = 5;
        this.item = item;
        this.attachShadow({ mode: 'open' });
        // if (level === undefined) { level = 1; }
        level = 1;
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
                width: 36px;
                height: 36px;
				background-color: rgba(0,0,0,0);
                border: none;
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
            <h1 id="title">${title}</h1>
            <button id="arrow"><img src="../public/resources/right-chevron.png" /></button>
            <div id="contentWrapper"></div>
        </div>
        `;
        this.button = this.shadowRoot.getElementById("arrow");
        this.wrapper = this.shadowRoot.getElementById("wrapper");
        this.contentWrapper = this.shadowRoot.getElementById("contentWrapper");

        this.toggleItems = this.toggleItems.bind(this);
        this.hide = this.hide.bind(this);
        this.display = this.display.bind(this);
    }

    connectedCallback() {
        this.closed = true;

        createEditor(this.contentWrapper, (success) => {
            console.log(success);
            for (let child of this.contentWrapper.children) {
                child.style.display = 'none';
            }
            console.log(this.closed);
            if (this.closed) {
                console.log("hiding elements");
                
            }
        });

        this.button.addEventListener("click", () => { this.toggleItems(); });
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
