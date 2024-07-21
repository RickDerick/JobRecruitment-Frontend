import { defineStore } from 'pinia';
import { AuthService } from '../modules/Auth';
import constants from './constants';
import { call } from '../services';

export const useGlobalStore = defineStore ('global', {
    state: () => ({
        loading: false
    }),

    getters: {
        // global loader
        globalGetter: (state) =>(key) => state[key],
    },

    actions: {
        //function to set global loader
        setGlobalLoader(status){
            this.$patch({
                loading : status
            })
        }
    }

})

