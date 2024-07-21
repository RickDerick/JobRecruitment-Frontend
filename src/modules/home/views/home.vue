<template>
    <v-app>
      <v-app-bar>
        <!-- To insert a company logo later -->
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
         <span>company name</span>
        <v-spacer />
        <v-btn
          color="primary"
          text
          class="mx-2"
          v-if="!auth.check()"
          :to="{name: 'Login'}"
        >
          Login
        </v-btn>
        <!-- <profileHeader class="" v-else /> -->
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
  import { AuthService } from "../../Auth";
  export default {
    name: "home",
    components: { AppFooter },

    data() {
      return{

      }
    },

    computed:{
        auth(){
          return AuthService
        }
      }

  }

  </script>
  
  <style scoped>
</style>
  