// Puppeteer

describe('Basic user flow for SPA ', () => {
    
    beforeAll(async () => {
      await page.goto('http://localhost:8080');
      await page.waitForTimeout(50000);
    });

    // Testing test
    test(' 1 and 1', ()=>{
      expect(1).toBe(1);
    });

    // Test 1
    it('Test1: Initial Home Page - Check Home Page', async () => {

      // Remember to change this after deploy
      expect(page.url()).toBe("http://localhost:8080/login/");
      
    });

    // Test 2
    it('Create New User Fails', async () => {
      
      // check that alert shows & url
    
      
    });

    // Test 3
    it('Log in', async () => {
      // fill in fields, login, check link

    });


 
    test('Create Future Log', () => {
      // TODO
    });

    test ('Create Daily Log', () => {

    });

    test ('Change Theme', () => {

    });

  


});