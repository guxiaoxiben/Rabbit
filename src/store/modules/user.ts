import { defineStore } from 'pinia'
import { ApiRes } from '@/types/data'
import { Profile } from '@/types/user'
import request from '@/utils/request'
import Message from '@/components/message'

const useUserStore = defineStore({
    id: 'user',
    // 状态
    state() {
        // const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
        let userInfo: any = localStorage.getItem('userInfo')
        if (!userInfo) {
            userInfo = {}
        } else {
            userInfo = JSON.parse(userInfo)
        }
        return {
            // 个人信息
            profile: userInfo as Profile,
        }
    },
    actions: {
        /**用户名和密码登录 */
        async login(account: string, password: string) {
            const res = await request.post<ApiRes<Profile>>('/login', {
                account,
                password,
            })
            this.profile = res.data.result
            localStorage.setItem("userInfo", JSON.stringify(res.data.result))
        },
        /**退出 */
        logout() {
            localStorage.removeItem('userInfo')
            this.profile = {} as Profile
            Message({ type: "success", text: "退出成功" })
        },
        /**获取手机验证码 */
        async sendMobileMsg(mobile: string) {
            await request.get('/login/code', {
                params: {
                    mobile
                }
            })
        },
        /**手机号登录 */
        async mobileLogin(mobile: string, code: string) {
            const res = await request.post<ApiRes<Profile>>('/login/code', {
                mobile,
                code
            })
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
        },
    }
})
export default useUserStore