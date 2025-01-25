const { By } = require('selenium-webdriver');
const { Select } = require('selenium-webdriver');

class AccountPage {
    constructor(driver) {
        this.driver = driver;
        this.openNewAccountButton = By.linkText('Open New Account');
        this.accountTypeDropdown = By.id('type');
        this.fromAccountDropdown = By.id('fromAccountId')
        this.openAccountButton = By.xpath("//input[@value='Open New Account']");
        this.successMessage = By.xpath("//p[contains(text(),'Your new account has been created.')]");
    }

    async openNewAccount() {
        const openNewAccountButton = await this.driver.findElement(this.openNewAccountButton);
        await openNewAccountButton.click();
    }

    async selectAccountType(accountType) {
        const accountTypeDropdown = await this.driver.findElement(this.accountTypeDropdown);
        const select = new Select(accountTypeDropdown);
        await select.selectByVisibleText(accountType);
    }

    // Select the "from" account for transferring funds
    async selectFromAccount(fromAccount) {
        const fromAccountDropdown = await this.driver.findElement(this.fromAccountDropdown);
        const select = new Select(fromAccountDropdown);
        await select.selectByVisibleText(fromAccount);
    }

    async clickOpenNewAccount() {
        const openAccountButton = await this.driver.findElement(this.openAccountButton);
        await openAccountButton.click();
    }

    async getSuccessMessage() {
        const message = await this.driver.findElement(this.successMessage);
        return message.getText();
    }
}

module.exports = AccountPage;