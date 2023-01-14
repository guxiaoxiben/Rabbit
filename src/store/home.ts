import { ApiRes, BannerItem, GoodItem, HotGoods, Brand, HomeProduct, Special } from '@/types/data'
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
            hotGoodList: [] as HotGoods[],
            // 热门品牌
            brandList: [] as Brand[],
            // 商品推荐
            productList: [] as HomeProduct[],
            // 最新专题
            specialList: [] as Special[],
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
        },
        async getBrandList() {
            const res = await request.get<ApiRes<Brand[]>>('/home/brand')
            this.brandList = res.data.result
        },
        async getProductList() {
            const res = await request.get<ApiRes<HomeProduct[]>>('/home/goods')
            this.productList = res.data.result
        },
        async getSpecialList() {
            const res = await request.get<ApiRes<Special[]>>('/home/special')
            this.specialList = res.data.result
        },
    },
})
export default useHomeStore