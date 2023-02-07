declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const vueComponent: DefineComponent<{}, {}, any>

    export default vueComponent
}


/**QQ互联 QC命名空间 */
declare namespace QC {
    type callbackFn = (openId: string) => void
    const Login: {
        /**退出 */
        signOut: () => void
        /**
         * 检查QQ是否登录成功
         */
        check: () => boolean
        /**
         * 获取openId
         */
        getMe: (callback: callbackFn) => void
    }
    const api: (api: 'get_user_info') => { success: (res: any) => void }
}