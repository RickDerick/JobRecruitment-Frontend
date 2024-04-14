import { defineStore } from 'pinia';
import { AuthService } from '../modules/Auth';
import constants from './constants';
import { call } from '@/service';

export const useAuthStore = defineStore('auth', {
    state: () =>({
        otpModal: false,
        openforgotOtp: false,
        userData: [],

    }),
    getters: {
        authStoreGetters: (state) => (key) => state[key],
      },
      actions:{
        //
      }
})