const axios = require('axios');
const BitcoinPrice = require('../model/BitcoinPrice'); 

// Получение и сохранение цены на Bitcoin
const fetchBitcoinPrice = async () => {
  try {
    // Получение данных о цене биткоина из CoinDesk
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    const price = response.data.bpi.USD.rate_float;

    // Создание записи с полученными данными о цене биткоина
    await BitcoinPrice.create({
      timestamp: new Date(),
      price,
    });

    console.log('Цена сохранена');
  } catch (error) {
    console.error('Не получилось сохранить цену:', error);
  }
};

fetchBitcoinPrice();
module.exports = fetchBitcoinPrice;
