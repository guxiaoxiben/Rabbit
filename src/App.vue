<script lang="ts" setup>
import request from "./utils/request";
const test = async () => {
  const res = await request.get("/home/index");
  console.log(res);
};
test();
</script>

<template>app</template>

<style scoped></style>
