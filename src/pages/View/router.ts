import Router from 'vue-router';
import Vue from 'vue';
import Home from '../View/components/home/index.vue';
import Static from '../View/components/static/index.vue'

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
        },
    ]
});

export default router;