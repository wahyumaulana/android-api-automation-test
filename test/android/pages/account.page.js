const BaseFunction = require('../bases/BaseFunction')
const { scrollToEndOfPage } = require('../helpers/gestures');

module.exports = new class AccountPage extends BaseFunction {
    #logout_button = 'id=edts.klik.android:id/menuLogout'
    #confirm_logout_button = '//*[@text="Keluar"]'

    constructor() {
        super()
    }

    async logout(){
      // await driver.pause(2000)
      await scrollToEndOfPage()
      await this.click(this.#logout_button)
      await this.click(this.#confirm_logout_button)
    }
}

