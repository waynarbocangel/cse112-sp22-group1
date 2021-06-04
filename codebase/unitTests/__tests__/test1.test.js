import {NavBar} from '../components/navbar.js'




describe('Basic user flow for SPA ', () => {
    

  /*
    beforeAll(async () => {
      await page.goto('localhost:8080');
      await page.waitForTimeout(500);
    });
*/
   
    test('toggleTracker test', ()=>{
        let navBar = new  NavBar();
    
        console.log(navBar.menu.classList.contains('menuClosed'));
        navBar.toggleMenu();
        console.log(navBar.menu.classList.contains('menuClosed'));
        
    });



});