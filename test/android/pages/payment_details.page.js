const BaseFunction = require('../bases/BaseFunction')

module.exports = new class PaymentDetailsPage extends BaseFunction {
    #payment_details_page_title = '//*[@text="Pembayaran"]'
    #payment_due_label = 'id=edts.klik.android:id/lbPayBefore'
    #payment_due_date = 'id=edts.klik.android:id/tvPayBefore'
    #payment_method = 'id=edts.klik.android:id/tvMethod'
    #va_number_label = 'id=edts.klik.android:id/lbNo'
    #va_number_value = 'id=edts.klik.android:id/tvNo'
    #copy_va_number_button = 'id=edts.klik.android:id/tvCopy'
    #method_amount_label = 'id=edts.klik.android:id/tvMethodName'
    #method_amount_value = 'id=edts.klik.android:id/tvMethodAmount'
    #total_amount_label = 'id=edts.klik.android:id/lbTotal'
    #total_amount_value = 'id=edts.klik.android:id/tvTotal'
    #see_amount_detail = 'id=edts.klik.android:id/tvDetail'
    #see_payment_instruction = 'id=edts.klik.android:id/tvHelp'
    #check_payment_status_button = '//*[@text="Cek Status Pembayaran"]'
    #back_to_shopping_button = '//*[@text="Belanja Lagi"]'

    constructor() {
        super()
    }

    async validatePaymentDetails(payment_method, total_amount){
        let VA = await this.generateVANumber(payment_method)

        await this.expectDisplayed(this.#payment_details_page_title)
        await this.expectElementToHaveText(this.#payment_due_label, 'Bayar Sebelum')
        await this.expectDisplayed(this.#payment_due_date)
        await this.expectElementToHaveText(this.#payment_method, payment_method)
        await this.expectElementToHaveText(this.#va_number_label, `No ${payment_method}`)
        await this.expectElementToHaveText(this.#va_number_value, VA)
        await this.expectDisplayed(this.#copy_va_number_button)
        await this.expectElementToHaveText(this.#method_amount_label, payment_method)
        await this.expectElementToHaveText(this.#method_amount_value, total_amount)
        await this.expectElementToHaveText(this.#total_amount_label, 'Total Pembayaran')
        await this.expectElementToHaveText(this.#total_amount_value, total_amount)
        await this.expectDisplayed(this.#see_amount_detail)
        await this.expectDisplayed(this.#see_payment_instruction)
        await this.expectDisplayed(this.#check_payment_status_button)
        await this.expectDisplayed(this.#back_to_shopping_button)
    }

    async generateVANumber(payment_method){
        let VA_Number = ''
        switch (payment_method) {
            case 'BCA Virtual Account':
                VA_Number = '20555' + process.env.PHONE_NUMBER_VALID
                return VA_Number
            case 'BRI Virtual Account':
                VA_Number = '3379' + process.env.PHONE_NUMBER_VALID
                return VA_Number
            case 'Mandiri Virtual Account':
                VA_Number = '70001' + process.env.PHONE_NUMBER_VALID
                return VA_Number
            case 'Virtual Account Lainnya':
                VA_Number = '002' + process.env.PHONE_NUMBER_VALID
                return VA_Number
            default:
                throw error
        }
    }

    async clickBackToShopping(){
        await this.click(this.#back_to_shopping_button)
    }
}