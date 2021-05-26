class LogList extends HTMLElement{
    constructor(){
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <div> </div>


`;


this.attachShadow({ mode: 'open'})
this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    get categories() {
        return this.getAttribute('categories');
    }
    set categories(categories){
        for (let category of categories){
            let log = document.createElement("log-page");
            log.category = category;
            this.shadowRoot.querySelector("div").appendChild(log);
        }
        this.setAttribute('categories', categories);
    }

}

window.customElements.define('log-list', LogList)