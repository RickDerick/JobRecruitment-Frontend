import { defineStore } from 'pinia';
import { AuthService } from '../modules/Auth';
import constants from './constants';
import { call } from '@/service';
import { useGlobalStore } from "@/store";

export const useAuthStore = defineStore('auth', {
    state: () =>({
        loading: false,
        otpModal: false,
        openforgotOtp: false,
        userData: [],

    }),
    getters: {
        authStoreGetters: (state) => (key) => state[key],
      },
      actions:{
        //set authStore loader
        setAuthStoreLoader(status){
          const globalStore = useGlobalStore();
          globalStore.setGlobalLoader(status);
        },
        sendOtp(data){
          this.setAuthStoreLoader(true);
          call("post", constants.sendOtp, data)
          .then((res)=>{
            res.data.data
          })
          .catch((err)=>{
            this.setAuthStoreLoader(false);
            
          })
          
        }
      }
})