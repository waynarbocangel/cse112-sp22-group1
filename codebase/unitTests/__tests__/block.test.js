import {TextBlock} from '../components/block.js'
import {Controller} from '../components/blockController.js'

describe('Testing the functionality of text block', () => {
    let controller; 
    let textBlock;
    beforeAll(()=>{
        controller = new Controller(null, null, null);
        textBlock = new  TextBlock(controller, null, function (success) {
        });
    });
     
      test('Check classlist property is updated correctly when changed to header 1', ()=>{
            textBlock.setupHeader1();
            expect(textBlock.shadowRoot.getElementById('textBlock').classList.contains('header1')).toBe(true);
      });

       test('Check classlist property is updated correctly when changed to header 2', ()=>{
            textBlock.setupHeader2();
            expect(textBlock.shadowRoot.getElementById('textBlock').classList.contains('header2')).toBe(true);
      });
    
     test('Check classlist property is updated correctly when changed to header 3', ()=>{
            textBlock.setupHeader3();
            expect(textBlock.shadowRoot.getElementById('textBlock').classList.contains('header3')).toBe(true);
      });
   
  });

  