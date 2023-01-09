import { createRouter, createMemoryHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            component: Layout
        },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue')
        }
    ]
})

export default router