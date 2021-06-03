// Puppeteer

describe('Basic user flow for SPA ', () => {
    
    beforeAll(async () => {
      await page.goto('localhost:8080');
      await page.waitForTimeout(500);
    });

    // Testing test
    test(' 1 and 1', ()=>{
      expect(1).toBe(1);
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