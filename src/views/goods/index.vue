<script lang="ts" setup name="Goods">
import useStore from "@/store";
import { storeToRefs } from "pinia";
import { watchEffect, ref } from "vue";
import { useRoute } from "vue-router";
import GoodsImage from "./components/goods-image.vue";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsSku from "./components/goods-sku.vue";
import GoodsDetail from "./components/goods-detail.vue";
const { goods } = useStore();
const route = useRoute();
watchEffect(() => {
  const id = route.params.id as string;
  if (route.fullPath !== `/goods/${id}`) return;
  goods.resetGoodsInfo();
  goods.getGoodsInfo(id);
});
const changeSku = (skuId: string) => {
  const sku = info.value.skus.find((item) => item.id === skuId);
  if (sku) {
    info.value.inventory = sku.inventory;
    info.value.price = sku.price;
    info.value.oldPrice = sku.oldPrice;
  }
};
const { info } = storeToRefs(goods);

// 数量
const modelValue = ref(1);
const max = ref(10);
const min = ref(1);
</script>
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 渲染 -->
      <div v-if="info.categories">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem :to="`/category/${info.categories[1].id}`">
            {{ info.categories[1].name }}
          </XtxBreadItem>
          <XtxBreadItem :to="`/category/sub/${info.categories[0].id}`">
            {{ info.categories[0].name }}
          </XtxBreadItem>
          <XtxBreadItem>{{ info.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media">
            <!-- 图片 -->
            <GoodsImage :images="info.mainPictures"></GoodsImage>
            <!-- 信息详情 -->
            <GoodsSales></GoodsSales>
          </div>
          <!-- 右侧 -->
          <div class="spec">
            <!-- 商品名称 -->
            <GoodsName :goods="info" />
            <!-- 规格组件 -->
            <GoodsSku
              :goods="info"
              skuId="1379052170296430594"
              @changeSku="changeSku"
            ></GoodsSku>
            <!-- 数量组件 -->
            <XtxNumbox
              v-model:modelValue="modelValue"
              :min="min"
              :max="max"
            ></XtxNumbox>
            <!-- 按钮 -->
            <XtxButton type="primary" style="margin-top: 20px">
              加入购物车
            </XtxButton>
          </div>
        </div>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs">
              <!-- 商品详情 -->
              <GoodsDetail :goods="info"></GoodsDetail>
            </div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside"></div>
        </div>
      </div>

      <!-- 占位的 -->
      <div v-else>
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info"></div>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs"></div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
