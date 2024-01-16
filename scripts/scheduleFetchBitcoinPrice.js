

const cron = require('node-cron');
const fetchBitcoinPrice = require('./fetchBitcoinPrice');

// Заставляем cron записывать дату каждые несколько секунд
cron.schedule('*/5* * * * *', async () => {
  console.log('Fetching Bitcoin price...');
  await fetchBitcoinPrice();
  console.log('Done fetching Bitcoin price');
});
