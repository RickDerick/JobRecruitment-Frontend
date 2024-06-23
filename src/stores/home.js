import { defineStore } from "pinia";
import authService from "../modules/Auth/authService";
import constants from "./constants";
import { useGlobalStore } from "../stores";
import { call } from "../services";

export const useHomeStore = defineStore('home', {

  state: () => ({
    categories: [],
    jobs: [],
  }),

  getters: {
    homeStoreGetters: (state) => (key) => state[key],
  },

  actions: {
    setHomeStoreLoader(status) {
      const globalStore = useGlobalStore();
      globalStore.setGlobalLoader(status);
    },

    getCategories() {
      this.setHomeStoreLoader(true);
      call("get", constants.categories)
        .then((res) => {
            this.$patch({
                categories: res.data,
              });
          this.setHomeStoreLoader(false);
        })
        .catch((err) => {
          this.toast.error(err?.response?.data?.message);
        });
    },

    getJobs() {
      this.setHomeStoreLoader(true);
      call("get", constants.jobs)
        .then((res) => {
          this.jobs = res.data;
          this.setHomeStoreLoader(false);
        })
        .catch((err) => {
          this.toast.error(err?.response?.data?.message);
        });
    }
  }
});
