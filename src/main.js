import Vue from 'vue'
import App from './App.vue'
import "u-reset.css";
import router from '@/router'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import filter from "./filter/index"

require("u-reset.css");
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http=axios;
console.log(filter);
Object.keys(filter).forEach(ele=>{
    Vue.filter(ele,filter[ele]);
});
// Object.keys(filter).forEach(ele=>{
// //     Vue.filter(ele,filter(ele));
// // });

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
