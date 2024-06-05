<template>
  <v-container class="fill-height d-flex flex-column align-content-center">
    <v-dialog v-model="dialog" persistent>
      <v-overlay opacity="0" class="black--text" absolute>
        <v-row style="width: 90vw">
          <v-col cols="12" md="4" offset-md="4">
            <v-card tile light>
              <v-card-title> Login to account </v-card-title>

              <v-card-text class="mt-5">
                <v-form ref="loginForm" v-model="isValid">
                  <!--User name-->
                  <v-text-field
                    @keyup.enter.prevent="login"
                    ref="email"
                    label="Email address"
                    :rules="rules.email"
                    v-model="formData.email"
                    outlined
                    placeholder="Enter email address"
                  />

                  <!-- Password -->
                  <v-text-field
                    @keyup.enter.prevent="login"
                    ref="password"
                    :rules="rules.password"
                    label="Password"
                    v-model="formData.password"
                    outlined
                    placeholder="Enter Password"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />
                </v-form>
              </v-card-text>

              <v-card-actions class="mt-n5 justify-center">
                <v-col cols="12">
                  <v-btn @click="login" color="primary" class="mt-n5" block>
                    Login
                  </v-btn>

                  <v-btn
                    class="mt-0 text-lowercase text-decoration-underline"
                    text
                    :to="{ name: 'forgotPassword' }"
                  >
                    Forgot password?</v-btn
                  >
                  <p class="text-center overline grey--text">
                    dont have an account?
                  </p>
                  <v-btn
                    :to="{ name: 'Register', params: { code: routeParams } }"
                    color="secondary"
                    block
                  >
                    register
                  </v-btn>

                  <p class="text-center overline grey--text">or</p>

                  <v-btn
                    @click="linkedinLogin"
                    color="blue"
                    block
                    class="mt-n3 white--text"
                  >
                    signin with LinkedIn
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-overlay>
    </v-dialog>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/store/auth";
export default {
  name: "login",
  components: { RequestAccess },

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

  computed: {

    routeParams() {
      return this.$route.params.code;
    },
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
  watch: {
    getUserData: {
      handler: function () {
        if (this.getUserData.length > 0) {
          this.test = this.getUserData;
        }
      },
    },
  },
};
</script>

<style scoped>
@import url("../styles.css");

.v-input__append-outer {
  margin-top: 8px;
}
</style>
