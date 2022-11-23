<template>
  <van-nav-bar
    title="我的领养"
    left-text="返回"
    left-arrow
    fixed
    placeholder
    @click-left="onClickLeft"
  />
  <van-card
    v-for="item in AdoptItems"
    :key="item"
    tag="已领养"
    :title="item.describeInfo"
    :desc="item.titleInfo"
    :thumb="item.petPhoto"
  >
  </van-card>
</template>

<script>
import { useRouter } from 'vue-router'
import { myAdoption } from '@/api/index'
import { onMounted, reactive } from 'vue'
import Cookie from 'js-cookie'
export default {
  setup() {
    const userName = JSON.parse(Cookie.get('userInfo')).userName
    const router = useRouter()
    const AdoptItems = reactive([])
    // console.log(userName)
    onMounted(() => {
      myAdoption({ userName: userName }).then((res) => {
        // console.log(res.data.data)
        AdoptItems.push(...res.data.data)
      })
    })
    console.log(AdoptItems)
    function onClickLeft() {
      router.back()
    }
    return {
      onClickLeft,
      AdoptItems
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-card__title {
  height: 35px;
  line-height: 35px;
  font-size: 15px;
}
/deep/.van-card__desc {
  color: #aaa;
  font-size: 12px;

  text-indent: 1em;
}
</style>
