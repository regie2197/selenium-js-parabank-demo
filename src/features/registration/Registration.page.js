const { By, until } = require('selenium-webdriver');

class RegistrationPage {
    constructor(driver) {
        this.driver = driver;
        // Define the elements for the registration form
        this.firstNameField = By.name('customer.firstName');
        this.lastNameField = By.name('customer.lastName');
        this.addressField = By.name('customer.address.street');
        this.cityField = By.name('customer.address.city');
        this.stateField = By.name('customer.address.state');
        this.zipCodeField = By.name('customer.address.zipCode');
        this.phoneNumberField = By.name('customer.phoneNumber');
        this.ssnField = By.name('customer.ssn');
        this.usernameField = By.name('customer.username');
        this.passwordField = By.name('customer.password');
        this.confirmPasswordField = By.name('repeatedPassword');
        this.registerButton = By.className('button');
        this.successMessage = By.xpath("//h1[contains(text(),'Welcome')]"); // After successful registration
    }

    // Method to fill out the registration form
    async fillRegistrationForm(userData) {
        await this.driver.findElement(this.firstNameField).sendKeys(userData.firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(userData.lastName);
        await this.driver.findElement(this.addressField).sendKeys(userData.address);
        await this.driver.findElement(this.cityField).sendKeys(userData.city);
        await this.driver.findElement(this.stateField).sendKeys(userData.state);
        await this.driver.findElement(this.zipCodeField).sendKeys(userData.zipCode);
        await this.driver.findElement(this.phoneNumberField).sendKeys(userData.phoneNumber);
        await this.driver.findElement(this.ssnField).sendKeys(userData.ssn);
        await this.driver.findElement(this.usernameField).sendKeys(userData.username);
        await this.driver.findElement(this.passwordField).sendKeys(userData.password);
        await this.driver.findElement(this.confirmPasswordField).sendKeys(userData.confirmPassword);
    }

    // Method to submit the registration form
    async submitRegistration() {
        const submitButton = await this.driver.findElement(this.registerButton);
        await submitButton.click();
    }

    // Method to verify successful registration
    async verifySuccessMessage() {
        await this.driver.wait(until.elementLocated(this.successMessage), 10000);
        const message = await this.driver.findElement(this.successMessage).getText();
        return message.includes("Welcome");
    }
}

module.exports = RegistrationPage;
