// Puppeteer

describe('Basic user flow for SPA ', () => {
    
    beforeAll(async () => {
      await page.goto('http://localhost:8080');
      await page.waitForTimeout(5000);
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
      //const title = await page.$eval("h1", (header) => { return header.innerHTML; });
      //expect(title).toBe("My Journal");
      
      //expect(page.url()).toBe("http://localhost:8080/login/");

      
    });

    // Test 3
    it('Log in', async () => {
      //const title = await page.$eval("h1", (header) => { return header.innerHTML; });
      //expect(title).toBe("My Journal");

      //expect(page.url()).toBe("http://localhost:8080/login/");
      
      // fill in fields, login, check link

    });


    // Test Navigation
    test('Create Future Log', () => {
      // TODO
    });

    test ('Create Daily Log', () => {

    });

    test ('Change Theme', () => {

    });

    

    
    



});