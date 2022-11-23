<template>
  <div class="article">
    <div class="top">
      <img :src="post.headPotrait" alt="" />
      <!-- 用户头像 -->
      {{ post.userName }}
    </div>
    <!-- 点击跳转到详情页 -->
    <van-image-preview/>
    <div @click="pushPost(post)">
      <!-- 帖子标题 -->
      <div class="title">{{ post.title }}</div>
      <!-- 循环遍历图片 -->
      <div class="photo" >
        <div class="img" v-for="(item,index) in post.images" :key="item.index">
          <img :src="item" alt="" @click.stop="showPhoto(post.images,index)"/>
        </div>
      </div>
      <div class="time">{{ post.date }}</div>
    </div>
    <div class="toolBar">
      <li>
        <van-icon name="chat-o" size="25px" @click="pushPost(post)" />{{
          post.commentNum
        }}
      </li>
      <li>
        <van-icon
          v-if="post.like == 0"
          name="like-o"
          size="25px"
          @click="takeLike(post)"
        />
        <van-icon
          v-else
          name="like"
          color="red"
          size="25px"
          @click="takeLike(post)"
        />
        {{ post.artLiker }}
      </li>
    </div>
  </div>
</template>

<script>
import { requestLiker } from '@/api/index'
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ImagePreview } from 'vant';
import { Dialog } from "vant"; 
import Cookies from 'js-cookie'
export default {
  props: [
    'headPotrait',
    'userName',
    'date',
    'title',
    'id',
    'comments',
    'images',
    'artLiker',
    'commentNum'
  ], //接收使用者传递过来的数据
  setup(props) {
    let post = reactive({
      id: props.id,
      headPotrait: props.headPotrait,
      userName: props.userName,
      title: props.title,
      comments: props.comments,
      images: props.images,
      date: props.date,
      artLiker: props.artLiker,
      commentNum: props.commentNum,
      like: 0
    }) //接收到的数据进行保存
    // let like = ref([])
    let userlike = JSON.parse(Cookies.get('userlike')) //从cookie拿到用户喜欢信息
    let user = JSON.parse(Cookies.get('userInfo'))
    const router = useRouter()
    const store = useStore()
    function pushPost(item) {
      //点击帖子跳转到详情页
      console.log(JSON.parse(JSON.stringify(item)))
      localStorage.setItem('post', JSON.stringify(item)) //把对应数据存到localStorage中
      // Cookies.set('post', JSON.stringify(item)) //把对应数据存到cookie中
      store.commit('getpost', item) //存到vuex中
      router.push('post')
    }
    function showPhoto(image,index){
      ImagePreview({images:image,startPosition:index });
    }
    // 判断user的like数组中是否存在post.id存在post.id
    // 存在post.like值改为1，不存在改为0
    // TODO...
    console.log(userlike)
    if (userlike.indexOf(post.id) != -1) {
      post.like = 1
    }
    function takeLike(item) {
      if (item.like == 0) {
        // 把like改为以1
        item.like = 1
        // 向后端发送点赞请求
        requestLiker({
          articleId: item.id,
          userName: user.userName
        }).then((res) => {
          // 返回值更新user信息并存到cookie
          // TODO...
          console.log();
          if(res.data.code==201){
            Dialog({
            title: "提醒",
            message: res.data.msg,
            }).then(()=>{
          })
          } else if(res.data.code==200){
          post.artLiker += 1
          userlike.push(item.id)
          Cookies.set('userlike', JSON.stringify(userlike))
          console.log(res)
          }
          
        })
      } else {
        // 把like改为0
        item.like = 0
        // 向后端发送取消点赞请求
        requestLiker({
          articleId: item.id,
          userName: user.userName
        }).then((res) => {
          console.log(res)
          // 返回值更新user信息并存到cookie
          //TODO...
          post.artLiker -= 1
          userlike.splice(userlike.indexOf(post.id), 1)
          Cookies.set('userlike', JSON.stringify(userlike))
        })
      }
      console.log(item.like)
    }
    return {
      post,
      takeLike,
      showPhoto,
      pushPost
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  // height: 250px;
  // background-color: whitesmoke;
  // border: 1px solid skyblue;
  .top {
    position: relative;
    margin-top: 10px;
    padding-left: 20px;
    height: 50px;
    // background-color: yellowgreen;
    line-height: 50px;
    // font-weight: 100px;
    img {
      margin-right: 10px;
      height: 40px;
      width: 40px;
      border-radius: 20px;
      vertical-align: middle;
    }
  }
  .title {
    margin-top: 10px;
    padding-left: 20px;
    white-space: pre-wrap;
    word-break: break-all;
    // background-color: gold;
  }
  .photo {
    margin-top: 10px;
    padding: 0px 20px 0px 15px;
    .img {
      text-align: center;
      margin-left: 3%;
      display: inline-block;
      background-color:#222;
      height: 100px;
      width: 30%;
      border-radius: 10px;
      overflow: hidden;
      img {
        // width: 100%;
        height: 100%;
      }
    }
  }
  .time {
    // position: absolute;
    // right: 20px;
    // top: 0px;
    margin-left: 20px;
    margin-top: 20px;
    color: #aaa;
    font-size: 10px;
    // background-color: yellowgreen;
  }
  .toolBar {
    margin-top: -30px;
    height: 50px;
    width: 100%;
    // background-color: skyblue;
    li {
      float: right;
      padding-right: 50px;
      list-style: none;
      height: 50px;
      line-height: 50px;
      .van-icon {
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
}
</style>
