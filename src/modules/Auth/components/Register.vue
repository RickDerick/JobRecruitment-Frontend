<template>
    <v-container fluid class="fill-height d-flex flex-row align-center">
      <v-row>
        <v-col md="4" sm="12" offset-md="4">
          <v-card>
            <v-card-title
              class="d-flex flex-row justify-center font-weight-black"
            >
              REGISTER
            </v-card-title>
  
            <v-card-text class="text-justify mt-4 pb-0">
              <v-row no-gutters>
                <v-col cols="12" md="4">
                  <v-text-field
                    dense
                    outlined
                    label="First Name"
                    placeholder="Enter Your First Name"
                    v-model="formData.firstName"
                    ref="firstName"
                    :rules="rules.firstName"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    dense
                    outlined
                    label="Second Name"
                    placeholder="Enter Your Second Name"
                    v-model="formData.secondName"
                    ref="secondName"
                    class="mx-1"
                    :rules="rules.secondName"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    dense
                    outlined
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    v-model="formData.lastName"
                    ref="lastName"
                    :rules="rules.lastName"
                  />
                </v-col>
              </v-row>
  
              <v-text-field
                dense
                outlined
                label="Email Address"
                placeholder="Enter your Email Address"
                v-model="formData.email"
                ref="email"
                :rules="rules.email"
              />
  
              <vue-tel-input-vuetify
                required
                clearable
                placeholder="Enter Phone Number"
                label="Phone Number"
                autofocus
                :inputOptions="{
                  showDialCode: true,
                  tabindex: 1,
                }"
                outlined
                dense
                v-model="formData.phone"
                defaultCountry="KE"
                :onlyCountries="['KE', 'UG', 'TZ']"
                :rules="rules.phone"
              ></vue-tel-input-vuetify>
  
              <v-text-field
                dense
                outlined
                label="Password"
                placeholder="Enter your Password"
                v-model="formData.password"
                ref="password"
                :rules="rules.password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                dense
                outlined
                label="Confirm Password"
                placeholder="Confirm Password"
                v-model="formData.confirmPassword"
                ref="confirmPassword"
                :rules="rules.confirmPassword"
                :append-icon="showConfPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showConfPassword ? 'text' : 'password'"
                @click:append="showConfPassword = !showConfPassword"
              />
            </v-card-text>
            <v-card-actions class="d-flex flex-row justify-end">
              <v-btn @click="register" block color="primary">
                Create my account
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <Verify :userEmail="userEmail" />
    </v-container>
  </template>
  
  <script>
  import Verify from "./Verify";
  import { useAuthStore } from "@/store/auth";
  export default {
    name: "Register",
    components: {
      Verify,
    },
  setup(){
    const authStore = useAuthStore();
    return {authStore}
  },
    data: function () {
      return {
        formData: {
          email: "",
          phone: "",
          password: "",
          avatar: null,
          firstName: "",
          lastName: "",
          secondName: "",
        },
        userEmail: "",
        showPassword: false,
        showConfPassword: false,
      };
    },
  
    computed: {
      rules() {
        return {
          email: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+/.test(v) || "E-mail must be valid",
          ],
          password: [(v) => !!v || "Password is required"],
          phone: [(v) => !!v || "Phone is required"],
          firstName: [(v) => !!v || "First Name is required"],
          lastName: [(v) => !!v || "Last Name is required"],
          secondName: [(v) => !!v || "Second Name is required"],
          confirmPassword: [
            (v) => !!v || "Password is required",
            (v) => v === this.formData.password || "Password does not match",
          ],
        };
      },
  
      requirements() {
        return this.$store.getters["Auth/requirements"];
      },
    },
  
    methods: {
      register: function () {
        let isValid = true;
        for (const key in this.formData) {
          if (this.$refs[key])
            isValid = isValid ? this.$refs[key].validate(true) : false;
        }
  
        if (isValid)
          this.authStore.register( ...this.formData);
        this.userEmail = this.formData.email;
      },
    },
  };
  </script>
  
  <style scoped></style>
  