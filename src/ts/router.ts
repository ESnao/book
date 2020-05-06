import Router from 'vue-router';
import Vue from 'vue';
import Main from '../pages/View/index.vue';
import Home from '../pages/View/components/home/index.vue';
import Static from '../pages/View/components/static/index.vue';
import Borrow from '../pages/View/components/borrow/index.vue';
import Book from '../pages/View/components/book/index.vue';
import OverDue from '../pages/View/components/overDue/index.vue';
import Thesis from '../pages/View/components/thesis/index.vue';
import Person from '../pages/View/components/person/index.vue';
import Permissions from '../pages/View/components/Permissions/index.vue';
import Static02 from '../pages/View/components/static02/index.vue';
import Static03 from '../pages/View/components/static03/index.vue';
import Static04 from '../pages/View/components/static04/index.vue';
import Static05 from '../pages/View/components/static05/index.vue';
import Static06 from '../pages/View/components/static06/index.vue';
import Static08 from '../pages/View/components/static08/index.vue';

import Login from '../pages/Login.vue'
Vue.use(Router);

const router = new Router({
    routes: [
        
        {
            path: '/home',
            redirect: '/home/main',
            component: Main,
            children:[
                { path:'/home/main',component:Home },
                { path:'/static',component:Static },
                { path:'/borrow',component:Borrow },
                { path:'/book/:name?',component:Book },
                { path:'/overDue',component:OverDue },
                { path:'/thesis/:name?',component:Thesis },
                { path:'/person',component:Person },
                { path:'/permissions',component:Permissions },
                { path:'/static02',component:Static02 },
                { path:'/static03',component:Static03 },
                { path:'/static04',component:Static04 },
                { path:'/static05',component:Static05 },
                { path:'/static06',component:Static06 },
                { path:'/static08',component:Static08 },

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