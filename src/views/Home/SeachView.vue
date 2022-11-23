<template>
  <form action="/">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索用户"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- <article-item v-for=""></article-item> -->
  </form>
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
import { reactive, ref } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { selectArticle } from '@/api/index'
import ArticleItem from '@/components/ArticleItem.vue'

export default {
  components: { ArticleItem },
  setup() {
    const value = ref('')
    const Article = reactive([])
    const onSearch = (val) => {
      
      selectArticle({ userName: val }).then(
        (res) => {
          console.log(res.data)
          Article.splice(0,Article.length);
          Article.push(...res.data)
        },
        (err) => {
          console.log(err)
        }
      )
      console.log(val)
    }
    const router = useRouter()
    const onCancel = () => {
      router.push({
        name: 'home'
      })
    }
    return {
      value,
      Article,
      onSearch,
      onCancel
    }
  },
  component: {
    ArticleItem
  }
}
</script>

<style></style>
