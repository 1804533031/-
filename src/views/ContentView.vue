<template>
  <router-view></router-view>
  <van-tabbar route placeholder>
    <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/stroll" icon="smile-comment-o"
      >逛逛</van-tabbar-item
    >
    <van-tabbar-item replace to="/adopt" icon="goods-collect-o"
      >领养</van-tabbar-item
    >
    <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { getArticle } from '@/api/index'
import { reactive } from '@vue/reactivity'
import axios from 'axios'
export default {
  setup() {
    //   let comments = [
    //     { id: 1, uid: 0, name: '第一' },
    //     { id: 2, uid: 1, name: '第一第一' },
    //     { id: 3, uid: 1, name: '第一第二' },
    //     { id: 4, uid: 2, name: '第一第一第一' },
    //     { id: 5, uid: 2, name: '第一第一第二' },
    //     { id: 6, uid: 3, name: '第一第二第一' },
    //     { id: 7, uid: 3, name: '第一第二第二' },
    //     { id: 1, uid: 0, name: '第一' },
    //     { id: 2, uid: 1, name: '第一第一' },
    //     { id: 3, uid: 1, name: '第一第二' },
    //     { id: 4, uid: 2, name: '第一第一第一' },
    //     { id: 5, uid: 2, name: '第一第一第二' },
    //     { id: 6, uid: 3, name: '第一第二第一' },
    //     { id: 7, uid: 3, name: '第一第二第二' }
    //   ]
    //   function getTree(data) {
    //     var TreeData = []
    //     var map = new Map()
    //     var outputObj, uid
    //     data.forEach((item) => {
    //       uid = item.uid
    //       if (map.has(uid)) {
    //         if (!map.get(uid).childrens) map.get(uid).childrens = []
    //         let obj = new Object(item)
    //         map.get(uid).childrens.push(obj)
    //         map.set(item.id, obj)
    //       } else {
    //         outputObj = new Object(item)
    //         TreeData.push(outputObj)
    //         map.set(item.id, outputObj)
    //       }
    //     })
    //     return TreeData
    //   }
    //   let trees = getTree(comments)
    //   console.log(trees)
    // return {
    //   comments
    // }
  },
  mounted() {
    // axios.get('http://10.19.16.32:81/getArticleAll').then((res) => {
    //   console.log(res)
    // })
  }
}
</script>

<style lang="less"></style>
