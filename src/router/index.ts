import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
const router = createRouter({
    history: createWebHashHistory(),
    // 滚动到页面顶部
    scrollBehavior: () => {
        return {
            top: 0,
        }
    },
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    component: Home,
                },
                {
                    path: '/category/:id',
                    component: () => import('@/views/category/index.vue'),
                },
                {
                    path: '/category/sub/:id',
                    component: () => import('@/views/category/sub.vue'),
                },
                {
                    path: '/goods/:id',
                    component: () => import('@/views/goods/index.vue'),
                },
            ],
        },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue')
        },
        {
            path: '/playground',
            component: () => import('@/views/playground/index.vue')
        },
        {
            path: '/login/callback',
            component: () => import('@/views/login/callback.vue')
        }
    ]
})

export default router