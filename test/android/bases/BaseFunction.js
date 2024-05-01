/**
 * Base Function containing all functions
 * that is shared across all page objects
 */
before(async () => {
    await driver.pause(5000)
})

module.exports = class BaseFunction {
    async isExist(locator) {
        return await $(locator).isExisting()
    }

    async expectExist(locator) {
        await $(locator).waitForExist({timeout: 5000})
        await expect($(locator)).toExist()
    }

    async isDisplayed(locator) {
        return await $(locator).isDisplayed()
    }

    async expectDisplayed(locator) {
        await $(locator).waitForDisplayed({timeout: 10000})
        await expect($(locator)).toBeDisplayed()
    }

    async expectNotDisplayed(locator) {
        await expect($(locator)).not.toBeDisplayed()
    }

    async expectElementToHaveText(locator, text) {
        await $(locator).waitForDisplayed({timeout: 5000})
        await expect($(locator)).toHaveText(text)
    }

    async expectElementToContainText(locator, text) {
        await $(locator).waitForDisplayed({ timeout: 5000 });
        await expect($(locator)).toHaveTextContaining(text);
    }

    async click(locator) {
        await $(locator).waitForDisplayed({timeout: 5000})
        await $(locator).click()
    }

    async input(locator, value) {
        await $(locator).waitForDisplayed({timeout: 5000})
        await $(locator).clearValue();
        await $(locator).setValue(value)
    }

    async inputUnclear(locator, value) {
        await $(locator).waitForDisplayed({timeout: 5000})
        await $(locator).addValue(value)
    }

    async toHaveText(locator, text) {
        await $(locator).waitForDisplayed({timeout: 10000})
        await expect($(locator)).toHaveText(text)
    }

    async expectSelected(locator) {
        await $(locator).waitForDisplayed({timeout: 5000})
        await expect($(locator)).toBeSelected()
    }

    async pressEnter(locator) {
        await $(locator).keys("\uE007");
    }

    async pressBackButton() {
        await driver.back();
    }

    async expectButtonDisabled(locator){
        await $(locator).waitForDisplayed({timeout: 5000})
        await expect($(locator)).toBeDisabled()
    }

    async expectButtonEnabled(locator){
        await $(locator).waitForDisplayed({timeout: 5000})
        await expect($(locator)).toBeEnabled()
    }

    async getElementText(locator) {
        const text = await $(locator).getText()
        return text
    }

    async getCurrentContexts() {
        return driver.getContexts()
    }

    async waitForWebViewContextLoaded() {
        await driver.waitUntil(
            async () => {
                const currentContexts = await this.getCurrentContexts()

                return currentContexts.length > 1 &&
                    currentContexts.find(context => context.toLowerCase().includes(CONTEXT_REF.WEBVIEW)) !== 'undefined'
            }, {
                // Wait a max of 30 seconds
                timeout: 30000,
                timeoutMsg: 'Webview context not loaded',
                interval: 100,
            },
        )
    }

    async switchToContext(context) {
        await driver.switchContext((await this.getCurrentContexts())[context === CONTEXT_REF.NATIVE ? 0 : 1])
    }

    async waitForNativeContextLoaded() {
        await driver.waitUntil(
            async () => {
                const currentContexts = await this.getCurrentContexts()

                return currentContexts.length > 1 &&
                    currentContexts.find(context => context.toLowerCase().includes(CONTEXT_REF.NATIVE)) !== 'undefined'
            }, {
                // Wait a max of 30 seconds
                timeout: 30000,
                timeoutMsg: 'Webview context not loaded',
                interval: 100,
            },
        )
    }
}
