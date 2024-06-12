import { defineStore } from 'pinia';
import { AuthService } from '../modules/Auth';
import constants from './constants';
import { call } from '@/service';
import { useGlobalStore } from "@/store";

export const useAuthStore = defineStore('auth', {
    state: () =>({
        loading: false,
        otpModal: false,
        passwordSetSuccess: false,
        forgotOtp: false,
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
        setPasswordSetSuccess(status) {
          this.passwordSetSuccess = status;
        },
        openforgotOtp(payload) {
          this.$patch({
            forgotOtp: payload,
          });
        },
        // OTP request
    openOtp(payload) {
      this.$patch({
        otpModal: payload,
      });
    },

    resetPassword(data) {
      this.setAuthStoreLoader(true);
      call("post", constants.register, data)
        .then((res) => {
          this.setAuthStoreLoader(false);
          this.router.push({ name: "dashboard" });
        })
        .catch((err) => {
          this.toast.error(err?.response?.data?.message);
          this.setAuthStoreLoader(false);
        });
    },

        register: (data) => {
          this.setAuthStoreLoader(true);
          call("post", constants.register, data)
            .then((res) => {
              this.setAuthStoreLoader(false);
              this.toast.success(res.data.message);
              this.openOtp(true);
            })
            .catch((err) => {
              commit("SET_LOADING", false, { root: true });
              Event.$emit("ApiError", err.response.data.message);
            });
        },

        login: (data) => {
          call("post", constants.login, data)
            .then((res) => {
              if (res.data.data.authStatus === "success") {
                AuthService.login(res.data.data.token, res.data.data.user);
                this.setAuthStoreLoader(true);
              } else {
                if (res.data.data.authStatus === "error") {
                  // Event.$emit("ApiError", res.data.data.email[0]);
                  this.toast.error(err?.res?.data?.email[0])
                  this.setAuthStoreLoader(false)
                }
              }
            })
            .catch((err)=>{
              this.setAuthStoreLoader(false);
              this.toast.error(err?.response?.data?.message);
            })
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
          
        },

        verifyforgotOtp(data) {
          this.setAuthStoreLoader(true);
          call("post", constants.passwordReset, data)
            .then((res) => {
              this.setAuthStoreLoader(false);
              this.toast.success("OTP succefully verified");
              this.router.push({ name: "setPassword" });
            })
            .catch((err) => {
              this.setAuthStoreLoader(false);
              this.toast.error(err?.response?.data?.message);
            });
        },

        linkedinLogin: () => {
          this.setAuthStoreLoader(true);
          call("get", constants.linkedinLogin)
            .then((res) => {
              window.location = res.data.data;
              this.setAuthStoreLoader(false);
            })
            .catch((err)=>{
              this.setAuthStoreLoader(false);
              this.toast.error(err?.response?.data?.message);
            })
            
        },

      }
})