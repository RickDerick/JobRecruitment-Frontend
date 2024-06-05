<template>
    <v-dialog
      v-model="dialog"
      persistent
      width="600"
    >
      <v-card
      >
        <v-card-title class="text-h5 text-center primary lighten-2">
            <v-spacer />
            <h1
                class="text-center mb-3 font-weight-light"
                style="font-size: 40px"
            >
                <p>Verify OTP code</p>
            </h1>
            <v-spacer />
            <p>send to your email</p>
            
        </v-card-title>
        <v-card-text>
          <v-otp-input
            length="6"
            v-model="otp_code"
            @finish="verifyOtp"
            class="mt-6"
          /></v-card-text>

        <v-divider />
        <v-card-actions>
            <v-btn  @click="sendOtp">
                Resend OTP
            </v-btn>
    
            <v-spacer />
    
            <v-btn
                :disabled="otp_code.length < 6"
                @click="verifyOtp"
                color="primary"
              >
                Verify OTP
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import { useAuthStore } from '@/store/auth'
export default{
  name:"Verify",
  props: {
    userEmail: String,
  },
  setup(){
      const authStore = useAuthStore();
      return {authStore}
  },

  data: function () {
    return {
      otp_code: "",
    };
  },
  
  computed: {
    dialog: {
      get() {
        return this.authStore.authStoreGetters("otpModal");
      },
      set(value) {
        this.authStore.openOtp(value);
      },
    },
  },

  methods: {
    verifyOtp: function () {
      const data = {
        otp: this.otp_code,
        email: this.userEmail,
      };
      this.authStore.verifyOtp(data)
    },

    sendOtp: function () {
      const data = {
        email: this.userEmail,
      };
      this.authStore.sendOtp(data)
    },
  },
}
</script>