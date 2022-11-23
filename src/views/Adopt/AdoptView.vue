<template>
  <div class="item">
    <van-nav-bar
      title="领养"
      right-text="我的领养"
      fixed
      placeholder
      @click-right="onClickRight"

    />

    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <!-- 单个领养单元 -->
      <items
        v-for="item in pet"
        :key="item.petsInfoId"
        :id="item.petsInfoId"
        :desc="item.titleInfo"
        :title="item.describeInfo"
        :img="item.petPhoto"
      ></items>
    </van-pull-refresh>
  </div>
</template>
<script setup>
import { adopt } from '@/api/index'
import { ref, onMounted, reactive } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'

import items from '@/components/AdpotItems.vue'
const router= useRouter()
function onClickRight(){
  router.push({name:'myAdopt'})
}
// 以下是关于刷新的函数
const isLoading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    Toast('刷新成功')
    isLoading.value = false
  }, 1000)
}
// 挂载请求onMounted
onMounted(() => {})
// 关于item的逻辑
// let itemsPet = [
//   {
//     id: 1,
//     desc: "领养描述545",
//     title: "领养宠物54",
//   },
//   {
//     id: 2,
//     desc: "领养描述79",
//     title: "领养宠物673",
//   },
//   {
//     id: 3,
//     desc: "领养描述978",
//     title: "领养宠物978",
//   },
//   {
//     id: 4,
//     desc: "领养描述97",
//     title: "领养宠物976",
//   },
//   {
//     id: 5,
//     desc: "领养描述978",
//     title: "领养宠物6",
//   },
//   {
//     id: 6,
//     desc: "领养描述978",
//     title: "领养宠物555",
//   },
// ];
const pet = ref()
onMounted(() => {
  adopt().then(
    (res) => {
      pet.value = res.data
      console.log(JSON.stringify(pet.value))
    },
    (error) => {
      error.message
    }
  )
})
</script>

<style lang="less" scoped>
van-pull-refresh {
  height: 100vh;
}
.item {
  min-height: calc(100vh - 50px);
}
[data-v-833ef728] /deep/.van-card__title {
  height: 35px;
  line-height: 35px;
  font-size: 15px;
}
[data-v-833ef728] /deep/.van-card__desc {
  font-size: 12px;
  margin-right: 0vw;
  color: #aaa;
  text-indent: 1em;
}
</style>
