import { createPinia } from 'pinia';
import {router} from "@/modules/Plugins/router";
import {  markRaw } from "vue";
import {authService} from "@/modules/Auth/authService";

const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
    store.authService = markRaw(authService);
  });