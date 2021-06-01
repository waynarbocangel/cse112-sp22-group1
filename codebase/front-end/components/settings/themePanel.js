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
        "--content-foreground-color": "#E3E3E8",
        "--content-background-color": "#1A1A3D",
        "--tracker-foreground-color": "#E3E3E8",
        "--tracker-background-color": "#25274D",
        "--tracker-border-color": "#464866",
        "--navbar-foreground-color": "#000000",
        "--navbar-background-color": "#25274D",

        /* TODO: change placeholder text colors in other themes */
        "--content-placeholder-color": "#505b84",

        "--icon-filter": "invert()",
    },
}

export class ThemePanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
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

            .option-subheading {
                text-align: left;
                margin: 0;
                border-bottom: 2px solid var(--border-color);
            }

            form {
                margin: 10px 0px;
            }

        </style>

        <div class="option-subheading">
            <h3> Color Scheme </h3>
        </div>

        <form id="theme">
            <input type="radio" name="themeradio" id="darkmode">     <label for="darkmode">Darkmode</label></input><br>
            <input type="radio" name="themeradio" id="lightmode">    <label for="lightmode">Noobmode</label></input><br>
            <input type="radio" name="themeradio" id="highcontrast"> <label for="highcontrast">High Contrast</label></input><br>
            <input type="radio" name="themeradio" id="theme4">       <label for="theme4">Theme 4</label></input><br>
            <input type="radio" name="themeradio" id="theme5">       <label for="theme5">Theme 5</label></input><br>
            <input type="radio" name="themeradio" id="theme6">       <label for="theme6">Theme 6</label></input><br>
        </form>
        `;
        this.themeRadios = this.shadowRoot.querySelectorAll("input[type=radio]");
    }

	connectedCallback() {
		for (let themeRadio of this.themeRadios) {
            themeRadio.addEventListener('change', () => this.updateTheme(themeRadio.id));
        }
		localStorage.readUser((err, user) => {
			if (!err){
				let pickedTheme = this.shadowRoot.getElementById(user.theme);
				pickedTheme.checked = true;
				this.updateTheme(user.theme);
			} else {
				console.log(err);
			}
		});
	}

    updateTheme(theme) {
        let root = document.documentElement;
		localStorage.updateTheme(theme);
        for (let key in themeColors[theme]) {
            root.style.setProperty(key, themeColors[theme][key]);
        }
    }
}

customElements.define('theme-panel', ThemePanel);