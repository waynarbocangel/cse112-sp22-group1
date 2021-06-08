describe('Basic user flow for SPA ', () => {
    
    beforeAll(async () => {
      await page.goto('http://localhost:8080/login/');
      await page.waitForTimeout(500);
    });

    test(' 1 and 1', ()=>{
      expect(1).toBe(1);
    });
    



});