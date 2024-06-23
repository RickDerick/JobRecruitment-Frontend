import { createPinia } from 'pinia';
import {router} from "../../routes";
import { markRaw } from "vue";
import {AuthService} from "../../modules/Auth";
import { toast } from "vue3-toastify";

export const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
    store.toast = markRaw(toast);
    store.authService = markRaw(AuthService);
  });