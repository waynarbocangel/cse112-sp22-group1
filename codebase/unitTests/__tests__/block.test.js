import {TextBlock} from '../components/block.js'
import {Controller} from '../components/blockController.js'

describe('Testing the functionality of text block', () => {
    
     
      test('Check classlist property is updated correctly when changed to header 1', ()=>{
          let controller = new Controller(null, null, null);
          let textBlock = new  TextBlock(controller, null, (success) => {
            console.log(textBlock.editorIcons.classList.length());
            textBlock.setupHeader1();
            console.log(textBlock.editorIcons.classList.length());
            assert(textBlock.shadowRoot.getElementById('textBlock').classList.contains('header1')).equals(true);
          });
          
      });

      test('Check classlist property is updated correctly when changed to header 2', ()=>{
        let controller = new Controller(null, null, null);
        let textBlock = new  TextBlock(controller, null, (success) => {
          console.log(textBlock.editorIcons.classList.length());
          textBlock.setupHeader1();
          console.log(textBlock.editorIcons.classList.length());
          assert(textBlock.shadowRoot.getElementById('textBlock').classList.contains('header2')).equals(true);
        });
        
    });
    test('Check classlist property is updated correctly when changed to header 3', ()=>{
        let controller = new Controller(null, null, null);
        let textBlock = new  TextBlock(controller, null, (success) => {
          console.log(textBlock.editorIcons.classList.length());
          textBlock.setupHeader1();
          console.log(textBlock.editorIcons.classList.length());
          assert(textBlock.shadowRoot.getElementById('textBlock').classList.contains('header3')).equals(true);
        });
        
    });
  });

  