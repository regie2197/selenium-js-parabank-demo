const { Builder, By, until } = require('selenium-webdriver');
const RegistrationPage = require('./Registration.page');
const assert = require('assert');
const { takeScreenshot } = require('../../shared/utility');
const addContext = require('mochawesome/addContext');
const path = require('path');
const registrationData = require('../../test-data/registration.json'); // Data file containing the test data

describe('Registration Test Suite', function () {
    let driver;
    let registrationPage;
    let screenshotDir;
    const featureName = process.env.FEATURE_NAME || 'registration_feature';

    beforeEach(async function () {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function () {
        // Set up WebDriver
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({ implicit: 10000 });
        registrationPage = new RegistrationPage(driver);
    });

    after(async function () {
        // Quit WebDriver
        if (driver) {
            await driver.quit();
        }
    });

    // Data-driven test for multiple user registrations
    registrationData.forEach((user, index) => {
        it(`should register successfully for user ${user.username} (Test case ${index + 1})`, async function () {
            // Open the Registration page
            await driver.get('https://parabank.parasoft.com/parabank/register.htm');

            // Fill the registration form with user data
            await registrationPage.fillRegistrationForm(user);

            // Submit the registration form
            await registrationPage.submitRegistration();

            // Take a screenshot of the result
            const testCaseName = 'successful_registration';
            const screenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);
            addContext(this, { title: 'Actual Screenshot', value: screenshotPath });

            // Verify the success message after registration
            const isSuccessful = await registrationPage.verifySuccessMessage();
            assert.strictEqual(isSuccessful, true, 'Registration was not successful');
        });
    });
});
