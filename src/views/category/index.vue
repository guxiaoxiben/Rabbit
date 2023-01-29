<script lang="ts" setup name="TopCategory">
import useStore from "@/store";
import { watch } from "vue";
import { useRoute } from "vue-router";
const { category } = useStore();
const route = useRoute();
// category.getTopCategory(route.params.id as string);
watch(
  () => route.params.id,
  (value) => {
    if (route.fullPath === `/category/${value}`)
      category.getTopCategory(value as string);
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="category">
    <XtxBread>
      <XtxBreadItem to="/">去首页</XtxBreadItem>
      <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
    </XtxBread>
  </div>
</template>

<style></style>
