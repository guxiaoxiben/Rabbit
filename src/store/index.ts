import useCategoryStore from "./modules/category";
import useHomeStore from './modules/home'
import useGoodStore from './modules/good'
export default function useStore() {
    return {
        category: useCategoryStore(),
        home: useHomeStore(),
        goods: useGoodStore()
    }
}