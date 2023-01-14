<script lang="ts" setup name="TopCategory">
import { useRoute } from "vue-router";
const routes = useRoute();
</script>
<template>
  <div class="category">
    一级分类组件-{{ routes.params }}
    <XtxBread separator="/">
      <XtxBreadItem to="/">去首页</XtxBreadItem>
      <XtxBreadItem>分类</XtxBreadItem>
    </XtxBread>
  </div>
</template>

<style></style>
