
class Header extends HTMLElement{

    constructor(){
        super();
        const template = document.createElement('template');
        template.innerHTML = `
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="./newdailylog.css">
            <div id="wrapper">  

            <div id="month">
                
                <h1>
                    <div>
                        <i id="navBarIcon" class="fa fa-bars" style="font-size: 24px;"></i>
                    </div>
                    
                    <i class="fa fa-arrow-left" ></i>
                    <span class="title"> </span>
                    <i class="fa fa-arrow-right"></i>
                    <i id="plusSign" class="fa fa-plus" style="font-size: 20px;"></i>
                </h1>
                <hr>
            </div>

            <form action="#" method="post">
                <div class="input-group">
                    <input type="text" placeholder="Search"> 
                    <!-- <input type="submit" value="search"> -->
                    <button type ="submit"> <i class="fa fa-search"></i></button><hr>	
                </div>
            </form>
            </div>

            `;
            this.attachShadow({ mode: 'open'})
            this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    get title(){
        return this.getAttribute('title');
    }

    set title(title){
        this.shadowRoot.querySelector(".title").textContent = title;
        this.setAttribute('title', title);
    }
}


window.customElements.define('my-header', Header)