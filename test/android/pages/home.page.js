const BaseFunction = require('../bases/BaseFunction')
module.exports = new class HomePage extends BaseFunction {
    // page elements
    #search_field = '//*[@text="Cari di Klik Indomaret"]'
    #delivery_title = 'id=edts.klik.android:id/tvDeliveryTitle'
    #delivery_destination = 'id=edts.klik.android:id/tvDeliverTo'
    #login_ubah_button = 'id=edts.klik.android:id/btnChange'
    // widget to login
    #widget_title = '//*[@text="Tentukan Lokasimu"]'
    #masuk_button = 'id=edts.klik.android:id/clLogin'
    #masuk_button_text = '//*[@text="Masuk"]'
    #masuk_button_desc = '//*[@text="Masuk agar alamat pengirimanmu disimpan"]'


    constructor() {
        super()
    }

    async validateHomePageBeforeLogin(area) {
        const delivery_title = 'Login dulu yuk!'
        const delivery_destination = `Dikirim ke Area ${area}`

        await this.expectElementToHaveText(this.#delivery_title, delivery_title)
        await this.expectElementToHaveText(this.#delivery_destination, delivery_destination)
        await this.expectElementToHaveText(this.#login_ubah_button, 'Login')
    }

    async validateHomePageAfterLogin(address_name) {
        const delivery_title = 'Pesan Antar'
        const delivery_destination = `Dikirim ke ${address_name}`
        // await driver.pause(5000)
        
        await this.expectElementToHaveText(this.#delivery_title, delivery_title)
        await this.expectElementToHaveText(this.#delivery_destination, delivery_destination)
        await this.expectElementToHaveText(this.#login_ubah_button, 'Ubah')
    }

    async loginFromDeliverySection() {
        await this.expectElementToHaveText(this.#login_ubah_button, 'Login')
        await this.click(this.#login_ubah_button)
        await this.validateLoginWidget();
        await this.clickLoginFromWidget();
    }

    async validateLoginWidget(){
        await this.expectDisplayed(this.#widget_title)
        await this.expectDisplayed(this.#masuk_button_text)
        await this.expectDisplayed(this.#masuk_button_desc)
        await this.expectDisplayed(this.#masuk_button)
    }

    async clickLoginFromWidget(){
        await this.click(this.#masuk_button)
    }

    async clickSearchBar(){
        await this.click(this.#search_field)
    }

    //.. Login from Akun Menu
    //.. Other functionality
}
