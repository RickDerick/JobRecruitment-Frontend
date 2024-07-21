import { createApp } from 'vue';
import App from './App.vue';
//import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {pinia} from "./Plugins/pinia";
import auth from "./modules/Auth";
import {router} from "./routes";
import vuetify from "./Plugins/vuetify";
import home from "./modules/home";
import loader from "./Plugins/loader"
// import profile from "./modules/profile";
// import landing from "./modules/landing"


// app defined plugins
// app.use(profile, options);
// app.use(landing, options);

const app = createApp(App)
const options = { router};
app.use(home, options);
app.use(auth, options);
app.use(Vue3Toasity, {
    autoClose: 2000,
    style: {
      opacity: "1",
      userSelect: "initial",
    },
  });

// app.use(VueTelInputVuetify);
app.use(pinia);
app.use(loader);
app.use(vuetify).use(router).mount('#app')
