class TextBlock extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        template.innerHTML =
            `<style>

            </style>`;

        this.attachShadow({ mode: 'open' })
        
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    get block() {
        return this.getAttribute('textBlock');
    }

    set block(test) {
        /*
         * TODO: setting properties of component go here
        */
        let new_block = this.shadowRoot.querySelector('.new-block');
        let text = this.shadowRoot.querySelector('textBlock');

        console.log("NEW" + textBlock.innerHTML);

        new_block.appendChild(text);
    }
}

customElements.define('text-block', TextBlock);