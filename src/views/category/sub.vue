<script lang="ts" setup name="SubCategory">
import { useRoute } from "vue-router";
const routes = useRoute();
</script>
<template>
  <div class="category">二级分类组件-{{ routes.params }}</div>
</template>

<style></style>
