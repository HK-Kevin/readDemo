import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [
                {
                    path: '/updateVideo',
                    component: resolve => require(['../components/page/video/Update.vue'], resolve)
                },
                {
                    path: '/addUser',
                    component: resolve => require(['../components/page/user/AddUser.vue'], resolve)
                },
                {
                    path: '/updateUser',
                    component: resolve => require(['../components/page/user/Update.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
