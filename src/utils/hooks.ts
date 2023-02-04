// 自定义一些通用的compositions api
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'

/**
 * 封装通用的数据懒加载api
 */
export function useLazyData(apiFn: () => void) {
    // 通过 ref 获得组件实例
    const target = ref(null)
    const { stop } = useIntersectionObserver(
        // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
        target,
        // isIntersecting 是否进入可视区域，true是进入 false是移出
        // observerElement 被观察的dom
        ([{ isIntersecting }]) => {
            // 在此处可根据isIntersecting来判断，然后做业务
            if (isIntersecting) {
                stop()
                apiFn()
            }
        },
        {
            // 进入可视区域 就加载数据
            threshold: 0
        }
    )
    return target
}
export function useCountDown(count: number = 60) {
    const time = ref(0)
    const { pause, resume } = useIntervalFn(
        () => {
            time.value--
            if (time.value === 0) {
                pause()
            }
        },
        1000,
        { immediate: false }
    )

    // 组件销毁时清除定时器
    onUnmounted(() => {
        pause()
    })

    const start = () => {
        time.value = count
        resume()
    }

    return {
        time,
        start
    }
}