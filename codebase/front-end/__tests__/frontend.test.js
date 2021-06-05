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

    // Test 1
    it('Test1: Initial Home Page - Check Home Page', async () => {
      /*const numEntries = await page.$$eval('journal-entry', (entries) => {
        return entries.length;
      });
      */
      const title = await page.$eval("h1", (header) => { return header.innerHTML; });
      expect(title).toBe("My Journal");
      
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