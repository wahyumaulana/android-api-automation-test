const loginPage = require("../pages/login.page")
const homePage = require("../pages/home.page")
const searchPage = require("../pages/search.page")
const accountPage = require("../pages/account.page")
const menuBar = require("../pages/component/menuBar.page")
const productDetailPage = require("../pages/product_details.page")
const cartPage = require("../pages/cart.page")
const paymentPage = require("../pages/payment.page")
const paymentDetailsPage = require("../pages/payment_details.page")

beforeEach(async () => {
    await driver.activateApp(process.env.APP_WAIT_PACKAGE);
    await driver.pause(5000);
})

afterEach(async () => {
    console.log("EXECUTE LOGOUT")
    await menuBar.goToAccount()
    await accountPage.logout()
    await driver.pause(5000);
    await driver.terminateApp(process.env.APP_WAIT_PACKAGE);
})

describe('Klik Indomaret Transaction with Virtual Account', () => {
    it('Validate Transaction with BCA Virtual Account @transaction @regression', async () => {
        const product = {
            name:'Kapal Api Kopi Bubuk Special Mix 10x24g',
            price:13600,
            original_price:15400,
            discount:'12%',
            desc:'Terbuat dari biji kopi pilahan dengan tambahan gula sehingga dapat langsung diseduh dan dinikmati.',
            ingredients: 'Gula, Kopi bubuk.',
            how_to_serve: 'Tuang satu bungkus Kapal Api Special Mix ke dalam cangkir. Seduh dengan air mendidih � 200ml. Aduk rata & hidangkan.',
            PLU: '10038932'
        }

        const address = { 
            name: 'Home',
            recipient_name: 'Wahyu Maulana',
            recipient_phone: process.env.PHONE_NUMBER_VALID,
            area:'Aren Jaya',
            address:'Aren Jaya Bekasi Timur Kota Bekasi Jawa Barat'
        }

        let subtotal = 0
        let total_amount = ''
        const payment_method = 'BCA Virtual Account'

        // validate before login
        await homePage.validateHomePageBeforeLogin(address.area)
        // login from delivery section
        await homePage.loginFromDeliverySection()
        await loginPage.submitLoginProcess(process.env.PHONE_NUMBER_VALID, process.env.PASSWORD_VALID)
        // validate after login
        await homePage.validateHomePageAfterLogin(address.name)
        // search a product
        await homePage.clickSearchBar()
        await searchPage.searchProduct(product.name)
        // open detail product
        await searchPage.openSearchProductResult()
        // validate product details
        await productDetailPage.validateProductDetails(product)
        await productDetailPage.validateDetailsProductDescription(product)
        await productDetailPage.validatePriceCalculation(product)
        // add to cart
        await productDetailPage.addToCart()
        subtotal = await productDetailPage.validateSubtotalCalculation(product.price)
        // go to cart
        await productDetailPage.goToCart()
        await cartPage.validateCartPage()
        // select shipping method
        await cartPage.selectShippingMethod('Regular')
        await cartPage.validateShippingMethod('Regular')
        await cartPage.validateShippingAddress(address)
        await cartPage.validateProductInCart(product)
        total_amount = await cartPage.validateTotalAmount(subtotal)
        // Click "Beli" button
        await cartPage.clickBuyButton()
        await paymentPage.validatePaymentPage();
        await paymentPage.validateTotalPayment(total_amount)
        // Choose "Virtual Account" payment method in " Pembayaran" section
        await paymentPage.selectVirtualAccountPaymentMethod(payment_method)
        // Click "Bayar sekarang" button
        await paymentPage.clickPayNowButton();
        // Redirect to order success page and back to homepage
        await paymentDetailsPage.validatePaymentDetails(payment_method, total_amount)
        await paymentDetailsPage.clickBackToShopping()
    })
})
