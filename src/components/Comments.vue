<template>
  <div class="box">
    <div class="user">
      <!-- 用户头像 -->
      <img :src="comments.fileUrl" />
      <!-- 评论者 -->
      <span class="left">{{ comments.leftUser }}</span>
      <!-- <span><b>></b></span> -->
      <!-- 被评论者 -->
      <!-- <span class="right">{{ comments.rightUser }}</span> -->
    </div>
    <!-- 评论内容 -->
    <div class="text">
      {{ comments.text }}
      <div class="time">{{ comments.date }}</div>
    </div>
    <div class="reply" @click="reply">回复</div>
    <div v-if="comments.children && flag" class="bottom" @click="flag = !flag">
      收起
    </div>
    <div
      v-else-if="comments.children.length != 0 && !flag"
      class="bottom"
      @click="flag = !flag"
    >
      展开
    </div>

    <div v-if="comments.children.length != 0 && flag" style="margin-left: 20px">
      <Children
        v-for="item in comments.children"
        :key="item.id"
        :leftUser="item.userName"
        :rightUser="item.replyName"
        :text="item.context"
        :date="item.create_time"
        :children="item.children"
        :fileUrl="item.fileUrl"
        :id="item.id"
      ></Children>
    </div>
  </div>
</template>

<script>
import Children from '@/components/Children.vue'
import { reactive, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  props: ['leftUser', 'text', 'date', 'children', 'id', 'fileUrl'], //接收调用者传递的数据
  setup(props) {
    const store = useStore()
    let flag = ref(false)
    let comments = reactive({
      leftUser: props.leftUser,
      text: props.text,
      date: props.date,
      children: props.children,
      fileUrl: props.fileUrl,
      id: props.id
    }) //接收调用者传递的数据

    function reply() {
      // console.log(comments.leftUser)
      store.commit('setUsername', comments.leftUser)
      store.commit('setId', comments.id)
    }

    return {
      comments,
      flag,
      reply
    }
  },
  components: {
    Children
  }
}
</script>

<style lang="less" scoped>
.box {
  position: relative;
  background-color: whitesmoke;
  border: 1px solid transparent;
  .user {
    margin-left: 20px;
    margin-top: 10px;
    height: 30px;
    display: inline-block;
    // overflow: hidden;
    img {
      height: 100%;
      border-radius: 15px;
      vertical-align: middle;
    }
    span {
      margin-left: 10px;
      font-size: 13px;
      color: #999;
    }
  }
  .text {
    white-space: pre-wrap;
    word-break: break-all;
    margin-left: 60px;
    margin-top: 10px;
    margin-right: 20px;
    .time {
      margin-top: 10px;
      margin-bottom: 10px;
      color: #aaa;
      font-size: 8px;
    }
  }
  .reply {
    position: absolute;
    margin-top: -25px;
    margin-left: calc(100% - 100px);
    color: #999;
    font-size: 8px;
  }
  .bottom {
    margin-top: -25px;
    margin-left: calc(100% - 50px);
    color: #999;
    font-size: 8px;
    // border-bottom: 1px dotted #ccc;
  }
}
</style>
