const themeColors = {
    darkmode: {
        "--border-color": "#292929",
        "--content-foreground-color": "#D4D4D4",
        "--content-background-color": "#2e3030",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-background-color": "#1e2020",
        "--tracker-border-color": "#404040",
        "--navbar-foreground-color": "#FFFFFF",
        "--navbar-background-color": "#1e2020",
        "--icon-filter": "invert()",
    },

    lightmode: {
        "--border-color": "#F2F2F2",
        "--content-foreground-color": "#000000",
        "--content-background-color": "#FFFFFF",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-border-color": "#48486f",
        "--tracker-background-color": "#2B2D42",
        "--navbar-foreground-color": "#FFFFFF",
        "--navbar-background-color": "#F7F2EC",
        "--icon-filter": "",
    },

    highcontrast: {
        "--border-color": "#F2F2F2",
        "--content-foreground-color": "#FFFFFF",
        "--content-background-color": "#000000",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-background-color": "#0000FF",
        "--tracker-border-color": "#FFFFFF",
        "--navbar-foreground-color": "#FFFFFF",
        "--navbar-background-color": "#008F00",
        "--icon-filter": "invert()",
    },

    theme4: {
        "--border-color": "#F2F2F2",
        "--content-foreground-color": "#000000",
        "--content-background-color": "#FFFFFF",
        "--tracker-foreground-color": "#FFFFFF", //"#9FEDD7",
        "--tracker-background-color": "#026670",
        "--tracker-border-color": "#7671B6",
        "--navbar-foreground-color": "#FEF9C7",
        "--navbar-background-color": "#FCE181",
        "--icon-filter": "",
    },

    theme5: {
        "--border-color": "#8E8D8A",
        "--content-foreground-color": "#000000",
        "--content-background-color": "#EAE7DC",

        "--tracker-foreground-color": "#FFFFFF", //"#9FEDD7",
        "--tracker-background-color": "#48131A",
        "--tracker-border-color": "#6F474E",

        "--navbar-foreground-color": "#000000",
        "--navbar-background-color": "#D8C3A5",
        "--icon-filter": "",
    },

    theme6: {
        "--border-color": "#34375c",
        "--content-foreground-color": "#AAABB8",
        "--content-background-color": "#25274D",

        "--tracker-foreground-color": "#AAABB8",
        "--tracker-background-color": "#283D6C", //283d6c
        "--tracker-border-color": "#29648A",

        "--navbar-foreground-color": "#000000",
        "--navbar-background-color": "#464866",
        "--icon-filter": "invert()",
    },
}

/*
<form id="theme">
    <input type="radio" name="themeradio" id="darkmode">     <label for="darkmode">Darkmode</label></input><br>
    <input type="radio" name="themeradio" id="lightmode" checked>    <label for="lightmode">Noobmode</label></input><br>
    <input type="radio" name="themeradio" id="highcontrast"> <label for="highcontrast">High Contrast</label></input><br>
    <input type="radio" name="themeradio" id="theme4">       <label for="theme4">Theme 4</label></input><br>
    <input type="radio" name="themeradio" id="theme5">       <label for="theme5">Theme 5</label></input><br>
    <input type="radio" name="themeradio" id="theme6">       <label for="theme6">Theme 6</label></input><br>
</form>
*/

export class SettingsMenu extends HTMLElement {
    static get observedAttributes() {
        return ['open'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
                    background-color: rgba(0,0,0,0);
                    cursor: pointer;
                }

                .menu {
                    display: flex;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 50%;
                    height: 50%;
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
                    flex: 1;
                }

                h1 {
                    text-align: center;
                    flex: 1;
                }

                .header {
                    display: flex;
                    align-items: center;
                    height: 75px;
                    margin-left: 10px;
                    margin-right: 10px;
                    border-bottom: 2px solid var(--border-color);
                }

                ::slotted(settings-tab[selected]) {
                    background-color: var(--content-background-color);
                }
                
                ::slotted(settings-tab:hover) {
                    background-color: var(--settings-hover-color);
                }

                #theme {
                    margin: 20px;
                }

                input {
                    line-height: 18px;
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
                            <button id="close"> X </button>
                        </div>

                        <div class="options">
                            <slot name="settings-panel"></slot>
                        </div>
                    </div>
                </div>
            </div>
        `;

        let themeRadios = this.shadowRoot.querySelectorAll("input[type=radio]");
        for (let themeRadio of themeRadios) {
            themeRadio.addEventListener('change', () => this.updateTheme(themeRadio.id));
        }

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
        this.hide();

        Promise.all([customElements.whenDefined('settings-tab'), customElements.whenDefined('settings-panel')])
            .then(() => this.linkPanels());

        this.addEventListener('click', event => {
            console.log('clicked');
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

    updateTheme(theme) {
        let root = document.documentElement;

        for (let key in themeColors[theme]) {
            root.style.setProperty(key, themeColors[theme][key]);
        }
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(isOpen) {
        this.classList.toggle('open', isOpen);
        this.setAttribute('aria-hidden', !isOpen)
        if (isOpen) {
            this.style.display = '';
            this.setAttribute('open', 'true');
            this.focus();
        } else {
            this.style.display = 'none';
            this.removeAttribute('open');
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
