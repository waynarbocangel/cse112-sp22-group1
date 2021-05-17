let textBlock = document.getElementById("textBlock");

textBlock.addEventListener("input",() =>{
	let content = textBlock.innerHTML;
	// console.log(content);
	if (content == "#&nbsp;"){
		while(textBlock.classList.length > 0){
			textBlock.classList.remove(textBlock.classList[0]);
		}
		textBlock.setAttribute("placeholder", "Header 1");
		textBlock.classList.add("header1");
		textBlock.innerHTML = "";
	} else if (content == "##&nbsp;"){
		while(textBlock.classList.length > 0){
			textBlock.classList.remove(textBlock.classList[0]);
		}
		textBlock.setAttribute("placeholder", "Header 2");
		textBlock.classList.add("header2");
		textBlock.innerHTML = "";
	} else if (content == "-&nbsp;"){
		while(textBlock.classList.length > 0){
			textBlock.classList.remove(textBlock.classList[0]);
		}
		textBlock.setAttribute("placeholder", 'Type "/" to create a block');
		textBlock.innerHTML = "<ul><li class='notesList' placeholder='Note'></li></ul>";
	} else if (content.includes("<ul><li")){
		if (textBlock.textContent == ""){
			textBlock.innerHTML = "<ul><li class='notesList' placeholder='Note'></li></ul>";
		}
	}
});

textBlock.onkeydown = (e)=>{
	var key = e.keyCode || e.charCode;

	if (key == 8 || key == 46){
		// console.log(textBlock.innerHTML);
		if(textBlock.innerHTML == "" || textBlock.innerHTML == '<ul><li class="notesList" placeholder="Note"></li></ul>' || textBlock.innerHTML == "<ul><li><br></li></ul>"){
			while(textBlock.classList.length > 0){
				textBlock.classList.remove(textBlock.classList[0]);
			}
			textBlock.setAttribute("placeholder", 'Type "/" to create a block');
			textBlock.innerHTML = "";
		}
	} else if (key == 32){
		let content = textBlock.innerHTML;
		console.log(content);
		if (content == "/h1"){
			while(textBlock.classList.length > 0){
				textBlock.classList.remove(textBlock.classList[0]);
			}
			textBlock.setAttribute("placeholder", "Header 1");
			textBlock.classList.add("header1");
			textBlock.innerHTML = "";
			e.preventDefault();
		} else if (content == "/h2"){
			while(textBlock.classList.length > 0){
				textBlock.classList.remove(textBlock.classList[0]);
			}
			textBlock.setAttribute("placeholder", "Header 2");
			textBlock.classList.add("header2");
			textBlock.innerHTML = "";
			e.preventDefault();
		} else if (content == "/note"){
			while(textBlock.classList.length > 0){
				textBlock.classList.remove(textBlock.classList[0]);
			}
			textBlock.setAttribute("placeholder", 'Type "/" to create a block');
			textBlock.innerHTML = "<ul><li class='notesList' placeholder='Note'></li></ul>";
		}
	} else if (key == 13) {
        let newBlock = document.createElement("text-block");

        document.getElementsByTagName('main')[0].appendChild(newBlock);
        console.log("WHAT");
    }

};