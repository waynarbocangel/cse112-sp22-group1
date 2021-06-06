// Puppeteer

describe('Basic user flow for SPA ', () => {
    
    beforeAll(async () => {
      await page.goto('http://localhost:8080');
      await page.waitForTimeout(500);
    });

    
    // Test 1
    it('Test1: Initial Home Page - Check Home Page', async () => {
      // Remember to change this after deploy
      expect(page.url()).toBe("http://localhost:8080/login/");
      
    });

    // Test 2
    it('Create New User Fails For Existing User', async () => {
      await page.$eval('#email-field', el => el.value = 'test30');
      await page.$eval('#password-field', pw => pw.value = 'qwert');
      page.click('login-form-create');

      expect(page.url()).toBe("http://localhost:8080/login/");
    });

    
    // Test 3
    it('Log in', async () => {
      // fill in fields, click login, check link

      /*
      document.getElementById("email-field").value = "test30";
      document.getElementById("password-field").value = "qwert";
      await page.click("login-form-submit");
      */
    
      await page.goto('http://localhost:8080');
      //await page.click("login-form-submit");
      expect(page.url()).toBe("http://localhost:8080/");

    });

    /*

 
    test('Create Future Log', () => {
      // TODO
    });

    test ('Create Daily Log', () => {

    });

    test ('Change Theme', () => {

    });

    */

  
 

});