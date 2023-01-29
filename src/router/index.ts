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
            ],
        },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue')
        },
        {
            path: '/playround',
            component: () => import('@/views/playround/index.vue')
        }
    ]
})

export default router