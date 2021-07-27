<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap v-if="stat">
        <v-flex lg3 sm6 xs12>
          <v-card class="mx-auto rounded-lg">
            <v-card-text>
              <div>New</div>
              <p class="text-h4 text--primary">
                {{ numberWithComma(stat.cases.new) }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                updated : {{ dateFormat(stat.time) }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-card class="mx-auto rounded-lg">
            <v-card-text>
              <div>Active</div>
              <p class="text-h4 text--primary">
                {{ numberWithComma(stat.cases.active) }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                updated : {{ dateFormat(stat.time) }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-card class="mx-auto rounded-lg">
            <v-card-text>
              <div>Recovered</div>
              <p class="text-h4 text--primary">
                {{ numberWithComma(stat.cases.recovered) }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                updated : {{ dateFormat(stat.time) }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-card class="mx-auto rounded-lg">
            <v-card-text>
              <div>Total</div>
              <p class="text-h4 text--primary">
                {{ numberWithComma(stat.cases.total) }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                updated : {{ dateFormat(stat.time) }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex lg6 sm12 xs12>
          <v-card class="mx-auto rounded-lg">
            <v-card-title>
              Growth
            </v-card-title>
            <v-card-text>
              <client-only v-if="stat">
                <line-chart
                  :data="chartData.datasets[0].data.length > 0"
                  :options="barChartOptions"
                ></line-chart>
              </client-only>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const axios = require("axios");

var stat_options = {
  method: "GET",
  url: "https://covid-193.p.rapidapi.com/statistics",
  params: { country: "thailand" },
  headers: {
    "x-rapidapi-key": "ff3c6ad228msh37d5d1150b04db0p1dbda1jsnf85d6e8aefa7",
    "x-rapidapi-host": "covid-193.p.rapidapi.com"
  }
};

var history_options = {
  method: "GET",
  url: "https://covid-193.p.rapidapi.com/history",
  params: { country: "thailand" },
  headers: {
    "x-rapidapi-key": "ff3c6ad228msh37d5d1150b04db0p1dbda1jsnf85d6e8aefa7",
    "x-rapidapi-host": "covid-193.p.rapidapi.com"
  }
};

export default {
  layout: "default",
  components: {},
  head() {
    return {
      title: `Dashboard`
    };
  },
  data: () => ({
    stat: null,
    history: null,
    chartData: {
      datasets: [
        {
          borderColor: "#6200ea",
          label: "Count",
          data: []
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: true,
        // text: "Google analytics data",
        fontSize: 24,
        fontColor: "#6b7280"
      },
      tooltips: {
        backgroundColor: "#17BF62"
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }
        ]
      }
    }
  }),
  async asyncData({ $axios }) {},
  mounted() {
    setTimeout(() => {
      this.$root.$loadingDialog.open(null);

      setTimeout(() => {
        this.$root.$loadingDialog.close();
      }, 1000);
    }, 500);
    this.getStat();
    this.getHistory();
    // this.renderChart(this.chartData, this.barChartOptions);
  },
  methods: {
    getStat() {
      let self = this;
      axios
        .request(stat_options)
        .then(function(response) {
          console.log(response.data);
          self.stat = response.data.response[0];
          console.log(self.stat);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    getHistory() {
      let self = this;
      axios
        .request(history_options)
        .then(function(response) {
          console.log(response.data);
          self.history = response.data.response;
          console.log(self.history);

          let filter = self.history
            .filter((el, index) => index < 28)
            .filter((el, index) => index % 2)
            .reverse();
          console.log(filter);

          self.chartData.datasets[0].data = filter.map(el => el.cases.active);
          console.log(self.chartData.datasets[0].data);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    dateFormat(x) {
      let date = x.split("T");
      let time = date[1].split("+");
      return date[0] + " " + time[0];
    },
    numberWithComma(num) {
      const NumCommas = Number(num).toLocaleString("en", {});
      return NumCommas;
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
