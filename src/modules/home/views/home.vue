<template>
    <v-app>
      <v-app-bar app>
        <Logo />
        <!-- <span>{{ company.displayName }}</span> -->
        <v-spacer />
  
        <v-btn
          color="primary"
          v-if="!auth.check()"
          text
          :to="{ name: 'Login' }"
          class="mx-2"
        >
          Login
        </v-btn>
  
        <!-- <profileHeader class="" v-else /> -->
      </v-app-bar>
  
      <v-main class="background">
        <router-view name="view" />
        <router-view name="action" />
      </v-main>
  
      <loader />
  
      <app-footer />
  
      <app-alert />
  
      <confirmation />
    </v-app>
  </template>
  
  <script>
  import AppFooter from "@/components/app-footer";
  import { AuthService } from "@/modules/auth";
//   import profileHeader from "../../home/components/profileHeader.vue";
//   import Logo from "@/components/Logo";
  import Confirmation from "@/plugins/confirmtion/Confirmation.vue";
  export default {
    name: "home",
    components: { AppFooter, Confirmation },
  
    beforeRouteEnter(to, from, next) {
      next((v) => {
        v.$store.dispatch("Home/getCategories");
        v.$store.dispatch("Home/getJobs");
        v.$store.dispatch("Landing/getCompanyInfo");
        if (AuthService.check()) {
          v.$store.dispatch("Profile/getProfile");
        }
      });
    },
  
    computed: {
      auth() {
        return AuthService;
      },
      company() {
        return this.$store.getters["Landing/landingGetters"]("company");
      },
    },
  };
  </script>
  
  <style scoped></style>
  