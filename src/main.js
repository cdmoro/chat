import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import store from "./store";

import "./app.css";
import EvaIcons from 'vue-eva-icons'

Vue.use(EvaIcons)

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
