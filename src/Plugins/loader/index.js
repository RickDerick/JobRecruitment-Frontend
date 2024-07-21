import Spinner from "./views/Spinner.vue";

export default {
  install(app) {
    app.component("loader", Spinner);
  },
};
