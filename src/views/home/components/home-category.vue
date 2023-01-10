<script lang="ts" setup name="HomeCategory">
import useStore from "@/store";
const { category } = useStore();
</script>
<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="(item, index) in category.list" :key="index">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <RouterLink
          :to="`/category/sub/${sub.id}`"
          v-for="sub in item.children?.slice(0, 2)"
        >
          {{ sub.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
