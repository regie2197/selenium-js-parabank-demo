const { By } = require('selenium-webdriver');


class LoginPage { 
    constructor(driver) {
        this.driver = driver;
    }
    // for arranging web element objects
    get usernameField() {
        // Finding Elements
        //return this.driver.findElement(By.id('user-name'));
        return this.driver.findElement(By.xpath("//input[@name='username']"));
    }

    get passwordField() {
        //return this.driver.findElement(By.id('password'));
        return this.driver.findElement(By.xpath("//input[@name='password']"));
    }

    get loginButton() {
        //return this.driver.findElement(By.id('login-button'));
        return this.driver.findElement(By.xpath("//input[@value='Log In']"));
    }

    get errorLoginMessage() {
        return this.driver.findElement(By.xpath("//p[text()='The username and password could not be verified.']"));


    }
    // for web app Actions
    async enterUsername(username) {
        // Interacting with Elements
        await this.usernameField.sendKeys(username);
    }

    async enterPassword(password) {
        await this.passwordField.sendKeys(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}

module.exports = LoginPage;
