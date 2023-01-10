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
            this.list = res.data.result
        }
    }
})

export default useCategoryStore