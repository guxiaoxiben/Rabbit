import { defineStore } from 'pinia'
import { ApiRes } from '@/types/data'
import { Profile } from '@/types/user'
import request from '@/utils/request'
import Message from '@/components/message'
import { getProfile, removeProfile, setProfile } from '@/utils/storage'


const useUserStore = defineStore({
    id: 'user',
    // 状态
    state() {
        return {
            profile: getProfile()
        }
        // const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
        // let userInfo: any = getProfile()
        // if (!userInfo) {
        //     userInfo = {}
        // } else {
        //     userInfo = JSON.parse(userInfo)
        // }
        // return {
        //     // 个人信息
        //     profile: userInfo as Profile,
        // }
    },
    actions: {
        /**用户名和密码登录 */
        async login(account: string, password: string) {
            const res = await request.post<ApiRes<Profile>>('/login', {
                account,
                password,
            })
            this.profile = res.data.result
            setProfile(res.data.result)
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
            setProfile(res.data.result)
        },
        /**QQ密码登录 */
        async qqLogin(openId: string) {
            const res = await request.post<ApiRes<Profile>>('/login/social', {
                unionId: openId,
                source: 6
            })
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
            setProfile(res.data.result)
        },
        /**绑定QQ的短信验证码 */
        async sendQQBindMsg(mobile: string) {
            await request.get('/login/social/code', {
                params: {
                    mobile
                }
            })
        },
        /**提供绑定的actions */
        async qqBindLogin(openId: string, mobile: string, code: string) {
            const res = await request.post<ApiRes<Profile>>('/login/social/bind', {
                mobile,
                code,
                unionId: openId
            })
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
            setProfile(res.data.result)
        },
        /**退出 */
        logout() {
            this.profile = {} as Profile
            removeProfile()
        },
    }
})
export default useUserStore