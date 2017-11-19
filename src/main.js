import Vue from "vue";
import App from "./App";
import {routers,appRouter} from './router';
import VueRouter from 'vue-router';
import iView from "iview";
import "iview/dist/styles/iview.css";
import Util from "./libs/util";
import axios from 'axios';

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(axios);
Vue.config.productionTip = false;


// axios
axios.defaults.baseURL = Util.config.url;
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;



// router
const RouterConfig = {
  routes: routers
};
const router = new VueRouter(RouterConfig);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
