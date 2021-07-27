<template>
  <v-dialog
    content-class="dialog-default"
    v-model="dialog"
    max-width="300"
    persistent
  >
    <v-card class="pa-4 rounded-lg">
      <div class="mb-3 load-text">{{ message }}</div>
      <v-progress-linear
        indeterminate
        color="deep-purple accent-4"
        class="mb-0"
      ></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      message: null,
      defaultMessage: "Loading"
    };
  },
  methods: {
    open(message) {
      this.dialog = true;
      this.message = this.defaultMessage;
      if (message != null) {
        this.message = message;
      }
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
  .v-card {
    color: #0277bd;
    padding: 10px 0;

    .v-progress-linear {
      border-radius: 0;
    }
    .load-text {
      color: #6200ea;
    }
  }
}
</style>
