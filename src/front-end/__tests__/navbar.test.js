import {NavBar} from '../../unitTests/components/navbar.js'


describe('Basic user flow for SPA ', () => {
    
   
    test('toggleTracker test', ()=>{
        let navBar = new  NavBar();
    
        console.log(navBar.menu.classList.contains('menuClosed'));
        navBar.toggleMenu();
        console.log(navBar.menu.classList.contains('menuClosed'));
        
    });



});