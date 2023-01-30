<script lang="ts" setup name="GoodsImage">
import { propsToAttrMap } from "@vue/shared";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useMouseInElement } from "@vueuse/core";
const props = defineProps<{
  images: string[];
}>();
// 默认高亮的下标
let active = ref(0);
let timer = -1;
const play = () => {
  window.clearInterval(timer);
  timer = window.setInterval(() => {
    if (active.value === props.images.length - 1) {
      active.value = 0;
    } else {
      active.value++;
    }
  }, 3000);
};
const stop = () => {
  window.clearInterval(timer);
};
onMounted(() => {
  play();
});
onUnmounted(() => {
  stop();
});
const target = ref(null);
const { isOutside, elementX, elementY } = useMouseInElement(target);
const position = computed(() => {
  let x = elementX.value - 100;
  let y = elementY.value - 100;
  if (x <= 0) x = 0;
  if (x >= 200) x = 200;
  if (y <= 0) y = 0;
  if (y >= 200) y = 200;
  return {
    x,
    y,
  };
});
</script>
<template>
  <div class="goods-image" @mouseenter="stop" @mouseleave="play">
    <!-- 定位在右侧的图片 缩略图-->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${images[active]})`,
          backgroundPosition: `${-position.x * 2}px ${-position.y * 2}px`,
        },
      ]"
      v-show="!isOutside"
    ></div>
    <!-- 用户hover区域 -->
    <div ref="target" class="middle">
      <img :src="images[active]" alt="" />
      <!-- 遮罩 -->
      <div
        class="layer"
        v-show="!isOutside"
        :style="{ left: position.x + 'px', top: position.y + 'px' }"
      ></div>
    </div>

    <ul class="small">
      <li
        v-for="(item, index) in images"
        :key="item"
        :class="{ active: index === active }"
        @mouseenter="active = index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  // 大图片容器的样式
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    // background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
