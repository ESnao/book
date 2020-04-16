// 创建Vue根实例
import Vue from 'vue';

// 导入组件
import App from '../App.vue';

// 导入路由
import router from './router';

// 导入轮播图样式
import 'swiper/css/swiper.css';

// 创建Vue根实例
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})