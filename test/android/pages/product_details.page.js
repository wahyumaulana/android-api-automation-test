const BaseFunction = require('../bases/BaseFunction')
const Converter = require('../helpers/converter');

module.exports = new class ProductDetailsPage extends BaseFunction {
    #product_image = `//android.widget.FrameLayout[@resource-id='edts.klik.android:id/headerView']//android.widget.ImageView[@resource-id='edts.klik.android:id/imageView']`
    #product_name = 'id=edts.klik.android:id/tvName'
    #product_price = 'id=edts.klik.android:id/tvPrice'
    #product_discount = 'id=edts.klik.android:id/tvPct'
    #product_original_price = 'id=edts.klik.android:id/tvOriginalPrice'
    #product_desc = 'id=edts.klik.android:id/tvContent'
    #product_desc_more = 'id=edts.klik.android:id/tvMore'
    #close_icon = 'id=edts.klik.android:id/ivCancel'
    #similar_product_slide = 'id=edts.klik.android:id/productSlidingView'
    #cart_icon_badge = 'id=edts.klik.android:id/tvCart'
    #add_to_cart_button = 'id=edts.klik.android:id/bvCart'
    #subtotal_price = '//android.widget.FrameLayout[@resource-id="edts.klik.android:id/shimmerPrice"]//android.widget.TextView[@resource-id="edts.klik.android:id/tvPrice"]'
    #cart_icon = 'id=edts.klik.android:id/flBadge'


    constructor() {
        super()
    }

    async validateProductDetails(product){
        const price = Converter.numberToCurrencyString(product.price);
        const original_price = Converter.numberToCurrencyString(product.original_price);

        await this.expectDisplayed(this.#product_image);
        await this.expectElementToHaveText(this.#product_price, price)
        await this.expectElementToHaveText(this.#product_discount, product.discount)
        await this.expectElementToHaveText(this.#product_original_price, original_price)
        await this.expectElementToHaveText(this.#product_desc, product.desc)
        await this.expectDisplayed(this.#similar_product_slide);
        const product_name = await this.getElementText(this.#product_name)
        await expect(product_name.toLowerCase()).toBe(product.name.toLowerCase());
    }

    async validateDetailsProductDescription(product){
        const resource_id = '//android.widget.TextView[@resource-id="edts.klik.android:id/tvContent"'
        const DescLocator = `${resource_id} and @text="${product.desc}"]`
        const ingredientsLocator = `${resource_id} and @text="${product.ingredients}"]`
        const howToServeLocator = `${resource_id} and @text="${product.how_to_serve}"]`
        const PLULocator = `${resource_id} and @text="${product.PLU}"]`

        await this.clickSeeMore()
        await this.expectDisplayed(DescLocator);
        await this.expectDisplayed(ingredientsLocator);
        await this.expectDisplayed(howToServeLocator);
        await this.expectDisplayed(PLULocator);
        await this.expectDisplayed(DescLocator);
        await this.click(this.#close_icon)
    }

    async clickSeeMore(){
        await this.click(this.#product_desc_more)
    }

    async validatePriceCalculation(product){
        // original price
        const original_price_text = await this.getElementText(this.#product_original_price)
        const original_price = Converter.currencyToNumber(original_price_text)
        // discount
        const discount_text = await this.getElementText(this.#product_discount)
        const discount = Converter.percentageToNumber(discount_text)
        // price 
        const price_text = await this.getElementText(this.#product_price)
        const price = Converter.currencyToNumber(price_text)
        const priceCalculation = Converter.calculateDiscountedPrice(original_price, discount)
        
        await expect(price).toBe(priceCalculation);
        await expect(price).toBe(product.price)
        await expect(original_price).toBe(product.original_price)
    }

    async addToCart(){
        await this.click(this.#add_to_cart_button)
    }

    async validateSubtotalCalculation(productPrice){
        // subtotal
        const subtotal_text = await this.getElementText(this.#subtotal_price)
        // total item
        const total_item = parseInt(await this.getElementText(this.#cart_icon_badge))
        // calculate subtotal 
        const actual_subtotal = Converter.currencyToNumber(subtotal_text)
        const price_text = await this.getElementText(this.#product_price)
        const price = Converter.currencyToNumber(price_text)
        const expected_subtotal = price * total_item
        const expected_subtotal_data = productPrice * total_item

        await expect(actual_subtotal).toBe(expected_subtotal);
        await expect(actual_subtotal).toBe(expected_subtotal_data);

        return actual_subtotal
    }

    async goToCart(){
        await this.click(this.#cart_icon)
    }
}