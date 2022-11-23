<template>
  <van-swipe-cell>
    <van-card
      id="www"
      :num="`编号${id}`"
      :desc="desc"
      :title="title"
      class="goods-card"
      :thumb="img"
    />

    <template #right>
      <van-button
        square
        text="领养"
        type="danger"
        class="delete-button"
        @click="adopt"
      />
    </template>
  </van-swipe-cell>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  id: {
    type: Number,
    default: 'id加载中...'
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
    default: 'http://43.143.140.144:9000/chuyings/5D31750E5AD89E'
  }
})
// 路由

const router = useRouter()
function adopt() {
  router.push({
    name: 'form',
    query: {
      ID: `${props.id}`
    }
  })
}
onMounted(() => {
  // nextTick(()=>{
  // })
})
</script>

<style scoped>
.goods-card {
  margin: 5px;
  background-color: width;
  border-radius: 10px;
  font-size: 15px;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

:deep .van-ellipsis {
  white-space: inherit;
  overflow: visible;
  /* 修改默认样式 */
  margin-right: 8vw;
  text-indent: 2em;
  margin-left: 1.5vw;
}
:deep .van-card__title {
  font-size: 16px;
}

:deep .van-card__num {
  margin-right: 10px;
}
.delete-button {
  height: 100%;
}

@media screen and (max-width: 470px) {
  :deep .van-card__num {
    display: none;
    margin-right: -12vw;
  }
}
</style>
