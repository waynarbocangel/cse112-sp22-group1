import {router} from "../router.js";
import {navbar} from "../index.js";
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

			#wrapper{
				padding-bottom: 0;
				width: calc(100% - 70px);
				user-select: none; 
				-webkit-user-select: none;
				-moz-user-select: none; 
				-khtml-user-select: none; 
				-ms-user-select: none;
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
				border-top: 1px solid rgba(0,0,0,0.08);
			}

			#editorIcons{
				position: relative;
				display: inline;
				float: left;
				top: calc(17.5px - ${level * 1}px);
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
		<div id="editorIcons" class="paragraphIcons"><img src="../public/resources/plusIcon.png" class="unfocusedIcons"/><img src="../public/resources/sixDotIcon.png" class="unfocusedIcons"/></div>
        <div id="wrapper">
			<div id="titleWrapper" class="${(level > 1) ? "singleItemWrapper" : ""}">
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
    }

    connectedCallback() {
		this.removeAttribute('closed');
        this.button.addEventListener("click", () => { this.toggleItems(); });
		this.header.addEventListener("click", () => { this.navigateToObject(); })
		// this.contentWrapper.style.display = 'none';
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

	navigateToObject() {
		router.setState(`#${this.item.objectType}~${this.item.id}`, false);
		navbar.open = false;
	}

    display() {
        this.wrapper.classList.toggle('closed', true);
    }

    hide() {
        this.wrapper.classList.toggle('closed', false);
    }

    toggleItems() {
        this.wrapper.classList.toggle('closed');

        if (this.wrapper.classList.contains('closed')) {
            this.display();
        } else {
            this.hide();
        }
    }
}

window.customElements.define('drop-down', DropdownBlock);
