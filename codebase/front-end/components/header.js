export class PageHeader extends HTMLElement {
    constructor() {
        super();
		fetch("./components/header.html").then((response) => {
			return response.text();
		}).then((html) => {
			let parser = new DOMParser();
			let templateFile = parser.parseFromString(html, 'text/html');
			let template = templateFile.getElementById("header");
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.appendChild(template.content.cloneNode(true));
		});
  }
}

customElements.define('page-header', PageHeader);
