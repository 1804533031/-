<template>
  <van-card
    centered
    class="card"
    :num="goods.number"
    :price="goods.price"
    :title="goods.name"
    :thumb="goods.image"
  >
    <template #tags>
      <p class="date">{{ goods.date }}</p>
    </template>

    <template #footer> 订单编号：{{ goods.orderNumber }} </template>
  </van-card>

  <van-steps :active="goods.state">
    <van-step>买家下单</van-step>
    <van-step>商家接单</van-step>
    <van-step>买家提货</van-step>
    <van-step>交易完成</van-step>
  </van-steps>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  props: ['name', 'date', 'price', 'number', 'state', 'orderNumber', 'image'],
  setup(props) {
    const goods = reactive({
      name: props.name,
      date: props.date,
      price: props.price,
      number: props.number,
      state: props.state,
      image: props.image,
      orderNumber: props.orderNumber
    })
    return { goods }
  }
}
</script>

<style lang="less">
.card {
  margin-top: -8px;
}
.date {
  color: #ccc;
}
</style>
