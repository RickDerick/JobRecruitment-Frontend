import { createPinia } from 'pinia';
import {router} from "../../routes";
import { markRaw } from "vue";
import {AuthService} from "../../modules/Auth";

export const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
    store.authService = markRaw(AuthService);
  });