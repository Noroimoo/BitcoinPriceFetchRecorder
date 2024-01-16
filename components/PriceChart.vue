<script>
// Импортируем Line и mixins из vue-chartjs для создания графика цены биткойна
import { Line, mixins } from 'vue-chartjs';

export default {
  // Используем Line компонент из vue-chartjs для создания графика
  extends: Line,
  // Добавляем reactiveProp для обновления графика при изменении chartData
  mixins: [mixins.reactiveProp],
  // Определяем свойство chartData
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  // Зовём renderChart когда компонент замаунтился
  mounted() {
    this.renderChart(this.chartData, {
      // Настройки отображения графика
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            type: 'time', // Тип оси X - "время"
            time: {
              unit: 'day', // Отображать данные для каждого дня
            },
          },
        ],
      },
    });
  },
};
</script>

<style scoped>
/*Добавляем стили chart-container*/
.chart-container {
  height: 50vh;
  max-height: 100%; 
  width: 100%; 
  position: relative; 
}
</style>
