<!-- h函数与render函数 使用案例 -->
<script lang="ts" setup>
import { h, onMounted, render } from "vue"
const vNode = h("div", { id: "box", className: "active" }, "我是一个简单的div")
onMounted(() => {
  render(vNode, document.querySelector(".box")!)
})
</script>

<template>
  <div class="box"></div>
</template>

<style scoped></style>

<!-- 待写案例练手 -->
