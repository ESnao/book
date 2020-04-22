import Router from 'vue-router';
import Vue from 'vue';
import Main from '../pages/View/index.vue';
import Home from '../pages/View/components/home/index.vue';
import Static from '../pages/View/components/static/index.vue';
import Borrow from '../pages/View/components/borrow/index.vue';
import Book from '../pages/View/components/book/index.vue';
import Login from '../pages/Login.vue'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        
        {
            path: '/home',
            redirect: '/home/main',
            component: Main,
            children:[
                { path:'/home/main',component:Home },
                { path:'/home/static',component:Static },
                { path:'/home/borrow',component:Borrow },
                { path:'/home/book',component:Book },
            ]
        },
        {
            path: '/login',
            component: Login
        },
        { path: '/', redirect: '/home' },
    ]
});

export default router;