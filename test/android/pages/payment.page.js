const BaseFunction = require('../bases/BaseFunction')
const { scrollToEndOfPage } = require('../helpers/gestures')
const CONTEXT_REF = {
    NATIVE: 'native',
    WEBVIEW: 'webview',
}

module.exports = new class PaymentPage extends BaseFunction {
    #payment_page_title = '//*[@text="Pembayaran"]'
    #total_payment_label = '//android.widget.TextView[@text="Total Pembayaran :"]'
    // VA Options
    #BCA_VA_option = '//*[@text="BCA Virtual Account"]'
    #Other_VA_option = '//*[@text="Virtual Account Lainnya"]'
    #Mandiri_VA_option = '//*[@text="Mandiri Virtual Account"]'
    #BRI_VA_option = '//*[@text="BRI Virtual Account"]'
    // BCA Instruction
    #BCA_instruction_title = '//android.widget.TextView[@text="BCA Virtual Account"]'
    #BCA_instruction_total_payment_label = '//android.widget.TextView[@text="Total Pembayaran :"]'
    #BCA_instruction_content_1 = '//*[contains(@text, "Anda akan mendapatkan 16 digit nomor virtual account, dengan format : 20555 + nomor hp yang terdaftar di akun Klik Indomaret, Setelah menekan tombol")]'
    #BCA_instruction_content_2 = '//android.widget.TextView[@text="Nomor virtual account ini akan digunakan untuk setiap pembayaran menggunakan "]'
    #BCA_instruction_content_2_1 = '//android.view.View[@text="BCA Virtual Account"]'
    #BCA_instruction_content_2_2 = '//android.widget.TextView[@text=" di Klik Indomaret."]'
    #BCA_instruction_content_3 = '//android.widget.TextView[@text="Lakukan pembayaran menggunakan nomor virtual account tersebut di ATM BCA, BCA Mobile, atau Mobile Banking BCA."]'
    #pay_now_button = '//android.widget.Button[@text="Bayar Sekarang"]'

    constructor() {
        super()
    }

    async switchToWebview() {
        await this.waitForWebViewContextLoaded()
        await this.switchToContext(CONTEXT_REF.WEBVIEW)
    }

    async validatePaymentPage(){
        try {
            await this.expectDisplayed(this.#payment_page_title)
        } catch (error) {
            await this.switchToWebview()
            await this.expectDisplayed(this.#payment_page_title)
        }
    }

    async validateTotalPayment(total_amount){
        const total_payment_value = `//android.widget.TextView[@text="${total_amount}"]`
        await this.expectDisplayed(this.#total_payment_label)
        await this.expectDisplayed(total_payment_value)
    }

    async selectVirtualAccountPaymentMethod(payment_method){
        switch (payment_method) {
            case 'BCA Virtual Account':
                await this.findAndClickPaymentMethod(this.#BCA_VA_option)
                break;
            case 'BRI Virtual Account':
                await this.findAndClickPaymentMethod(this.#BRI_VA_option)
                break;
            case 'Mandiri Virtual Account':
                await this.findAndClickPaymentMethod(this.#Mandiri_VA_option)
                break;
            case 'Virtual Account Lainnya':
                await this.findAndClickPaymentMethod(this.#Other_VA_option)
                break;
            default:
                throw error
        }
    }

    async findAndClickPaymentMethod(locator){
        try {
            await this.click(locator)
        } catch (error) {
            await scrollToEndOfPage()
            await this.click(locator)
        }
    }

    async clickPayNowButton(){
        await this.validatePaymentInstruction()
        await this.click(this.#pay_now_button)
        await driver.pause(5000)
    }

    async validatePaymentInstruction(){
        await this.expectDisplayed(this.#BCA_instruction_title)
        await this.expectDisplayed(this.#BCA_instruction_total_payment_label)
        await this.expectDisplayed(this.#BCA_instruction_content_1)
        await this.expectDisplayed(this.#BCA_instruction_content_2)
        await this.expectDisplayed(this.#BCA_instruction_content_2_1)
        await this.expectDisplayed(this.#BCA_instruction_content_2_2)
        await this.expectDisplayed(this.#BCA_instruction_content_3)
    }
}