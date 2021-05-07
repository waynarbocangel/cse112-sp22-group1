window.onload = () => {
    let converter = new showdown.Converter();
    let textarea = document.getElementById('text');
    let markdownArea = document.getElementById('markdown');

    let convertTextAreatoMarkdown = () => {
        let markdownText = textarea.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    }

    textarea.addEventListener('input', convertTextAreatoMarkdown);

    convertTextAreatoMarkdown();
}