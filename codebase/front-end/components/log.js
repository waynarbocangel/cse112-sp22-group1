
class LogPage extends HTMLElement{
    constructor(){
        super();
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
          a{
            color : black;
          }
        
        </style>
        <div>
          <h1><a class="day" href="#">  </a> <i class="arrow down"></i></h1>
          <ul style="padding-left: 30px;"></ul>
          <hr>	
        </div>	
`;
      
        this.attachShadow({ mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    get category() {
      return this.getAttribute('category');
    }

    set category(category){
      this.shadowRoot.querySelector(".day").textContent = category.name;
      for (let log of category.logs){
        let li = document.createElement("li");
        li.textContent = log.text;
        /* let a = document.createElement("a");
        a.textContent = log.text;
        a.href = log.link;
        li.appendChild(a); */
        this.shadowRoot.querySelector("ul").appendChild(li);
      }
      this.setAttribute('category', category);
    }
}

window.customElements.define('log-page', LogPage)



