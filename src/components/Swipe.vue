<template>
  <div>
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" style="width: 100%; height: 200px" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: ['images'],
  setup(props) {
    const images = reactive(props.images)
    return { images }
  }
}
</script>
<style lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
