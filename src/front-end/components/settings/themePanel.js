import * as localStorage from "../../localStorage/userOperations.js";
const themeColors = {
    darkmode: {
        "--border-color": "#4d4d4d",
        "--content-background-color": "#2e3030",
        "--content-foreground-color": "#D4D4D4",

        "--tracker-background-color": "#1e2020",
        "--tracker-foreground-color": "#d4d4d4",
        "--tracker-border-color": "#404040",

        "--navbar-background-color": "#1e2020",
        "--navbar-foreground-color": "#d4d4d4",

        "--dropdown-background-color": "#1e2020",
        "--dropdown-foreground-color": "#d4d4d4",
        "--dropdown-hover-color": "#474a4a",

        "--icon-filter": "invert()"
    },

    lightmode: {
        "--border-color": "#F2F2F2",
        "--content-background-color": "#FFFFFF",
        "--content-foreground-color": "#000000",

        "--tracker-background-color": "#2B2D42",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-border-color": "#48486f",

        "--navbar-background-color": "#F7F2EC",
        "--navbar-foreground-color": "#FFFFFF",

        "--dropdown-background-color": "#f7f2ec",
        "--dropdown-foreground-color": "#ffffff",
        "--dropdown-hover-color": "#dfdcd8",

        "--icon-filter": ""
    },

    highcontrast: {
        "--border-color": "#F2F2F2",
        "--content-background-color": "#000000",
        "--content-foreground-color": "#FFFFFF",

        "--tracker-background-color": "#0000FF",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-border-color": "#FFFFFF",

        "--navbar-background-color": "#008F00",
        "--navbar-foreground-color": "#FFFFFF",

        "--dropdown-background-color": "#000000",
        "--dropdown-foreground-color": "#ffffff",
        "--dropdown-hover-color": "#FF00FF",

        "--icon-filter": "invert()"
    },

    theme4: {
        "--border-color": "#F2F2F2",
        "--content-background-color": "#FFFFFF",
        "--content-foreground-color": "#000000",

        "--tracker-background-color": "#026670",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-border-color": "#1d7d86",

        "--navbar-background-color": "#FCE181",
        "--navbar-foreground-color": "#fed442",

        "--dropdown-background-color": "#FFFFFF",
        "--dropdown-foreground-color": "#000000",
        "--dropdown-hover-color": "#efeded",

        "--icon-filter": ""
    },

    theme5: {
        "--border-color": "#8E8D8A",
        "--content-background-color": "#EAE7DC",
        "--content-foreground-color": "#000000",

        "--tracker-background-color": "#48131A",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-border-color": "#6F474E",

        "--navbar-background-color": "#D8C3A5",
        "--navbar-foreground-color": "#000000",

        "--dropdown-background-color": "#D8C3A5",
        "--dropdown-foreground-color": "#000000",
        "--dropdown-hover-color": "#c8ae89",

        "--icon-filter": ""
    },

    theme6: {
        "--border-color": "#34375c",
        "--content-background-color": "#1A1A3D",
        "--content-foreground-color": "#E3E3E8",

        "--tracker-background-color": "#25274D",
        "--tracker-foreground-color": "#E3E3E8",
        "--tracker-border-color": "#464866",

        "--navbar-background-color": "#25274D",
        "--navbar-foreground-color": "#000000",

        "--content-placeholder-color": "#505b84",

        "--dropdown-background-color": "#D8C3A5",
        "--dropdown-foreground-color": "#000000",
        "--dropdown-hover-color": "#c8ae89",

        "--icon-filter": "invert()"
    }
}

export class ThemePanel extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <style>
            @font-face {
                font-family:"SF-Pro";
                src: url("./public/fonts/SF-Pro.ttf");
            }

            :host {
                display: block;
                font-family: "SF-Pro";
            }

            form {
                margin: 0;
				display: flex;
                flex-flow: row wrap;
				justify-content: space-evenly;
				align-content: center;
            }

			label {
				text-align: center;
				font-size: 16pt;
				margin-bottom: 30px;
				cursor: pointer;
			}

			.themeImg {
				width: 250px;
				margin-top: 10px;
				border-radius: 5px;
				transition: 0.2s;
			}

			input[type="radio"] {
				display: none;
			}

			input[type="radio"]:checked + img.themeImg {
				box-shadow: 0 0 0 8px var(--content-foreground-color);
				transition: 0.2s;
			}

        </style>

        <form id="theme">
            <label>Cool Dark <br />
                <input type="radio" name="themeradio" id="darkmode" /><img class="themeImg" src="../../public/resources/coolDark.png" />
            </label>
            <label>Minimal Light <br />
                <input type="radio" name="themeradio" id="lightmode" /><img class="themeImg" src="../../public/resources/minimalLight.png" />
            </label>
            <label>High Contrast <br />
                <input type="radio" name="themeradio" id="highcontrast" /><img class="themeImg" src="../../public/resources/highContrast.png" />
            </label>
            <label>Snazzy Light <br />
                <input type="radio" name="themeradio" id="theme4" /><img class="themeImg" src="../../public/resources/snazzyLight.png" />
            </label>
            <label>Classy Light <br />
                <input type="radio" name="themeradio" id="theme5" /><img class="themeImg" src="../../public/resources/classyLight.png" />
            </label>
            <label>Night Owl <br />
                <input type="radio" name="themeradio" id="theme6" /><img class="themeImg" src="../../public/resources/nightOwl.png" />
            </label>
        </form>
        `;
        this.themeRadios = this.shadowRoot.querySelectorAll("input[type=radio]");
    }

	connectedCallback () {
		for (let themeRadio of this.themeRadios) {
            themeRadio.addEventListener("change", () => {
				localStorage.updateTheme(themeRadio.id, true, (err) => {
					console.log("here");
					if (err) {
						console.log(err);
					} else {
						console.log("here");
						this.updateTheme(themeRadio.id);
					}
				});

			});
        }
		localStorage.readUser((err, user) => {
			if (err) {
				console.log(err);
			} else {
				let pickedTheme = this.shadowRoot.getElementById(user.theme);
				pickedTheme.toggleAttribute("checked", true);
				this.updateTheme(user.theme);
			}
		});
	}

    updateTheme (theme) {
        let root = document.documentElement;
		for (let key in themeColors[theme]) {
			if (key !== null) {
				root.style.setProperty(key, themeColors[theme][key]);
			}
		}
    }
}

customElements.define("theme-panel", ThemePanel);
