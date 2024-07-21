<template>
  <v-container class="fill-height d-flex flex-column align-content-center">
    <v-dialog v-model="dialog" persistent>
      <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>
      </div>
    <v-row style="width: 90vw">
      <v-col cols="12" md="4" offset-md="4">
        <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
          >
    <v-card-title class="d-flex flex-row justify-center font-weight-black"> 
      Login to account 
    </v-card-title>
      <v-card-text class="mt-5">
        <v-form ref="loginForm">
          <v-text-field
             density="compact"
             placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            label="Email address"
            ref="email"
            v-model="formData.email"
          >
        </v-text-field>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          label="Password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
         >
         </v-text-field>
        </v-form>
      </v-card-text>

           <v-card-actions class="mt-n5 justify-center">
                <v-col cols="12">
                  <v-btn @click="login" color="primary" class="mt-n5"  variant="flat" block>
                    Login
                  </v-btn>

                  <v-btn
                    class="mt-0 text-lowercase text-decoration-underline"
                    text
                    :to="{ name: 'forgotPassword' }"
                  >
                    Forgot password?</v-btn
                  >
                  <p class="text-center text-high-emphasis grey--text">
                    dont have an account?
                  </p>
                  <v-btn
                    :to="{ name: 'Register', params: { code: routeParams } }"
                    color="blue"
                    variant="flat"
                    block
                  >
                    register
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
              </v-col>
            </v-row> 
            </v-dialog>
          </v-container>
    </template>
<script>
import { useAuthStore } from "../../../stores/auth";
export default {
  name: "login",
  components: {},

  setup(){
      const authStore = useAuthStore();
      return {authStore}
      // const globalStore = useGlobalStore();

    },

  data: function () {
    return {
      dialog: true,
      token: "",
      test: [],
      isValid: false,
      isValidPassword: false,
      showPassword: false,
      formData: {
        email: "",
        password: "",
        token: "",
      },
      rules: {
        email: [
          (value) => {
            const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid e-mail.";
          },
        ],
        required: [(value) => !!value || "Required."],
      },
      viewPassword: false,
    };
  },

  methods: {
    login: function () {
      this.$refs.loginForm.validate();
      if (this.isValid) {
        this.authStore.login(this.formData);
      }
    },
    // linkedinLogin: function () {
    //   this.$store.dispatch("Auth/linkedinLogin");
    // },

    emailMask: function (email) {
      if (!email) return "";

      const index = email.lastIndexOf("@");
      const prefix = email.substring(0, index);
      const postfix = email.substring(index);

      const mask = prefix
        .split("")
        .map(function (o, i) {
          if (i === 0 || i === index - 1) {
            return o;
          } else {
            return "*";
          }
        })
        .join("");

      return mask + postfix;
    },

    phoneMask: function (phoneNumber) {
      return phoneNumber ? phoneNumber.replace(/\d{5}$/, "*****") : "";
    },
  },
  // watch: {
  //   getUserData: {
  //     handler: function () {
  //       if (this.getUserData.length > 0) {
  //         this.test = this.getUserData;
  //       }
  //     },
  //   },
  // },
};
</script>

<style scoped>
</style>
