// sku的类型,最小库存单元 => 决定是否启用禁用
export type Sku = {
    id: string
    inventory: number
    oldPrice: string
    price: string
    skuCode: string
    specs: {
        name: string
        valueName: string
    }[]
}
// 商品的规格按钮
export type SpecValue = {
    desc: string
    name: string
    picture: string
    selected: boolean
}

// 商品的规格类型
export type Spec = {
    id: string
    name: string
    values: SpecValue[]
}

// 商品模块的类型声明
export type GoodsInfo = {
    id: string
    name: string
    spuCode: string
    desc: string
    price: string
    oldPrice: string
    discount: number
    inventory: number
    salesCount: number
    commentCount: number
    collectCount: number
    mainVideos: any[]
    videoScale: number
    mainPictures: string[]
    isPreSale: boolean
    isCollect?: any
    recommends?: any
    userAddresses?: any
    evaluationInfo?: any
    categories: {
        id: string
        name: string
    }[]
    specs: Spec[]
    skus: Sku[]
}

