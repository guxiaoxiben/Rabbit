<script lang="ts" setup name="XtxNumbox">
import { ComponentInternalInstance, getCurrentInstance } from "vue"

const props = withDefaults(
  defineProps<{
    modelValue?: number
    max?: number
    min?: number
  }>(),
  {
    modelValue: 1,
    min: 1,
    max: 10,
  }
)

// 数据改变传给父组件
const emit = defineEmits<{
  // (e: "update:modelValue", value: number): void;
  (e: "update:modelValue", value: number): void
}>()
const add = () => {
  if (props.modelValue >= props.max) return
  emit("update:modelValue", props.modelValue + 1)
}

const sub = () => {
  if (props.modelValue <= props.min) return
  emit("update:modelValue", props.modelValue - 1)
}
/**结构出this */
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const handleChange = (e: Event) => {
  // 类型断言 让ts知道目前元素的类型
  let value = Number(Number((e.target as HTMLInputElement).value).toFixed()) // 简易强制类型转换
  if (isNaN(value)) value = 1
  if (value <= props.min) value = props.min
  if (value >= props.max) value = props.max
  emit("update:modelValue", value)
  // forceUpdate
  proxy!.$forceUpdate()
}
</script>
<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="sub">-</a>
      <!-- readonly 只读 -->
      <input type="text" :value="modelValue" @change="handleChange" />
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
