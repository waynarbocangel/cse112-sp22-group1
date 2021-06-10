// Puppeteer

describe('Basic user flow for SPA ', () => {
    
    beforeAll(async () => {
      await page.goto('http://localhost:8080');
      await page.waitForTimeout(500);
    });
        
    /*
    beforeEach(async () => {
        await page.goto('http://localhost:8080');
        await page.waitForTimeout(500);
    });
    */


    it('Test1: Initial Home Page - Check Home Page', async () => {
      // Remember to change this after deploy
      expect(page.url()).toBe("http://localhost:8080/login/");
      
    });


    
    it('Create New User Fails For Existing User', async () => {
      await page.$eval('#email-field', el => el.value = 'test30');
      await page.$eval('#password-field', pw => pw.value = 'qwert');
      //await page.click('login-form-create');
      //page.click('login-form-create');
      const create = page.waitForSelector('login-form-create', {visible: true});
      page.click(create);

      expect(page.url()).toBe("http://localhost:8080/login/");
    });
    
    
    // Test 3
    it('Log in', async () => {
      // fill in fields, click login, check link

      //page.goBack();
      //page.reload();

      /*
      await page.$eval('#email-field', el => el.value = 'test30');
      await page.$eval('#password-field', pw => pw.value = 'qwert');
      const login = page.waitForSelector('login-form-submit', {visible: true});
      page.click(login);
      */

      //await page.click('login-form-submit');  
    
      //await page.goto('http://localhost:8080');
      //await page.click("login-form-submit");
      //expect(page.url()).toBe("http://localhost:8080/");

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