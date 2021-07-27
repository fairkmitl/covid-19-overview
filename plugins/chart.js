import Vue from "vue";
// import { Line } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component("line-chart", {
  extends: Line,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  }
});

Vue.component("pie-chart", {
  extends: Pie,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  }
});
