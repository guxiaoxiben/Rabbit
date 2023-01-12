// 统一的注册所有的全局组件
import XtxSkeleton from '@/components/skeleton/index.vue'
import Xtxcarousel from './carousel/index.vue'
import { App } from 'vue'
export default {
    install(app: App) {
        app.component('XtxSkeleton', XtxSkeleton)
        app.component('Xtxcarousel', Xtxcarousel)
    },
}