// Only tests home and create fail

jest.setTimeout(35000);

describe('Basic user flow for SPA ', () => {

    beforeAll(async () => {
        await page.goto('/login');
        await page.waitForTimeout(1000);
    });

    
    // Test 1
    it('Test1: Initial Home Page - Check Home Page', async () => {
      // Remember to change this after deploy
      expect(page.url()).toBe("/login/");
      
    });

    // Test 2
    it('Create New User Fails', async () => {
      
      // check that alert shows & url
      
        page.on('dialog', async dialog => {
          await dialog.accept();
        });
        await page.click('input#login-form-create');
        await page.click('input#email-field');
        await page.type('input#email-field','test10');
        await page.click('input#login-form-create');
        await page.click('input#password-field');
        await page.click('input#login-form-create');
        expect(page.url()).toBe("http://localhost:8080/login/");
    });

});

