import * as localStorage from "../../localStorage/userOperations.js";
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
        "--icon-filter": "invert()"
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
        "--icon-filter": ""
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
        "--icon-filter": "invert()"
    },

    theme4: {
        "--border-color": "#F2F2F2",
        "--content-foreground-color": "#000000",
        "--content-background-color": "#FFFFFF",
        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-background-color": "#026670",
        "--tracker-border-color": "#7671B6",
        "--navbar-foreground-color": "#FEF9C7",
        "--navbar-background-color": "#FCE181",
        "--icon-filter": ""
    },

    theme5: {
        "--border-color": "#8E8D8A",
        "--content-foreground-color": "#000000",
        "--content-background-color": "#EAE7DC",

        "--tracker-foreground-color": "#FFFFFF",
        "--tracker-background-color": "#48131A",
        "--tracker-border-color": "#6F474E",

        "--navbar-foreground-color": "#000000",
        "--navbar-background-color": "#D8C3A5",
        "--icon-filter": ""
    },

    theme6: {
        "--border-color": "#34375c",
        "--content-foreground-color": "#E3E3E8",
        "--content-background-color": "#1A1A3D",
        "--tracker-foreground-color": "#E3E3E8",
        "--tracker-background-color": "#25274D",
        "--tracker-border-color": "#464866",
        "--navbar-foreground-color": "#000000",
        "--navbar-background-color": "#25274D",


        "--content-placeholder-color": "#505b84",

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
                height: 100%;
            }

            form {
                margin: 0;
				display: flex;
                flex-flow: row wrap;
				justify-content: space-evenly;
				align-content: center;
                height: 100%;
            }

			label {
				text-align: center;
				font-size: 16pt;
				margin-bottom: 30px;
				cursor: pointer;
			}

			.themeImg{
				width: 250px;
				margin-top: 10px;
				border-radius: 5px;
				transition: 0.2s;
			}

			input[type="radio"]{
				display: none;
			}

			input[type="radio"]:checked + img.themeImg{
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
