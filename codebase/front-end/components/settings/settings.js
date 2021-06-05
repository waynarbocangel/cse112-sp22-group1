import {ThemePanel} from './themePanel.js';
import {GeneralSettingsPanel} from './generalSettingsPanel.js';
import {fade, unfade} from '../../transitions.js';


/* Settings Menu

    To add a tab to the menu:
    
    Add a <settings-tab> with the 'slot' and 'title' attributes set:

        <settings-tab slot="settings-tab" title="YOUR TITLE">

            Add an <img> with slot="icon"
                <img slot="icon" src="public/resources/YOUR_IMG.png">
        </settings-tab>

    Add a <settings-panel> tag right after the <settings-tab>:

        <settings-panel slot="settings-panel">
            
            Inside this tag, add your web component. See themePanel.js for an example.
            <your-panel></your-panel>
        </settings-panel>
*/
const settingsTemplate = `
	<style>
		settings-tab {
			cursor: pointer;
		}
	</style>
    <settings-tab slot="settings-tab" title="Settings">
        <img slot="icon" src="public/resources/generalSettingsIcon.png">
    </settings-tab>
    <settings-panel slot="settings-panel">
        <general-settings-panel>
    </settings-panel>

    <settings-tab slot="settings-tab" title="Theme">
        <img slot="icon" src="public/resources/palette.png">
    </settings-tab>
    <settings-panel slot="settings-panel">
        <theme-panel></theme-panel>
    </settings-panel>
`;

