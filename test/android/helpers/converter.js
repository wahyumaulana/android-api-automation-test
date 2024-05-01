class Converter {
  static numberToCurrencyString(number) {
      const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp ${formattedNumber}`
  }

  static percentageToNumber(percentage) {
      return parseFloat(percentage.replace('%', ''))
  }

  static currencyToNumber(currencyString) {
    const numberString = currencyString.replace(/[^\d,]/g, '');
    // if number decimal with comma (,)
    const numberWithoutCommas = numberString.replace(/,/g, '');
    return parseFloat(numberWithoutCommas);
  }

  static calculateDiscountedPrice(originalPrice, discount) {
    const discountAmount = originalPrice * (discount / 100);
    let discountedPrice = originalPrice - discountAmount;
    // Round the discounted price to the nearest hundred
    discountedPrice = Math.round(discountedPrice/100)*100;
    return discountedPrice;
}
}

module.exports = Converter;