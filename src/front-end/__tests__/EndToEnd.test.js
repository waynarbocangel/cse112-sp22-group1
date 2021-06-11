// Puppeteer
jest.setTimeout(35000);

describe('Basic user flow for SPA ', () => {

    beforeAll(async () => {
        await page.goto('http://localhost:8080/login');
        await page.waitForTimeout(1000);
    });

    
    // Test 1
    it('Test1: Initial Home Page - Check Home Page', async () => {
      // Remember to change this after deploy
      expect(page.url()).toBe("http://localhost:8080/login/");
      
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

    // Test 3
    it('Log in fail', async () => {
        // fill in fields, click login, check link
        //await page.waitForSelector('email-field');
        await page.click('input#email-field', {clickCount:3});
        await page.type('input#email-field','test10');
        await page.click('input#password-field',{clickCount:3});
        await page.type('input#password-field','qwer3');
        await page.click("input#login-form-submit");
        await page.waitForTimeout(5000);
        expect(page.url()).toBe("http://localhost:8080/login/");
        });

    

    // Test 4
    it('Log in', async () => {
        // fill in fields, click login, check link
        await page.click('input#email-field', { clickCount: 3 });
        await page.type('input#email-field', 'test13');
        await page.click('input#password-field', { clickCount: 3 });
        await page.type('input#password-field', 'qwert');
        await page.click("input#login-form-submit");
        await page.waitForNavigation();
        expect(page.url()).toBe("http://localhost:8080/");
    }, 10000);


    //Test 5 
    it('testing opening the settings menu by clicking the user button', async () => {
        const userButton = await page.evaluateHandle(`document.querySelector("#sidebar > nav-bar").shadowRoot.querySelector("#user")`);
        await userButton.evaluate(e => e.click());

        //press user button
        const settingsMenu = await page.$('settings-menu');

        const settingsMenuHidden = await settingsMenu.evaluate(e => e.getAttribute('aria-hidden'));
        expect(settingsMenuHidden).toBe("false");
    }, 10000);

    it('testing changing themes', async () => {
        //pressing  theme tab 
        const themeTab = await page.evaluateHandle(`document.querySelector("#settings-tab-generated-1")`);
        await themeTab.evaluate(e => e.click());

        //checking background color
        const darkThemeButton = await page.evaluateHandle(`document.querySelector("#settings-panel-generated-1 > theme-panel").shadowRoot.querySelector("#theme > label:nth-child(1)")`);
        const lightThemeButton = await page.evaluateHandle(`document.querySelector("#settings-panel-generated-1 > theme-panel").shadowRoot.querySelector("#theme > label:nth-child(2)")`);

        // start on dark theme
        await darkThemeButton.evaluate(e => e.click());
        //check the background color
        const firstBackgroundColor = await page.$eval(":root", root => getComputedStyle(root).backgroundColor);
        console.log(firstBackgroundColor);

        // switch to light theme
        await lightThemeButton.evaluate(e => e.click());
        const lightBackgroundColor = await page.$eval(":root", root => getComputedStyle(root).backgroundColor);
        console.log("first " + firstBackgroundColor);
        console.log("light " + lightBackgroundColor);
        expect(lightBackgroundColor).not.toBe(firstBackgroundColor);

        // go back to dark theme
        await darkThemeButton.evaluate(e => e.click());
        const secondDarkBackgroundColor = await page.$eval(":root", root => getComputedStyle(root).backgroundColor);
        console.log(secondDarkBackgroundColor, secondDarkBackgroundColor == firstBackgroundColor);
        expect(secondDarkBackgroundColor).toBe(firstBackgroundColor);
    }, 10000);

    it('test closing the settings menu', async() => {
        const userButton = await page.evaluateHandle(`document.querySelector("#sidebar > nav-bar").shadowRoot.querySelector("#user")`);
        await userButton.evaluate(e => e.click());

        //press user button
        const settingsMenu = await page.$('settings-menu');

        const settingsMenuHidden = await settingsMenu.evaluate(e => e.getAttribute('aria-hidden'));
        expect(settingsMenuHidden).toBe("true");
    }, 10000);

    it('testing logout button', async () => {
        // open the settings menu
        const userButton = await page.evaluateHandle(`document.querySelector("#sidebar > nav-bar").shadowRoot.querySelector("#user")`);
        await userButton.evaluate(e => e.click());

        //press user button
        const settingsMenu = await page.$('settings-menu');

        const settingsMenuHidden = await settingsMenu.evaluate(e => e.getAttribute('aria-hidden'));
        expect(settingsMenuHidden).toBe("true");

        const logoutButton = await page.evaluateHandle(`document.querySelector("#settings-panel-generated-0 > general-settings-panel").shadowRoot.querySelector("#logout")`);
        await logoutButton.evaluate(e => e.click());
        await page.waitForNavigation();
        expect(page.url()).toBe('http://localhost:8080/login/');
    }, 10000);
});