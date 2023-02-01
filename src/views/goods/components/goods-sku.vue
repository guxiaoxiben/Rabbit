<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, SpecValue } from "@/types/goods";
defineProps<{
  goods: GoodsInfo;
}>();
const changeSelected = (item: Spec, sub: SpecValue) => {
  if (sub.selected) {
    // 如果已经是选中了，取消选中
    sub.selected = false;
  } else {
    // 把同级所有(包括sub)的全部取消选中
    item.values.forEach((v) => (v.selected = false));
    // 让sub选中
    sub.selected = true;
  }
};
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img
            v-if="sub.picture"
            :src="sub.picture"
            alt=""
            :title="sub.name"
            :class="{ selected: sub.selected }"
            @click="changeSelected(item, sub)"
          />
          <span
            v-else
            :class="{ selected: sub.selected }"
            @click="changeSelected(item, sub)"
            >{{ sub.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
