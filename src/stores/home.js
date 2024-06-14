import { defineStore } from "pinia";
import authService from "../modules/Auth/authService";
import constants from "./constants";
import {call} from "../services";

export const useHomeStore = defineStore('home', {

    state: () =>({
        categories: [],
    }),

    getters: {
        homeStoreGetters: (state) => (key) => state[key],
    },

    actions: {
        setHomeStoreLoader(status){
            const globalStore = useGlobalStore();
            globalStore.setGlobalLoader(status);
          },

          getCategories(){
            this.setHomeStoreLoader(true);
            call("get", constants.categories)
            .then((res)=>{
                this.$patch({
                    categories: res.data,
                })
                this.setHomeStoreLoader(false);
            })
            .catch((error) => {
                this.toast.error(error?.response?.data?.message);
              });

          }
    }
});

