<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg3 sm6 xs12>
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <div>New</div>
              <p class="text-h4 text--primary">
                {{this.info.cases.new}}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <div>Active</div>
              <p class="text-h4 text--primary">
                {{this.info.cases.active}}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <div>Recovered</div>
              <p class="text-h4 text--primary">
                {{this.info.cases.recovered}}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <div>Total</div>
              <p class="text-h4 text--primary">
                {{this.info.cases.total}}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const axios = require("axios");

var options = {
  method: "GET",
  url: "https://covid-193.p.rapidapi.com/statistics",
  params: { country: "thailand" },
  headers: {
    "x-rapidapi-key": "ff3c6ad228msh37d5d1150b04db0p1dbda1jsnf85d6e8aefa7",
    "x-rapidapi-host": "covid-193.p.rapidapi.com"
  }
};

export default {
  layout: "default",
  components: {
    // BarChart,
    // DoughnutChart,
    // LineChart
  },
  head() {
    return {
      title: `Dashboard`
    };
  },
  data: () => ({
    info: {}
  }),
  async asyncData({ $axios }) {},
  mounted() {
    let self = this
    axios
      .request(options)
      .then(function(response) {
        console.log(response.data);
        self.info = response.data.response[0];
        console.log(self.info);
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
