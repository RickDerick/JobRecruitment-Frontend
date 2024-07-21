import { defineStore } from "pinia";
import authService from "../modules/Auth/authService";
import constants from "./constants";
import { useGlobalStore } from "../stores";
import { call } from "../services";

export const useHomeStore = defineStore('home', {

  state: () => ({
    categories: [],
    allJobs: [],
  }),

  mutations: {
    MUTATE: (state, payload) => {
      state[payload.state] = payload.value;
    },
  },

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
                categories: res.data.data,
              });
          this.setHomeStoreLoader(false);
        })
        .catch((err) => {
          this.toast.error(err?.response?.data?.message);
        });
    },

    getJobs() {
      this.setHomeStoreLoader(true);
      call("get", constants.allJobs)
        .then((res) => {
          this.$patch({
            allJobs: res.data.data,
          });
          this.setHomeStoreLoader(false);
        })
        .catch((err) => {
          this.toast.error(err?.response?.data?.message);
        });
    }
  }
});
