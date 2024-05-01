const BaseFunction = require('../bases/BaseFunction')
module.exports = new class SearchPage extends BaseFunction {
    #search_field = '//*[@text="Cari di Klik Indomaret"]'
    #product_result_title = '//android.widget.TextView[@resource-id="edts.klik.android:id/tvTitle"]'

    constructor() {
        super()
    }

    async searchProduct(productName){
        // this.click(this.#search_field)
        this.input(this.#search_field, productName)
        await driver.pause(5000)
    }

    async openSearchProductResult(){
        this.click(this.#product_result_title)
        await driver.pause(10000)
    }

    
}
