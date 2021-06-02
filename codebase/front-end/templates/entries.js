const template = document.createElement('template');

template.innerHTML = `
<html>
<head>
    <style>
        @font-face {
            font-family:"SF-Pro";
            src: url("./public/fonts/SF-Pro.ttf");
        }

        body {
            width: 540px;
            margin: auto;
            font-family: 'Handlee', cursive;  
            background: #666;
            color: #666;
        }
        
        article {
            margin: 50px auto;
            padding: 20px 40px;
            position: relative;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            background: #fcf59b;
            background: -webkit-linear-gradient(top, #81cbbc, #fcf59b 2%);
            -webkit-background-size: 100% 40px;
        }
        
        article, 
        article:before,
        article:after {
            -webkit-border-bottom-left-radius: 20px 500px;
            -webkit-border-bottom-right-radius: 500px 30px;
            -webkit-border-top-right-radius: 5px 100px;
        }
        
        article:after,
        article:before {
            content: ' ';
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        }
        
        article:before {
            -webkit-transform: rotate(4deg);
            background: #fcf6a7;
        }
        
        article:after {
            -webkit-transform: rotate(-4deg);
            background: #fcf7b1;
        }
        
        p {
            line-height: 2.5em;
        }
        
        h1 {
            padding-top: 8px;
            margin-bottom: -8px;
        }
        
        article:focus {
            outline: none;
            color: black;
            border-radius:0;
        }
        
        article:focus:after,
        article:focus:before {
            content:none;
        }
        .link {
            background:  #fcf59b;
            text-align: center;
            border-radius: 10px;
            box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, .35);
        }
        .link a {
            letter-spacing: 1px;
            font-size: 1.2em;
            font-weight: bold;
            color: #121212;
        }
    </style>
    
    
    <link href='https://fonts.googleapis.com/css?family=Handlee' rel='stylesheet' type='text/css'>
    </head>
    <body>
        <article contenteditable>
        <h1>Journal entry #1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </article>

    <div class="link"> 
        <p>Created by:
            <a href="http://nikolaivanovwd.com" rel="follow"
            title="nikolaivanovwd.com" target="_blank">nikola ivanov
        </p>
</div>

    </body>
</html>
`;



export class entries extends HTMLElement {
	constructor () {
		super ();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(template.content.cloneNode(true));

	}
}

customElements.define('entries', entries);