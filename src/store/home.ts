import { ApiRes, BannerItem, GoodItem, HotGoods } from '@/types/data'
import request from '@/utils/request'
import { defineStore } from 'pinia'

const useHomeStore = defineStore('home', {
    state() {
        return {
            // 轮播数据
            bannerList: [] as BannerItem[],
            // 新鲜好物数据
            newGoodList: [] as GoodItem[],
            // 人气推荐数据
            hotGoodList: [] as HotGoods[]
        }
    },
    actions: {
        async getBannerList() {
            const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
            this.bannerList = res.data.result
        },
        async getNewList() {
            const res = await request.get<ApiRes<GoodItem[]>>('/home/new')
            this.newGoodList = res.data.result
        },
        async getHotList() {
            const res = await request.get<ApiRes<HotGoods[]>>('/home/hot')
            this.hotGoodList = res.data.result
        }
    },
})
export default useHomeStore