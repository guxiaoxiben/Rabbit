import { ApiRes } from '@/types/data'
import { GoodsInfo } from '@/types/data'
import request from '@/utils/request'
import { defineStore } from 'pinia'

const useGoodStore = defineStore('goods', {
    state: () => ({
        // 商品详细信息
        info: {} as GoodsInfo,
    }),
    actions: {
        async getGoodsInfo(id: string) {
            const res = await request.get<ApiRes<GoodsInfo>>('/goods', {
                params: {
                    id,
                },
            })
            this.info = res.data.result
        },
    },
})
export default useGoodStore