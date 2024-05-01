const BaseFunction = require('../bases/BaseFunction')
const Converter = require('../helpers/converter')
module.exports = new class CartPage extends BaseFunction {
    #cart_page_title = '//*[@text="Keranjang Belanja"]'
    #shipping_section_label = '//*[@text="Tipe Pengiriman"]'
    #free_shipping_info = '//*[@text="Dapatkan gratis ongkir untuk pembelanjaan di atas Rp 150.000"]'
    #select_ongkir_button = '//*[@text="Pilih Pengiriman"]'
    #shipping_label = '//*[@text="Pesan Antar"]'
    #shipping_fee = '//android.widget.TextView[@resource-id="edts.klik.android:id/tvDelivery"]'
    #shipping_arival_estimation = ''
    // recipient address
    #address_section_label = '//*[@text="Alamat Pengiriman"]'
    #address_name_text = '//android.view.ViewGroup[@resource-id="edts.klik.android:id/clAddressContent"]//android.widget.TextView[@resource-id="edts.klik.android:id/tvLabel"]'
    #recipeient_name_text = '//android.view.ViewGroup[@resource-id="edts.klik.android:id/clAddressContent"]//android.widget.TextView[@resource-id="edts.klik.android:id/tvName"]'
    #shipping_address_text = '//android.view.ViewGroup[@resource-id="edts.klik.android:id/clAddressContent"]//android.widget.TextView[@resource-id="edts.klik.android:id/tvAddress"]'
    #change_address_button = '//*[@text="Ubah Alamat"]'
    // products in cart
    #product_checkbox_all = '(//android.widget.FrameLayout[@resource-id="edts.klik.android:id/flCheckBpx"])[1]/following-sibling::*[@text="Pilih Semua"]'
    #product_delete_all = '(//android.widget.FrameLayout[@resource-id="edts.klik.android:id/flCheckBpx"])[1]/following-sibling::*[@text="Hapus"]'
    #product_image = '(//android.widget.ImageView[@resource-id="edts.klik.android:id/imageView"])[2]'
    #product_name = '//android.widget.TextView[@resource-id="edts.klik.android:id/tvName"]'
    #product_discount = '//android.widget.TextView[@resource-id="edts.klik.android:id/tvPct"]'
    #product_original_price = '//android.widget.TextView[@resource-id="edts.klik.android:id/tvOriginalPrice"]'
    #product_price = '//android.widget.TextView[@resource-id="edts.klik.android:id/tvPrice"]'
    #total_item = '//android.widget.FrameLayout[@resource-id="edts.klik.android:id/stepperView"]//android.widget.TextView[@resource-id="edts.klik.android:id/textView"]'
    // subtotal
    #subtotal_label = 'id=edts.klik.android:id/tvSubTotalTitle'
    #subtotal_value = 'id=edts.klik.android:id/tvSubTotal'
    #total_amount_label = 'id=edts.klik.android:id/lbTotal'
    #total_amount_value = 'id=edts.klik.android:id/tvTotal'
    #buy_button = 'id=edts.klik.android:id/bvSubmit'
    // shipping modals
    #shipping_method_title = '//*[@text="Pilih Pengiriman"]'
    #shipping_method_desc = '//*[@text="Pilih salah satu tipe pengiriman."]'
    #shipping_cancel_icon = 'id=edts.klik.android:id/ivCancel'
    #regular_shipping_option = '//*[contains(@text, "Regular")]'
    #regular_arrival_estimation_text = '//*[contains(@text, "Regular")]/following-sibling::*[contains(@text,"Estimasi tiba dalam")]'
    #sameday_shipping_option = '//*[contains(@text, "Same Day")]'
    #sameday_arrival_estimation_text = '//*[contains(@text, "Same Day")]/following-sibling::*[contains(@text,"Tidak tersedia")]'
    #checked_regular_option = '//*[contains(@text, "Regular")]/following-sibling::android.widget.ImageView[@resource-id="edts.klik.android:id/ivRight"]'
    #shipping_cancel_button = '//*[@text="Batal"]'
    #shipping_confirm_button = '//*[@text="Konfirmasi"]'

    constructor() {
        super()
    }

    async validateCartPage(){
        await this.expectDisplayed(this.#cart_page_title)
        await this.expectDisplayed(this.#shipping_section_label)
        //await this.expectDisplayed(this.#free_shipping_info)
        await this.expectDisplayed(this.#select_ongkir_button)
    }

    async validateShippingAddress(address){
        const recipient = `${address.recipient_name} (${address.recipient_phone})`

        await this.expectDisplayed(this.#address_section_label)
        await this.expectDisplayed(this.#change_address_button)
        await this.expectElementToHaveText(this.#address_name_text, address.name)
        await this.expectElementToHaveText(this.#recipeient_name_text, recipient)
        await this.expectElementToHaveText(this.#shipping_address_text, address.address)
    }

    async validateProductInCart(product){
        const price = Converter.numberToCurrencyString(product.price);
        const original_price = Converter.numberToCurrencyString(product.original_price);
        const product_name = await this.getElementText(this.#product_name)

        await this.expectDisplayed(this.#product_checkbox_all)
        await this.expectDisplayed(this.#product_delete_all)
        //await this.expectDisplayed(this.#product_image);
        await this.expectElementToHaveText(this.#product_price, price)
        await this.expectElementToHaveText(this.#product_discount, product.discount)
        await this.expectElementToHaveText(this.#product_original_price, original_price)
        //await expect(product_name.toLowerCase()).toBe(product.name.toLowerCase());
        await this.expectDisplayed(this.#total_item)
    
    }

    async validateShippingModals(){
        await this.expectDisplayed(this.#shipping_method_title)
        await this.expectDisplayed(this.#shipping_method_desc)
        await this.expectDisplayed(this.#shipping_cancel_icon)
        await this.expectDisplayed(this.#regular_shipping_option)
        await this.expectDisplayed(this.#regular_arrival_estimation_text)
        await this.expectDisplayed(this.#sameday_shipping_option)
        await this.expectDisplayed(this.#sameday_arrival_estimation_text)
        await this.expectDisplayed(this.#shipping_cancel_button)
    }

    async selectShippingMethod(shipping){
        await this.click(this.#select_ongkir_button)
        await this.validateShippingModals();

        switch (shipping) {
            case 'Regular':
                await this.click(this.#regular_shipping_option)
                await this.expectDisplayed(this.#checked_regular_option)
                await this.expectButtonEnabled(this.#shipping_confirm_button)
                break;
            case 'Same Day':
                await this.click(this.#sameday_shipping_option)
                break;
            default:
                break;
        }

        await this.click(this.#shipping_confirm_button)
    }

    async validateShippingMethod(shipping){
        //const arrival_est = 'Estimasi tiba dalam 3 - 6 hari.'
        await this.expectDisplayed(this.#shipping_label)
        await this.expectElementToContainText(this.#shipping_fee, shipping);
        //await this.expectElementToHaveText(this.#shipping_arival_estimation, arrival_est);
    }

    async validateTotalAmount(subtotal){
        const shipping_fee_text = await this.getElementText(this.#shipping_fee)
        const shipping_fee = await this.getShippingFee(shipping_fee_text)
        const total = subtotal + shipping_fee
        const total_amount = Converter.numberToCurrencyString(total)
        const subtotal_text = Converter.numberToCurrencyString(subtotal)

        await this.expectElementToHaveText(this.#subtotal_label, 'Subtotal')
        await this.expectElementToHaveText(this.#subtotal_value, subtotal_text)
        await this.expectElementToHaveText(this.#total_amount_label, 'Total Harga')
        await this.expectElementToHaveText(this.#total_amount_value, total_amount)

        return total_amount
    }

    async getShippingFee(text) {
        const regex = /\([^()]*\)/g;
        text = text.replace(regex, '');
    
        const digitsRegex = /\D+/g;
        const digitsOnly = text.replace(digitsRegex, '');
        const fee = parseInt(digitsOnly);
    
        return fee;
    }

    async clickBuyButton(){
        await this.click(this.#buy_button)
        await driver.pause(10000)
    }
}
