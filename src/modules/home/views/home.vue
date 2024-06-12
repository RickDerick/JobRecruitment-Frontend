<template>
    <v-app>
      <v-app-bar app>
        <h5>Logo</h5>
         <span>company name</span>
        <v-spacer />
  
        <v-btn
          color="primary"
          text
          class="mx-2"
        >
          Login
        </v-btn>
      </v-app-bar>
  
      <v-main class="background">
        <router-view name="view" />
        <router-view name="action" />
      </v-main>
      <app-footer />
    </v-app>
  </template>
  
  <script>
  import AppFooter from "../../../components/app-footer.vue";
  // import { AuthService } from "../../Auth";
  export default {
    name: "home",
    components: { AppFooter },

  }

  </script>
  
  <style scoped>
</style>
  