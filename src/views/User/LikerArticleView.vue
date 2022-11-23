<template>
  <van-nav-bar
    title="我的点赞"
    left-text="返回"
    left-arrow
    fixed
    placeholder
    @click-left="onClickLeft"
  />
  <article-item
    v-for="item in Article"
    :key="item.id"
    :headPotrait="item.fileUrl"
    :userName="item.userName"
    :title="item.context"
    :comments="item.children"
    :images="item.artPhoto"
    :id="item.id"
    :artLiker="item.artLiker"
    :commentNum="item.commentNum"
  ></article-item>
</template>

<script>
import { onBeforeMount, reactive } from 'vue'
import ArticleItem from '@/components/ArticleItem.vue'
import { myLikerArticle } from '@/api/index'
import { useRouter } from 'vue-router'
import Cookie from 'js-cookie'
export default {
  setup() {
    const router = useRouter()
    var Article = reactive([])
    var myLike = JSON.parse(Cookie.get('userlike'))
    function onClickLeft() {
      router.back()
    }
    onBeforeMount(async () => {
      let res = await myLikerArticle({ likers: myLike })
      // console.log(res.data.data)
      Article.push(...res.data.data)
    })
    console.log(Article)
    return {
      Article,
      onClickLeft
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style></style>
