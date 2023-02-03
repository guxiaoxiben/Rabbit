<!-- h函数与render函数 使用案例 -->
<!-- <script lang="ts" setup>
import { h, onMounted, render } from "vue"
const vNode = h("div", { id: "box", className: "active" }, "我是一个简单的div")
onMounted(() => {
  render(vNode, document.querySelector(".box")!)
})
</script>

<template>
  <div class="box"></div>
</template>

<style scoped></style> -->

<!-- 消息弹窗练习 -->
<script setup lang="ts">
import Message from "@/components/message/index"
const hangeChan = () => {
  Message.success("小栽楞", 3000)
}
</script>

<template>
  <button @click="hangeChan()">点击一下啊</button>
</template>

<style scoped></style>

<!-- 待写案例练手 -->
