import request from '@/utils/request'
import { defineStore } from 'pinia'
import { ApiRes, CategoryItem } from '@/types/data'
import { topCategory } from '../constants'
const defaultCategory = topCategory.map((item) => {
    return {
        name: item,
    }
})
const useCategoryStore = defineStore('category', {
    state() {
        return {
            list: defaultCategory as CategoryItem[],
        }
    },
    getters: {},
    actions: {
        async getAllCategory() {
            const res = await request.get<ApiRes<CategoryItem[]>>('/home/category/head')
            // 给数据加上open属性方便页面二级菜单渲染
            res.data.result.forEach(item => {
                item.open = false
            })

            this.list = res.data.result
        },
        // 显示
        show(id: string): void {
            const category = this.list.find((item) => item.id === id)
            category!.open = true
        },
        // 隐藏
        hide(id: string): void {
            const category = this.list.find((item) => item.id === id)
            category!.open = false
        },
    }
})

export default useCategoryStore