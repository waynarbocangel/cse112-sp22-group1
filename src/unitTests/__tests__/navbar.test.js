

/*
beforeAll(async () => {
    await page.goto('localhost:8080');
    await page.waitForTimeout(500);
  });
*/

describe('Basic user flow for navbar ', () => {
    
    //testing toggleMenu expected = false, 
    test('toggleTracker test', ()=>{
        let navBar = new  NavBar();
       
        let expected = navBar.menu.classList.contains('menuClosed');
        navBar.toggleMenu();
        let actual = navBar.menu.classList.contains('menuClosed');
        expect(expected).not.toBe(actual);

    });

    

});