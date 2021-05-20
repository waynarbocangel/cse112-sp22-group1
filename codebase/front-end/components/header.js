class Header extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
        <style>

        </style>
        <h1 class="title_page"></h1>
        `;

    // create a shadow root for this web component
    this.attachShadow({ mode: 'open' })
    // attach cloned content of template to shadow DOM 
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}