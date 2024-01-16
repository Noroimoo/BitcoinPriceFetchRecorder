
const app = require('express')();
const { Op } = require('sequelize');
const BitcoinPrice = require('../model/BitcoinPrice');

// Обработка запроса на получение данных о цене биткоина
app.get('/api/bitcoin-prices', async (req, res) => {
  const { period, startDate, endDate } = req.query;
  let queryEndDate = new Date();
  let queryStartDate = new Date(queryEndDate);

  // Определение начала периода в соответствии с выбранным кейсом
  switch (period) {
    case 'day':
      queryStartDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      queryStartDate.setDate(queryStartDate.getDate() - 7);
      queryStartDate.setHours(0, 0, 0, 0);
      break;
    case 'month':
      queryStartDate.setMonth(queryStartDate.getMonth() - 1);
      queryStartDate.setHours(0, 0, 0, 0);
      break;
    case 'year':
      queryStartDate.setFullYear(queryStartDate.getFullYear() - 1);
      queryStartDate.setHours(0, 0, 0, 0);
      break;
    case 'custom':
      queryStartDate = new Date(startDate);
      queryEndDate = new Date(endDate);
      queryEndDate.setHours(23, 59, 59, 999);
      break;
    default:
      return res.status(400).json({ message: "Неправильно выбрана дата" });
  }

  if (period !== 'custom') {
    queryEndDate.setHours(23, 59, 59, 999);
  }

  console.log('queryStartDate:', queryStartDate.toISOString());
  console.log('queryEndDate:', queryEndDate.toISOString());

  // Получение данных о цене биткоина из базы данных
  const historicalPrices = await BitcoinPrice.findAll({
    where: {
      timestamp: { [Op.between]: [queryStartDate, queryEndDate] },
    },
    order: [
      ['timestamp', 'ASC'],
    ],
  });

  console.log('historicalPrices:', historicalPrices);

  // Отправка полученных данных пользователю
  res.json({ historicalPrices });
});

module.exports = app;
