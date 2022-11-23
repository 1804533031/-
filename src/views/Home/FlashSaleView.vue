<template>
  <van-nav-bar
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    title="限时抢购"
    fixed
    placeholder
  />
  <Swipe :images="images"></Swipe>
  <div class="container">
    <div class="price">
      <p class="oldprice">劵后￥</p>
      <p class="num">0.99</p>
      <p class="newprice">秒杀价￥0.01</p>
      <div class="bottomprice">即将恢复￥5999</div>
    </div>
    <div class="date">
      <p class="text">限时秒杀</p>
      <p class="time">{{ time }}</p>
    </div>
  </div>
  <div class="banner">先买后付 | 支持0元下单,确认收货再付款</div>
  <div class="conter">
    <div class="title">
      <p>品牌</p>
      {{ title }}
      <p>极速退款</p>
    </div>
    <div class="desc">该商品100%正品，假一赔十</div>
  </div>
  <img src="@/assets/images/zhengpin.png" alt="" class="zhengpin">
  <img src="@/assets/images/comment.png" alt="" class="zhengpin">
  <div class="bottom" @click="Buy">立即抢购</div>
  <div v-if="!isBuy" class="inBottom" @click="noBuy"></div>
</template>

<script>
import Swipe from '@/components/Swipe.vue'
import { useRouter } from 'vue-router'
import { reactive, ref } from '@vue/reactivity'
import { intoSecKill, commitSecKill } from '@/api/index'
import { onBeforeMount } from 'vue'
import { Dialog } from 'vant'
import Cookie from 'js-cookie'
export default {
  setup() {
    const router = useRouter()
    const images = reactive([])
    const userName = JSON.parse(Cookie.get('userInfo')).userName
    var isBuy = ref()
    var startTimeStamp = ref()
    var endTimeStamp = ref()
    var time = ref()
    var title = ref()
    // 在onBeforeMount中发请求
    onBeforeMount(async () => {
      let res = await intoSecKill()
      console.log(res.data)
      title.value = res.data[0].goodsName
      startTimeStamp.value = res.data[0].startTimeStamp
      endTimeStamp.value = res.data[0].endTimeStamp
      images.push(...res.data[0].images)
    })
    // 标题
    // title = data[0].goodsName
    // 倒计时
    var date = (time) => {
      if (time < 0) {
        return '抢购结束'
      }
      var Time = new Date(time)
      var h =
        (Time.getHours() < 10 ? '0' + Time.getHours() : Time.getHours()) -
        8 +
        ':'
      var m =
        (Time.getMinutes() < 10 ? '0' + Time.getMinutes() : Time.getMinutes()) +
        ':'
      var s =
        Time.getSeconds() < 10 ? '0' + Time.getSeconds() : Time.getSeconds()
      return h + m + s
    }
    setInterval(() => {
      // console.log(data[0].endTimeStamp)
      if (startTimeStamp.value - new Date().getTime() > 0) {
        // console.log(date(startTimeStamp.value - new Date().getTime()))
        time.value = date(startTimeStamp.value - new Date().getTime())
      } else if (startTimeStamp.value - new Date().getTime() < 0) {
        // console.log(endTimeStamp.value - new Date().getTime())
        time.value = date(endTimeStamp.value - new Date().getTime())
      }

      // time.value = date(
      //   startTimeStamp.value - new Date().getTime() > 0
      //     ? startTimeStamp.value - new Date().getTime()
      //     : endTimeStamp.value - new Date().getTime()
      // )
      if (
        startTimeStamp.value - new Date().getTime() > 0 ||
        endTimeStamp.value - new Date().getTime() < 0
      ) {
        isBuy.value = false
      } else {
        isBuy.value = true
      }
    }, 1000)
    function Buy() {
      Dialog.confirm({
        title: '抢购成功',
        message: '请确认订单'
      }) //点击确定提交数据
        .then(() => {
          commitSecKill({ goodsName: title.value, userName: userName }).then(
            (res) => {
              console.log(res)
              if (res.data.code == 200 || res.data.code == 201)
                Dialog.alert({
                  message: `${res.data.msg}`,
                  theme: 'round-button'
                })
            },
            (err) => {
              console.log(err)
            }
          )
        }) //点击取消返回首页
        .catch(() => {})
    }
    function noBuy() {
      if (startTimeStamp.value - new Date().getTime() > 0) {
        Dialog.alert({
          message: '未到抢购时间！！',
          theme: 'round-button'
        })
      } else if (endTimeStamp.value - new Date().getTime() < 0) {
        Dialog.alert({
          message: '活动已结束',
          theme: 'round-button'
        })
      }
    }
    function onClickLeft() {
      router.back()
    }
    return {
      title,
      images,
      time,
      onClickLeft,
      isBuy,
      Buy,
      noBuy
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
    Swipe
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  display: flex;
  padding: 0px;
  height: 90px;
  width: 100%;
  background-color: rgb(224, 46, 36);
  .price {
    flex: 7;
    height: 100%;
    padding: 10px;
    padding-left: 20px;
    .oldprice {
      margin-bottom: 5px;
      display: inline-block;
      font-size: 20px;
      color: white;
    }
    .num {
      margin-bottom: 5px;
      display: inline-block;
      font-size: 30px;
      color: white;
    }
    .newprice {
      margin-bottom: 5px;
      margin-left: 10px;
      display: inline-block;
      font-size: 15px;
      color: white;
    }
    .bottomprice {
      font-size: 13px;
      color: #ccc;
    }
    &::after {
      content: '';
      position: absolute;
      left: 70%;
      top: 50%;

      z-index: 1;
      display: block;
      height: 0px;
      width: 0px;
      border: 5px solid transparent;
      border-left: 5px solid rgb(253, 198, 43);
      border-top: 5px solid rgb(253, 198, 43);
      transform: translateX(50%) rotate(-45deg);
    }
  }
  .date {
    flex: 3;
    height: 90px;
    background-color: rgb(253, 198, 43);
    .text {
      margin-top: 20px;
      margin-bottom: 0px;
      display: inline-block;
      width: 100%;
      text-align: center;
      color: rgb(148, 40, 1);
      font-size: 20px;
      font-weight: 500;
    }
    .time {
      margin-top: 0px;
      display: inline-block;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 15px;
    }
  }
}
.banner {
  margin: 10px;
  background-color: rgb(236, 250, 237);
  color: rgb(50, 162, 37);
  padding: 5px;
  padding-left: 10px;
  font-weight: 550;
}
.conter {
  // height: 150px;
  width: 100%;
  overflow: hidden;
  .title {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 550;
    p {
      padding: 2px;
      display: inline;
      width: 50px;
      height: 20px;
      border-radius: 5px;

      font-size: 13px;
      font-weight: 300;
    }
    p:first-child {
      background-color: #000;
      color: white;
    }
    p:last-child {
      background-color: rgb(39, 180, 29);
      color: white;
    }
  }
  .desc {
    margin-top: 10px;
    margin-right: 20px;
    background-color: rgb(229, 235, 235);
    border-radius: 5px;
    font-size: 15px;
    margin-left: 10px;
    padding: 10px;
    color: #777;
    font-size: 13px;
    font-weight: 550;
  }
}
.zhengpin{
  width: 100%;
}
.bottom {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: rgb(223, 45, 35);
  color: white;
  text-align: center;
  font-size: 30px;
  line-height: 60px;
}
.inBottom {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: rgba(228, 216, 231, 0.6);
}
</style>
