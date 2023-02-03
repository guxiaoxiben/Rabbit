import { defineStore } from 'pinia'
import { ApiRes } from '@/types/data'
import { Profile } from '@/types/user'
import request from '@/utils/request'

const useUserStore = defineStore({
    id: 'user',
    // 状态
    state() {
        return {
            // 个人信息
            profile: {} as Profile,
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
            console.log(this.profile);

        }
    }
})
export default useUserStore