import { ApiRes } from '@/types/data'
import { GoodsInfo } from '@/types/goods'
import request from '@/utils/request'
import { defineStore } from 'pinia'

const useGoodStore = defineStore('goods', {
    state: () => ({
        // 商品详细信息
        info: {} as GoodsInfo,
    }),
    actions: {
        /**
         * 获取数据
         */
        async getGoodsInfo(id: string) {
            const res = await request.get<ApiRes<GoodsInfo>>('/goods', {
                params: {
                    id,
                },
            })
            this.info = res.data.result
        },
        /**
         * 重置数据
         */
        resetGoodsInfo() {
            this.info = {} as GoodsInfo
        }
    },
})
export default useGoodStore