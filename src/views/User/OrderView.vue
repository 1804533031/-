<template>
  <van-nav-bar
    title="我的订单"
    left-text="返回"
    left-arrow
    fixed
    :placeholder="true"
    @click-left="onClickLeft"
  />
  <order-item
    v-for="item in order"
    :key="item.orderId"
    :name="item.goodsName"
    :date="item.create_time"
    :number="item.goodsNum"
    :orderNumber="item.orderId"
    :price="item.singPrice"
    :state="item.orderStatus"
    :image="item.filePhotos"
  ></order-item>
</template>

<script>
import { useRouter } from 'vue-router'
import OrderItem from '@/components/OrderItem.vue'
import { reactive } from '@vue/reactivity'
import { onBeforeMount } from 'vue'
import { goodsOrderAll } from '@/api/index'
import Cookie from 'js-cookie'
export default {
  components: { OrderItem },
  setup() {
    const router = useRouter()
    const user = Cookie.get('userInfo')
    // console.log(JSON.parse(user).userName)
    // const order = reactive([
    //   {
    //     name: '坤',
    //     title: '我是一只鸡会唱跳rap篮球',
    //     price: 2,
    //     number: 2,
    //     state: 2,
    //     orderNumber: 72491749
    //   },
    //   {
    //     name: '坤1',
    //     title: '我是一只鸡会唱跳rap篮球',
    //     price: 7,
    //     number: 5,
    //     state: 1,
    //     orderNumber: 2842194791
    //   },
    //   {
    //     name: '坤2',
    //     title: '我是一只鸡会唱跳rap篮球',
    //     price: 5,
    //     number: 21,
    //     state: 3,
    //     orderNumber: 749217401
    //   },
    //   {
    //     name: '坤3',
    //     title: '我是一只鸡会唱跳rap篮球',
    //     price: 9,
    //     number: 1,
    //     state: 4,
    //     orderNumber: 872871490
    //   }
    // ])
    const order = reactive([])
    onBeforeMount(() => {
      goodsOrderAll({ userName: `${JSON.parse(user).userName}` }).then(
        (res) => {
          console.log(res)
          order.push(...res.data)
        }
      )
    })
    function onClickLeft() {
      router.back()
    }
    return {
      order,
      onClickLeft
    }
  },
  component: {
    OrderItem
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  z-index: 2;
}
</style>
