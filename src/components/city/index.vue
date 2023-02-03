<script lang="ts" setup name="XtxCity">
// 选择的城市结果类型
export type CityResult = {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
  countyCode: string
  countyName: string
}

import { ref, watch } from "vue"
import { onClickOutside } from "@vueuse/core"
import axios from "axios"

// 城市列表类型
type AreaList = {
  code: string
  level: number
  name: string
  areaList: AreaList[]
}
// 存选择后城市数据
const changeResult = ref({
  provinceCode: "",
  provinceName: "", // 省
  cityCode: "",
  cityName: "", // 市
  countyCode: "",
  countyName: "", // 区
})
defineProps<{
  userAddress?: string
}>()
const active = ref(false)
const target = ref(null)
const cityList = ref<AreaList[]>([]) //城市数据
const cacheList = ref<AreaList[]>([]) // 缓存
// 点击取反
const toggle = () => {
  active.value = !active.value
}

const emit = defineEmits<{
  (e: "changeCity", value: CityResult): void
}>()

// 点击外层关闭弹窗
onClickOutside(target, () => {
  active.value = false
})
// 获取 城市数据
const getCityList = async () => {
  const res = await axios.get<AreaList[]>(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  )
  cityList.value = res.data
  cacheList.value = res.data
}
getCityList()
// 点击选择
const selectCity = (city: AreaList) => {
  if (city.level === 0) {
    // 处理省
    changeResult.value.provinceName = city.name
    changeResult.value.provinceCode = city.code
    cityList.value = city.areaList
  }
  if (city.level === 1) {
    // 处理市
    changeResult.value.cityName = city.name
    changeResult.value.cityCode = city.code
    cityList.value = city.areaList
  }
  if (city.level === 2) {
    // 处理县（区）
    changeResult.value.countyName = city.name
    changeResult.value.countyCode = city.code
    // 关闭弹窗
    active.value = false
    // 子传父
    emit("changeCity", changeResult.value)
  }
}
//   关闭
watch(active, (val) => {
  if (!val) {
    cityList.value = cacheList.value
  }
})
</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: active }">
      <span class="value" v-if="userAddress">{{ userAddress }}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <!-- <span class="value"></span> -->
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span
        class="ellipsis"
        v-for="item in cityList"
        :key="item.code"
        @click="selectCity(item)"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
