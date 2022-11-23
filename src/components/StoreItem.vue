<template>
  <van-card
    :num="num"
    :price="props.price"
    :desc="props.desc"
    :title="props.title"
    :thumb="props.img"
  >
    <template #tags>
      <van-tag plain type="danger">热门</van-tag>
      <van-tag plain type="danger">上新</van-tag> </template
    ><br />
    <template #footer
      ><br />
      <van-button size="mini" @click="subtract">&nbsp;减 &nbsp;</van-button>
      <van-button size="mini" @click="add">&nbsp;加 &nbsp;</van-button>
    </template>
  </van-card>
</template>

<script setup>
import { ref, watch, defineEmits, defineExpose } from 'vue'
const emit = defineEmits(['send', 'goods'])
let num = ref(0)

const props = defineProps({
  price: {
    type: Number,
    default: '价格加载中...'
  },
  title: {
    type: String,
    default: '标题加载中...'
  },
  desc: {
    type: String,
    default: '内容加载中...'
  },
  img: {
    type: String,
    default: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  }
})
watch(
  () => num.value,
  (newv, oldv) => {
    // console.log(newv * props.price);
    emit('send', (newv - oldv) * props.price)
  }
)
let orderForm = ref({ num: num, title: props.title, price: props.price })
defineExpose(orderForm)
function add() {
  num.value += 1
}
function subtract() {
  if (num.value >= 1) {
    num.value -= 1
  }
}
</script>

<style scoped>
:deep .van-ellipsis {
  white-space: inherit;
  overflow: visible;
  margin-right: 15vw;
}

:deep .van-card__price {
  position: relative;
  top: 5vh;
  left: -14.5vw;
}
:deep .van-card__num {
  margin-right: 6vw;
  font-size: medium;
}
:deep .van-tag {
  top: 6vh;
  left: -17.5vw;
}
:deep .van-button {
  border-radius: 8vw;
  width: 10vw;
}
</style>
