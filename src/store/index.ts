import useCategoryStore from "./modules/category";
import useHomeStore from './home'
export default function useStore() {
    return {
        category: useCategoryStore(),
        home: useHomeStore()
    }
}