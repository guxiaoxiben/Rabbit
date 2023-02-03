<script lang="ts" setup name="HomeBrand">
import HomePanel from "./home-panel.vue"
import useStore from "@/store"
import { useLazyData } from "@/utils/hooks"
import { ref } from "vue"
const { home } = useStore()
const index = ref(0)
const target = useLazyData(() => {
  home.getBrandList()
})
</script>

<template>
  <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        :class="{ disabled: index === 0 }"
        @click="index = 0"
      ></a>
      <a
        href="javascript:;"
        class="iconfont icon-angle-right next"
        :class="{ disabled: index === 1 }"
        @click="index = 1"
      ></a>
    </template>
    <div class="box" ref="box">
      <Transition name="fade">
        <ul
          class="list"
          v-if="home.brandList.length > 0"
          :style="{ transform: `translateX(${-index * 1240}px)` }"
        >
          <li v-for="item in home.brandList" :key="item.id">
            <RouterLink :to="`/goods/${item.id}`">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <!-- 骨架 -->
        <div v-else class="skeleton">
          <XtxSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            :width="240"
            :height="305"
          />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
// 骨架屏
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
