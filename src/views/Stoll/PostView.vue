<template>
  <!-- 头部导航栏 -->
  <van-nav-bar
    title="论坛"
    left-text="返回"
    left-arrow
    fixed
    placeholder
    @click-left="onClickLeft"
  />

  <!-- 帖子组件 -->
  <!-- <article-item
    :key="post.id"
    :headPotrait="post.headPotrait"
    :userName="post.userName"
    :title="post.title"
    :images="post.images"
    :id="post.id"
    :date="post.date"
  ></article-item> -->
  <article-item
    :key="post.id"
    :headPotrait="post.headPotrait"
    :userName="post.userName"
    :title="post.title"
    :images="post.images"
    :id="post.id"
    :artLiker="post.artLiker"
    :commentNum="post.commentNum"
  ></article-item>
  <!-- 评论组件 -->
  <Comments
    v-for="item in post.comments"
    :key="item"
    :fileUrl="item.fileUrl"
    :leftUser="item.userName"
    :text="item.context"
    :date="item.create_time"
    :children="item.children"
    :id="item.id"
  ></Comments>
  <!-- 回复文本框 placeholder文本框默显示灰色提示-->
  <van-tabbar placeholder>
    <van-field
      id="myRef"
      v-model="value"
      :placeholder="
        $store.state.userName == '' ? '发表评论' : `@${$store.state.userName}`
      "
      @blur="blur"
      @focus="focus"
      :autofocus="$store.state.userName != '' ? 'autofocus' : false"
      maxlength="50"
    />
    <!-- 回复按钮 -->
    <van-button type="default" size="small" @click="publication"
      >发布</van-button
    >
  </van-tabbar>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue' //导入帖子组件
import Comments from '@/components/Comments.vue' //导入评论组件
import { commentPost } from '@/api/index'
import { watch } from 'vue'
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Cookies from 'js-cookie'
export default {
  setup() {
    const store = useStore() //引用vuex
    const router = useRouter() //引用路由
    const user = JSON.parse(Cookies.get('userInfo')) //从cookie拿到用户信息
    let value = ref('')
    let replyName = ref('')
    let fId = ref('')
    let post = store.state.post.id
      ? store.state.post
      : JSON.parse(localStorage.getItem('post')) //如果vuex中没有对应数据则去localStorage中拿数据
    // console.log(post)
    function onClickLeft() {
      //头部返回功能
      router.back()
      store.commit('setUsername', '') //清空vuex中的Username
      store.commit('setId', '') //清空vuex中的id
    }
    function blur() {
      //失去焦点
      store.commit('setUsername', '') //清空vuex中的Username
      store.commit('setId', '') //清空vuex中的id
    }
    function focus() {
      //获取焦点
      if (store.state.userName == '') {
        //如果父亲节点为空则把帖子当做他的父亲
        replyName.value = post.userName
        console.log(replyName.value)
      } else {
        replyName.value = store.state.userName
      }
      if (store.state.id == '') {
        //如果父亲节点为空则把帖子id当做他父亲的id
        fId.value = post.id
      } else {
        fId.value = store.state.id
      }
    }
    function publication() {
      //发表评论
      if (value.value != '') {
        //如果发布内容不为空调用commentPost发布评论
        console.log(
          post.id,
          user.userName,
          replyName.value,
          fId.value,
          value.value
        )
        commentPost({
          userName: user.userName,
          replyName: replyName.value,
          id: post.id,
          fid: fId.value,
          context: value.value
        }).then((res) => {
          console.log(res)
          post.comments = res.data.data.children
          localStorage.getItem('post', post)
        })
      }
      store.commit('setId', '')
      store.commit('setUsername', '')
      value.value = '' //发表评论后清空父亲名字和父亲id并清空文本框
    }
    watch(
      //监听vuex中userName的变化
      () => store.state.userName,
      (newVal, oldVal) => {
        if (oldVal == '') {
          //如果userName开始为空则让文本框获取焦点
          window.document.querySelector('#myRef').focus()
        }
      }
    )

    return {
      // myRef,
      post,
      value,
      replyName,
      onClickLeft,
      blur,
      focus,
      publication
    }
  },
  components: {
    ArticleItem,
    Comments
  }
}
</script>

<style lang="less" scoped>
.van-tabbar {
  .van-field {
    width: 80%;
  }
  .van-button {
    border: none;
    height: 100%;
    width: 20%;
    font-size: 15px;
  }
}
</style>
