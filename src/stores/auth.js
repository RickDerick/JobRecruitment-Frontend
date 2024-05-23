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
        openforgotOtp(payload) {
          this.$patch({
            forgotOtp: payload,
          });
        },

        sendOtp(data){
          this.setAuthStoreLoader(true);
          call("post", constants.sendOtp, data)
          .then((res)=>{
            this.toast.success(res.data.message);
          })
          .catch((err)=>{
            this.setAuthStoreLoader(false);
            this.toast.error(err?.response?.data?.message);
          })
          
        },
        
        forgotPassword(data){
          this.setAuthStoreLoader(true);
          call("post", constants.passwordReset, data)
          .then((res)=>{
            this.setAuthStoreLoader(false);
            //dispatch forgot-otp-sent
          this.openforgotOtp(true);
            this.toast.success("OTP has been sent to your email");
          })
          .catch((err)=>{
            this.setAuthStoreLoader(false);
            this.toast.error(err?.response?.data?.message);
          })
          
        }
      }
})