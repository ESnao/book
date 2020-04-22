import Router from 'vue-router';
import Vue from 'vue';
import Main from '../pages/View/index.vue';
import Login from '../pages/Login.vue'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/login',
            component: Login
        }
    ]
});

export default router;