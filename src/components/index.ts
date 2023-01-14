// 统一的注册所有的全局组件
import XtxSkeleton from '@/components/skeleton/index.vue'
import Xtxcarousel from './carousel/index.vue'
import XtxMore from './more/index.vue'
import XtxBread from './Bread/index.vue'
import XtxBreadItem from './Bread/Item.vue'
import { App } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'
export default {
    install(app: App) {
        app.component('XtxSkeleton', XtxSkeleton)
        app.component('Xtxcarousel', Xtxcarousel)
        app.component('XtxMore', XtxMore)
        app.component('XtxBread', XtxBread)
        app.component('XtxBreadItem', XtxBreadItem)
        // 自定义指令
        app.directive('lazy', {
            mounted(el: HTMLImageElement, { value }) {
                // 图片的懒加载逻辑
                // 参数1：回调函数
                // 参数2：可选的配置
                const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
                    if (isIntersecting) {
                        // 停止监听
                        stop()
                        // 给el元素设置src属性
                        // value = '123.jpg'
                        el.src = value
                        // 如果图片加载失败，显示默认的图片
                        el.onerror = function () {
                            el.src = defaultImg
                        }
                    }
                })
            }
        })
    },
}