export class SettingsMenu extends HTMLElement {
    static get observedAttributes() {
        return ['open'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.outerHTML
        this.shadowRoot.innerHTML = `
            <style>
                @font-face {
                    font-family:"SF-Pro";
                    src: url("./public/fonts/SF-Pro.ttf");
                }

                :host {
                    font-family: "SF-Pro";
                }

                .overlay {
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background-color: #0000007F;
                    z-index: 10;
                    user-select: none;
                }

                #close {
                    color: var(--content-foreground-color);

                    width: 40px;
                    height: 40px;


                    border: none;
                    background-color: transparent;
                    cursor: pointer;
                }

				#dismiss {
					filter: var(--icon-filter);
					width: 20px;
					opacity: 0.5;
					transition: 0.2s;
				}

				#dismiss:hover {
					opacity: 1;
					transition: 0.2s;
				}

                .menu {
                    display: flex;
                    position: absolute;
					border-radius: 10px;
					overflow: hidden;
                    top: 50%;
                    left: 50%;
                    width: 80%;
                    height: 80%;
					max-width: 800px;
					max-height: 800px;
                    transform: translate(-50%,-50%);
                    -ms-transform: translate(-50%,-50%);
                    background-color: var(--content-background-color);
                }

                .sidebar {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    left: 0;
                    top: 0;
                    bottom: 0;
                    background-color: var(--navbar-background-color);
                }

                .content {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .options {
                    display: flex;
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                }

                h1 {
                    text-align: center;
                    flex: 1;
                }

                .header {
                    display: flex;
                    align-items: center;
                    height: 60px;
                    margin-left: 10px;
                    margin-right: 10px;
                    border-bottom: 2px solid var(--border-color);
                }

                ::slotted(settings-tab[selected]) {
                    background-color: var(--content-background-color);
                }
                
                ::slotted(settings-panel) {
                    flex: 1;
                    overflow-y: auto;
                }
            </style>

            <div class="overlay">
                <div class="menu">
                    <div class="sidebar">
                        <slot name="settings-tab"></slot>
                    </div>

                    <div class="content">
                        <div class="header">
                            <h1>Settings</h1>
                            <button id="close"><img id="dismiss" src="../../public/resources/xIcon.png" /></button>
                        </div>

                        <div class="options">
                            <slot name="settings-panel"></slot>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById("close").addEventListener('click', () => { this.hide(); });

        this.tabSlot = this.shadowRoot.querySelector('slot[name=settings-tab]');
        this.panelSlot = this.shadowRoot.querySelector('slot[name=settings-panel]');

        this.changeTab = this.changeTab.bind(this);
        this.linkPanels = this.linkPanels.bind(this);

        this.tabSlot.addEventListener('slotchange', () => this.linkPanels);
        this.panelSlot.addEventListener('slotchange', () => this.linkPanels);

        this.headerTitle = this.shadowRoot.querySelector('.header h1');
    }

    connectedCallback() {
        this.innerHTML = settingsTemplate;

        this.classList.toggle('open', false);
        this.setAttribute('aria-hidden', true);
		
		this.style.display = "none";
		this.removeAttribute('open');

        Promise.all([customElements.whenDefined('settings-tab'), customElements.whenDefined('settings-panel')])
            .then(() => this.linkPanels());

        this.addEventListener('click', event => {
            if (event.target.getAttribute('role') !== 'tab') {
                return;
            }

            this.changeTab(event.target);
        })
    }

    tabs() {
        return this.querySelectorAll('settings-tab');
    }

    panels() {
        return this.querySelectorAll('settings-panel');
    }

    linkPanels() {
        let tabs = this.tabs();

        if (tabs.length === 0) return;

        let selectedTab = undefined;
        for (let tab of tabs) {
            let panel = tab.nextElementSibling;
            tab.setAttribute('aria-controls', panel.id);
            panel.setAttribute('aria-labelledby', tab.id);

            if (selectedTab === undefined && tab.selected) {
                selectedTab = tab;
            }
        }

        if (selectedTab === undefined) {
            selectedTab = tabs.item(0);
        }

        this.changeTab(selectedTab);
    }

    changeTab(selectedTab) {
        let tabs = Array.from(this.tabs());
        let panels = Array.from(this.panels());

        // deselect all the tabs and hide all the panels
        tabs.forEach(tab => tab.selected = false);
        panels.forEach(panel => panel.hidden = true);

        let panelId = selectedTab.getAttribute('aria-controls');
        let selectedPanel = this.querySelector(`#${panelId}`);

        if (!selectedPanel) {
            // oh no
            console.log('panel not found');
        }

        this.headerTitle.innerText = selectedTab.getAttribute('title');

        selectedTab.selected = true;
        selectedPanel.hidden = false;
        selectedTab.focus();
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (oldVal !== newVal) {
            this[attr] = this.hasAttribute(attr);
        }
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(isOpen) {
        this.classList.toggle('open', isOpen);
        this.setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
			this.setAttribute('open', 'true');
			unfade(this, () => {
				this.focus();
			});
        } else {
			fade(this, () => {
				this.removeAttribute('open');
			});
        }
    }

    toggle() {
        this.open = !this.open;
    }

    show() {
        this.open = true;
    }

    hide() {
        this.open = false;
    }
}

customElements.define('settings-menu', SettingsMenu);

// used to generate an id
let tabId = 0;

let settingsTabTemplate = document.createElement('template');
settingsTabTemplate.innerHTML = `
<style>
    :host {
        padding: 10px;
    }

    ::slotted(img) {
        pointer-events: none;
        width: 32px;
        height: 32px;
        opacity: 50%;
        filter: var(--icon-filter);
    }

    :host(:hover) ::slotted(img) {
        opacity: 100%;
        transition: opacity 150ms;
    }
</style>

<slot name="icon"></slot>
`;

export class SettingsTab extends HTMLElement {
    static get observedAttributes() {
        return ['selected'];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(settingsTabTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.setAttribute('role', 'tab');
        if (!this.id) {
            this.id = `settings-tab-generated-${tabId++}`;
        }

        this.setAttribute('aria-selected', 'false');
    }

    attributeChangedCallback() {
        const value = this.hasAttribute('selected');
        this.setAttribute('aria-selected', value);
    }

    set selected(value) {
        value = Boolean(value);
        if (value) {
            this.setAttribute('selected', '');
        } else {
            this.removeAttribute('selected');
        }
    }

    get selected() {
        return this.hasAttribute('selected');
    }
}
customElements.define('settings-tab', SettingsTab);

let panelId = 0;

export class SettingsPanel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('role', 'tabpanel');
        if (!this.id) {
            this.id = `settings-panel-generated-${panelId++}`;
        }
    }
}
customElements.define('settings-panel', SettingsPanel);
