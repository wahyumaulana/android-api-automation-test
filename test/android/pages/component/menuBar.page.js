const BaseFunction = require('../../bases/BaseFunction')
module.exports = new class menuBar extends BaseFunction {
    #beranda = '//*[@text="Beranda"]'
    #cart = '//*[@text="Keranjang"]'
    #transaction = '//*[@text="Transaksi"]'
    #account = '//*[@text="Akun"]'
    #navigateBack = '~Kembali ke atas'

    constructor() {
        super()
    }

    async goToBeranda() {
      try {
        await this.click(this.#beranda)
      } catch (error) {
        this.back()
        await this.click(this.#beranda)
      }
    }

    async goToCart() {
      try {
        await this.click(this.#cart)
      } catch (error) {
        this.back()
        await this.click(this.#cart)
      }
    }

    async goToTransaction() {
      try {
        await this.click(this.#transaction)
      } catch (error) {
        this.back()
        await this.click(this.#transaction)
      }
    }

    async goToAccount() {
      try {
        await this.click(this.#account)
      } catch (error) {
        this.back()
        await this.click(this.#account)
      }
    }

    async back(){
      await this.click(this.#navigateBack)
    }
}