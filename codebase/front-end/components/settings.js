const themeColors = {
    darkmode: {
        "--border-color":             "#292929",
        "--content-foreground-color": "#D4D4D4",
        "--content-background-color": "#1E1E1E",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-background-color": "#2B2D42",
        "--navbar-foreground-color":  "#FFFFFF",
        "--navbar-background-color":  "#333333",
        "--icon-filter": "invert()",
    },

    lightmode: {
        "--border-color":             "#F2F2F2",
        "--content-foreground-color": "#000000",
        "--content-background-color": "#FFFFFF",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-background-color": "#2B2D42",
        "--navbar-foreground-color":  "#FFFFFF",
        "--navbar-background-color":  "#F7F2EC",
        "--icon-filter": "",
    }
}

export class SettingsMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                #overlay {
                    position: fixed;
                    display: block;
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
                    position: absolute;
                    color: var(--content-foreground-color);

                    width: 40px;
                    height: 40px;

                    top: 10px;
                    right: 10px;

                    border: none;
                    background-color: rgba(0,0,0,0);
                    cursor: pointer;
                }

                #menu {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 50%;
                    height: 50%;
                    transform: translate(-50%,-50%);
                    -ms-transform: translate(-50%,-50%);
                    background-color: var(--content-background-color);
                }

                #header {
                    text-align: center;
                    margin-left: 10px;
                    margin-right: 10px;
                    border-bottom: 2px solid var(--border-color);
                }
            </style>

            <div id="overlay">
                <div id="menu">
                    <div id="header">
                        <h1> Settings </h1>
                        <button id="close"> X </button>
                    </div>
                    
                    <form id="theme">
                        <input type="radio" name="themeradio" id="darkmode"> <label>Darkmode</label></input><br>
                        <input type="radio" name="themeradio" id="lightmode"> <label>Noobmode</label></input><br>
                    </form>
                </div>
            </div>
        `;

        this.darkmodeButton = this.shadowRoot.querySelector("#darkmode");
        this.darkmodeButton.addEventListener('change', () => this.updateTheme('darkmode'));
        this.lightmodeButton = this.shadowRoot.querySelector("#lightmode");
        this.lightmodeButton.addEventListener('change', () => this.updateTheme('lightmode'));

        this.shadowRoot.querySelector("#close").addEventListener('click', () => {this.close(); });
    }

    updateTheme(theme) {
        let root = document.documentElement;

        for (let key in themeColors[theme]) {
            root.style.setProperty(key, themeColors[theme][key]);
        }
    }

    close() {
        this.style.display = 'none';
    }

    open() {
        this.style.display = '';
    }
}

customElements.define('settings-menu', SettingsMenu);