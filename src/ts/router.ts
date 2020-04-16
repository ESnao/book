import Router from 'vue-router';
import Vue from 'vue';
import Home from '../pages/Home.vue';
import Static from '../pages/Static.vue';
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/Static',
            component: Static
        }
    ]
});

export default router;