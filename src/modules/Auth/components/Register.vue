<template>
  <v-container fluid class="fill-height d-flex flex-row align-center">
    <v-dialog v-model="dialog" persistent>
      <v-row>
        <v-col md="4" sm="12" offset-md="4">
          <v-card>
            <v-card-title class="d-flex flex-row justify-center font-weight-black">
              REGISTER
            </v-card-title>
           
            <v-card-text class="text-justify mt-4 pb-0">
              <v-row no-gutters>
              <v-col cols="12" md="4">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  label="First Name"
                  placeholder="Enter Your First Name"
                  v-model="formData.firstName"
                  ref="firstName"
                  :rules="rules.firstName"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  label="Middle Name"
                  placeholder="Enter Your Middle Name"
                  v-model="formData.secondName"
                  ref="secondName"
                  :rules="rules.secondName"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  label="Last Name"
                  placeholder="Enter Your Last Name"
                  v-model="formData.lastName"
                  ref="lastName"
                  :rules="rules.lastName"
                />
              </v-col>
            </v-row>
               
                <v-text-field
                  density="compact"
                  variant="outlined"
                  prepend-inner-icon="mdi-email-outline"
                  label="Email Address"
                  placeholder="Enter your Email Address"
                  v-model="formData.email"
                  ref="email"
                  :rules="rules.email"
                />
                <v-text-field
                  placeholder="Enter Phone Number"
                  label="Phone Number"
                  density="compact"
                  variant="outlined"
                  ref="email"
                  v-model="formData.phone_no"
                  :rules="rules.phone_no"
                />
                <v-text-field
                  density="compact"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="rules.password"
                  placeholder="Enter your password"
                  label="Password"
                  prepend-inner-icon="mdi-lock-outline"
                  v-model="formData.password"
                  variant="outlined"
                  @click:append-inner="showPassword = !showPassword"
                />
                <v-text-field
                  density="compact"
                  variant="outlined"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  v-model="formData.confirmPassword"
                  ref="confirmPassword"
                  :rules="rules.confirmPassword"
                  :append-inner-icon="showConfPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showConfPassword ? 'text' : 'password'"
                   @click:append-inner="showConfPassword = !showConfPassword"
                />
            </v-card-text>
            <v-card-actions class="d-flex flex-row justify-end">
                <v-btn @click="register" color="primary" class="mt-n5" variant="flat" block>
                  Create Account
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>

    <Verify :userEmail="userEmail" />
  </v-container>
</template>

<script>
import Verify from "./verify.vue";
import { useAuthStore } from "../../../stores/auth";

export default {
  name: "Register",
  components: {
    Verify,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      formData: {
        email: "",
        phone_no: "",
        password: "",
        avatar: null,
        firstName: "",
        lastName: "",
        secondName: "",
        confirmPassword: "",
      },
      userEmail: "",
      showPassword: false,
      showConfPassword: false,
      dialog: true,
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
        phone_no: [(v) => !!v || "Phone is required"],
        firstName: [(v) => !!v || "First Name is required"],
        lastName: [(v) => !!v || "Last Name is required"],
        secondName: [],
        confirmPassword: [
          (v) => !!v || "Password is required",
          (v) => v === this.formData.password || "Password does not match",
        ],
      };
    },
  },
  methods: {
    register() {
      let isValid = true;
      for (const key in this.formData) {
        if (this.$refs[key]) isValid = isValid ? this.$refs[key].validate(true) : false;
      }
      if (isValid) this.authStore.register({...this.formData});
      this.userEmail = this.formData.email;
    },
  },
};
</script>

<style scoped></style>
