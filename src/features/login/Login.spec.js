const { Builder, until, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('./Login.page.js');
const path = require('path');
const assert = require('assert');
const { takeScreenshot } = require('../../shared/utility.js');
const addContext = require('mochawesome/addContext');

describe('Parabank Login Test Suites', function () {
    let driver;
    let loginPage;
    let screenshotDir;
    const featureName = process.env.FEATURE_NAME || 'parabank_feature';

    beforeEach(async function () {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function () {
        // Set up WebDriver
        const chromeOptions = new chrome.Options();
        const headless = process.env.HEADLESS === 'true'; // Check for headless mode

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

        // Initialize LoginPage with the WebDriver
        loginPage = new LoginPage(driver);
    });

    after(async function () {
        // Quit WebDriver
        if (driver) {
            await driver.quit();
        }
    });

    // Login data set for testing different user credentials
    const loginData = [
        { username: 'john', password: 'demo', valid: true },
        { username: 'wrong_user', password: 'wrong_password', valid: false }
    ];

    loginData.forEach(({ username, password, valid }, index) => {
        it(`Should ${valid ? 'log in' : 'not log in'} with ${valid ? 'valid' : 'invalid'} credentials (Test case ${index + 1})`, async function () {
            const testCaseName = valid ? 'successful_login' : 'unsuccessful_login';

            // Open the Parabank login page
            await driver.get('https://parabank.parasoft.com/parabank/index.htm');

            // Perform login actions using POM
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.clickLogin();
            // Take a screenshot
            const actualScreenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);
            addContext(this, { title: 'Actual Screenshot', value: actualScreenshotPath });

            if (valid) {
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
                // Logout
                const logoutLink = await driver.wait(
                    until.elementLocated(By.xpath('//*[@id="leftPanel"]//a[contains(text(),"Log Out")]')),
                    10000
                );
                await driver.wait(until.elementIsVisible(logoutLink), 10000); // Ensure it is visible
                await logoutLink.click();
                
            } else {
                // If credentials are invalid, verify login failure by checking for an error message
                const errorMessage = await loginPage.errorLoginMessage.getText();
                assert(
                    errorMessage.includes('The username and password could not be verified.'),
                    `Expected error message, but found: ${errorMessage}`
                );
            }
        });
    });
});
