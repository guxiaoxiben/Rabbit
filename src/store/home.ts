import { ApiRes, BannerItem } from '@/types/data'
import request from '@/utils/request'
import { defineStore } from 'pinia'

const useHomeStore = defineStore('home', {
    state() {
        return {
            bannerList: [] as BannerItem[],
        }
    },
    actions: {
        async getBannerList() {
            // const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
            const res = await request.get('/home/banner')
            console.log(res)

            this.bannerList = res.data.result
        },
    },
})
export default useHomeStore