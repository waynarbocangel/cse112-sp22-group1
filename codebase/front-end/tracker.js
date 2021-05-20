// tracker side menu web component
class Tracker extends HTMLElement {

    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML = `
          <style>
          </style>
          <article class="content">
          </article>
          `;

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

}

customElements.define('tracker', Tracker);