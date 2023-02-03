<script lang="ts" setup name="HomeCategory">
import useStore from "@/store"
import { ref, computed } from "vue"
// import XtxSkeleton from "@/components/skeleton/index.vue";
const { category } = useStore()
const categoryId = ref("")
const goods = computed(() => {
  return category.list.find((item) => item.id === categoryId.value)?.goods
})
</script>
<template>
  <div class="home-category" @mouseleave="categoryId = ''">
    <!-- 菜单 -->
    <ul class="menu">
      <li
        :class="{ active: categoryId === item.id }"
        v-for="(item, index) in category.list"
        :key="index"
        @mouseenter="categoryId = item.id"
      >
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink
            :to="`/category/sub/${sub.id}`"
            v-for="sub in item.children.slice(0, 2)"
          >
            {{ sub.name }}
          </RouterLink>
        </template>
        <template v-else>
          <XtxSkeleton
            :width="60"
            :height="18"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
            animated
          />
          <XtxSkeleton
            :width="50"
            :height="18"
            bg="rgba(255,255,255,0.2)"
            animated
          />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer" v-if="goods">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="`/product/${item.id}`">
            <img :src="item.picture" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
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
      &:hover,
      &.active {
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
  // 弹层
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
