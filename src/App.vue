<script lang="ts" setup>
import request from "./utils/request";
const test = async () => {
  const res = await request.get("/home/index");
  console.log(res);
};
test();
</script>

<template>
  <div class="box">app</div>
  <p>lalala</p>
  <ul>
    <li>1</li>
    <li>1</li>
    <li>1</li>
  </ul>
</template>

<style lang="less" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: @sucColor;
}
</style>
