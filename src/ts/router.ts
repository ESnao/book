import Router from 'vue-router';
import Vue from 'vue';
import Main from '../pages/View/index.vue';
import Home from '../pages/View/components/home/index.vue';
import Static from '../pages/View/components/static/index.vue';
import Login from '../pages/Login.vue'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main,
            redirect: '/home',
            children:[
                { path:'/home',component:Home },
                { path:'/static',component:Static }
            ]
        },

        {
            path: '/login',
            component: Login
        }
    ]
});

export default router;