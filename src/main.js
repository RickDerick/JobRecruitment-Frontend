import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {pinia} from "./Plugins/pinia";
import auth from "./modules/Auth";
// import home from "./modules/home";
// import profile from "./modules/profile";
// import landing from "./modules/landing"


// app defined plugins

const options = { router};
app.use(auth, options);
// app.use(home, options);
// app.use(profile, options);
// app.use(landing, options);

const app = createApp(App)
app.use(Vue3Toasity, {
    autoClose: 2000,
    style: {
      opacity: "1",
      userSelect: "initial",
    },
  });
  
app.use(pinia)
app.use(vuetify).use(router).use(VueTelInputVuetify).mount('#app')
