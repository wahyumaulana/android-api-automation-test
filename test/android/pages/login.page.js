const BaseFunction = require('../bases/BaseFunction')
module.exports = new class LoginPage extends BaseFunction {
    // page elements
    #login_page_title = '//*[@text="Masukkan nomor handphone atau email"]'
    #login_page_desc = '//*[@text="Untuk masuk ke akun Klik Indomaret atau masukkan nomor handphonemu untuk pendaftaran.]'
    #phone_email_field = '//android.widget.EditText[@text="Masukkan nomor handphone atau email"]'
    #continue_button = '//*[@text="Lanjutkan"]'
    #password_field = '//android.widget.EditText[@text="Kata Sandi"]'
    #change_phone_button = 'id=edts.klik.android:id/tvChangePhoneNo'
    #show_password_button = '~Tampilkan sandi'
    #forgot_password_button = 'id=edts.klik.android:id/tvForgotPassword'
    #login_button = 'id=edts.klik.android:id/bvLogin'

    constructor() {
        super()
    }

    async validateLoginPage() {
        await this.expectDisplayed(this.#login_page_title)
        await this.expectDisplayed(this.#login_page_desc)
        await this.expectDisplayed(this.#phone_email_field)
        await this.expectDisplayed(this.#continue_button)
        await this.expectButtonDisabled(this.#continue_button)
    }

    async submitLoginProcess(account, password) {
        await this.submitPhoneNumberOrEmail(account)
        await this.submitPassword(password)
    }

    async submitPhoneNumberOrEmail(account) {
        await this.input(this.#phone_email_field, account)
        await this.expectButtonEnabled(this.#continue_button)
        await this.click(this.#continue_button)
    }

    async submitPassword(password) {
        await this.validatePasswordFieldDisplayed()
        await this.input(this.#password_field, password)
        await this.clickMasukButton()
    }

    async validatePasswordFieldDisplayed(){
        await this.expectDisplayed(this.#password_field)
        await this.expectDisplayed(this.#change_phone_button)
        await this.expectDisplayed(this.#show_password_button)
        await this.expectDisplayed(this.#forgot_password_button)
        await this.expectDisplayed(this.#login_button)
    }

    async clickShowPassword(){
        await this.click(this.#show_password_button)
    }

    async clickMasukButton(){
        await this.click(this.#login_button)
        await driver.pause(5000)
    }

    // .. Forgot Password
    // .. Other Functionality can be added
}
