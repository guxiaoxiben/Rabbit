<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, SpecValue } from "@/types/goods";
import bwPowerSet from "@/utils/power-set";
import path from "path";

const props = defineProps<{
  goods: GoodsInfo;
  skuId?: string;
}>();

/**
 * 选中排他
 */
const changeSelected = (item: Spec, sub: SpecValue) => {
  // 禁用的时候不允许选中
  if (sub.disabled) return;

  if (sub.selected) {
    // 如果已经是选中了，取消选中
    sub.selected = false;
  } else {
    // 把同级所有(包括sub)的全部取消选中
    item.values.forEach((v) => (v.selected = false));
    // 让sub选中
    sub.selected = true;
  }
  updateDisabledStatus();
};

/**
 * 获取路径字典
 */
const getPathMap = () => {
  const pathMap: {
    [key: string]: string[];
  } = {};
  // 1. 过滤掉库存为0的sku
  const skus = props.goods.skus.filter((item) => item.inventory > 0);
  // console.log(skus)
  // 2. 遍历有效的sku,获取sku的幂集
  skus.forEach((item) => {
    const arr = item.specs.map((sub) => sub.valueName);
    // console.log(arr)
    // 3. 调用powerSet获取幂集
    const powerSet = bwPowerSet(arr);
    // 4. 把这些powerSet合并到一个路径字典中
    powerSet.forEach((sub) => {
      const key = sub.join("★");
      // 5. 判断pathMap中有没有key
      if (key in pathMap) {
        // 6. 存在
        pathMap[key].push(item.id);
      } else {
        // 7. 不存在
        pathMap[key] = [item.id];
      }
    });
  });

  return pathMap;
};
/**
 * 更新按钮的禁用状态
 */
const updateDisabledStatus = () => {
  const selectArr = getSelectedSpec();
  props.goods.specs.forEach((spec, index) => {
    spec.values.forEach((specValue) => {
      const tempArr = [...selectArr]; //结构赋值
      tempArr[index] = specValue.name;
      // 得到组合后转成字符串的key
      const key = tempArr.filter((item) => item).join("★");
      if (key in pathMap) {
        // 存在, 说明有库存, 不禁用
        specValue.disabled = false;
      } else {
        // 不存在, 说明没有库存, 禁用
        specValue.disabled = true;
      }
    });
  });
};
/**
 * 获取选中的规格
 */
const getSelectedSpec = () => {
  const arr: string[] = [];
  props.goods.specs.forEach((item) => {
    const temp = item.values.find((sub) => sub.selected);
    arr.push(temp ? temp.name : "");
  });
  return arr;
};
/**
 * 初始化默认选中状态
 */
// 初始化时，设置默认选中效果
const initSelectedSpec = () => {
  const sku = props.goods.skus.find((item) => item.id === props.skuId);
  // console.log(sku)
  if (sku) {
    // 如果根据父组件传递的skuId找到了对应的sku,设置默认选中
    props.goods.specs.forEach((item, index) => {
      // 获取到sku中选中的规格
      const value = sku.specs[index].valueName;
      console.log(value);
      // 让value对应的规格选中
      const spec = item.values.find((item) => item.name === value);
      spec!.selected = true;
    });
  }
};
// 1.获取路径字典
const pathMap = getPathMap();
console.log(pathMap);
// 初始化默认
initSelectedSpec();
// 3.根据目前已选中的项 => 更新禁用状态
updateDisabledStatus();
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
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            @click="changeSelected(item, sub)"
          />
          <span
            v-else
            :class="{ selected: sub.selected, disabled: sub.disabled }"
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
