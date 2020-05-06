// 创建Vue根实例
import Vue from 'vue';

// 导入组件
import App from '../App.vue';

// 导入路由
import router from './router';
// import store from './store';
import * as moment from "moment";

// 导入轮播图样式
import 'swiper/css/swiper.css';

import * as Cookies from "js-cookie";
import * as ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import { createAxiosPlugin } from '../base/axios/index.js';

Vue.use(ElementUI);
Vue.use(Cookies);
Vue.use(createAxiosPlugin());


// 创建Vue根实例
new Vue({
    // store,
    router,
    // moment,
    render: h => h(App)
  }).$mount('#app');