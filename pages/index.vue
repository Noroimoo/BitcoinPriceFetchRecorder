<template>
  <div>
    <PriceChart :chartData="chartData"></PriceChart>
    <!-- список для выбора периода времени -->
    <select v-model="selectedPeriod" @change="fetchData">
      <option value="day">День</option>
      <option value="week">Неделя</option>
      <option value="month">Месяц</option>
      <option value="year">Год</option>
      <option value="custom">Выбрать промежуток</option>
    </select>

    <!-- Отображение поля для ввода даты если пользователь сам пытается задать время -->
    <label v-if="selectedPeriod === 'custom'" for="startDate">От:</label>
    <input v-if="selectedPeriod === 'custom'" type="date" v-model="startDate" id="startDate" @change="fetchData" />

    <label v-if="selectedPeriod === 'custom'" for="endDate">До:</label>
    <input v-if="selectedPeriod === 'custom'" type="date" v-model="endDate" id="endDate" @change="fetchData" />
  </div>
</template>

<script>

import axios from 'axios';
import PriceChart from '~/components/PriceChart.vue';

export default {
  components: {
    PriceChart,
  },
  data() {
    return {
      // Данные для графика
      chartData: {},
      selectedPeriod: 'day', 
      startDate: null, 
      endDate: null, 
    };
  },
  mounted() {
    this.fetchData(); // Загрузка данных при маунте компонента
  },
  methods: {
    async fetchData() {
      const params = { period: this.selectedPeriod };


      if (this.selectedPeriod === 'custom') {
        // Если выбран пользовательский период, добавляем начальную и конечную даты в параметры запроса
        params.startDate = new Date(this.startDate).toISOString().substr(0, 10);
        params.endDate = new Date(this.endDate).toISOString().substr(0, 10);
      }

      // Отправляем запрос на сервер и получаем данные
      const { data } = await axios.get('/api/bitcoin-prices', {
        params,
      });

      // Обновляем chartData с полученными данными
      this.chartData = {
        labels: data.historicalPrices.map((price) => price.timestamp),
        datasets: [
          {
            label: 'Цена Биткоина', // Заголовок набора данных
            data: data.historicalPrices.map((price) => price.price), // Массив цен биткоина
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgba(75, 192, 192, 1)', 
            borderWidth: 1,
          },
        ],
      };
    },
  },
};
</script>
