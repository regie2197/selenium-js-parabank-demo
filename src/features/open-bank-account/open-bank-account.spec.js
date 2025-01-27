const { Builder, until, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../login/Login.page.js');
const AccountPage = require('./open-bank-account.page.js');
const path = require('path');
const assert = require('assert');
const { takeScreenshot } = require('../../shared/utility.js');
const addContext = require('mochawesome/addContext');



describe('Parabank Open Bank Account Test Suite', function () {
    let driver;
    let loginPage;
    let accountPage;
    let screenshotDir;
    const featureName = process.env.FEATURE_NAME || 'parabank_feature';

    beforeEach(async function () {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function () {
        // Set up WebDriver
        const chromeOptions = new chrome.Options();
        const headless = process.env.HEADLESS === 'true';

        if (headless) {
            chromeOptions.addArguments('headless');
        }

        // Create WebDriver instance
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        await driver.manage().setTimeouts({ implicit: 10000 });

        if (!headless) {
            await driver.manage().window().maximize();
        }

        // Initialize LoginPage and AccountPage with the WebDriver
        loginPage = new LoginPage(driver);
        accountPage = new AccountPage(driver);
    });

    after(async function () {
        // Quit WebDriver
        if (driver) {
            await driver.quit();
        }
    });

    it('Should open a new savings account after logging in', async function () {
        const testCaseName = 'open_savings_account';

        // Open the Parabank login page
        await driver.get('https://parabank.parasoft.com/parabank/index.htm');

        // Perform login actions
        await loginPage.enterUsername('john');
        await loginPage.enterPassword('demo');
        await loginPage.clickLogin();

        // Take a screenshot after login
        /*
        const loginScreenshotPath = await takeScreenshot(driver, screenshotDir, 'successful_login');
        addContext(this, { title: 'Login Screenshot', value: loginScreenshotPath });*/

        // Verify successful login by checking for the "Accounts Overview" page
        const accountsOverviewHeader = await driver.wait(
            until.elementLocated(By.xpath("//h1[contains(text(),'Accounts Overview')]")),
            10000
        );
        const headerText = await accountsOverviewHeader.getText();
        assert(
            headerText.includes('Accounts Overview'),
            `Expected text to include 'Accounts Overview', but found: ${headerText}`
        );

        // Now, open a new savings account by clicking on the "Open New Account" side menu
        const openNewAccountLink = await driver.wait(
            until.elementLocated(By.xpath("//a[contains(text(), 'Open New Account')]")),
            10000
        );
        await openNewAccountLink.click();

        // Wait for the "Open New Account" page to load
        const newAccountPageHeader = await driver.wait(
            until.elementLocated(By.xpath("//h1[contains(text(),'Open New Account')]")),
            10000
        );
        const newAccountHeaderText = await newAccountPageHeader.getText();
        assert(
            newAccountHeaderText.includes('Open New Account'),
            `Expected text to include 'Open New Account', but found: ${newAccountHeaderText}`
        );

        // Select Savings account type
        await accountPage.selectAccountType('SAVINGS');

        // Choose an existing account to transfer funds into the new account by index 0.
        await accountPage.selectFromAccountByIndex(0);

        // Click the "Open New Account" button
        await accountPage.clickOpenNewAccount();

        const accountOpenedText = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Account Opened')]")),
            10000
        );
        await driver.wait(until.elementIsVisible(accountOpenedText), 10000);

        // Take a screenshot after confirming the text is visible
        const accountScreenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);
        addContext(this, { title: 'Account Opened Screenshot', value: accountScreenshotPath });
    });
});
