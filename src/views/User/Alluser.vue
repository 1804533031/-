<template>
  <!-- 商城顶部 -->
  <van-nav-bar
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    title="所有用户"
    fixed
    placeholder
  />
  <div v-for="item in users.userInfo" :key="item.userId" id="father">
    <van-card
      :desc="'邮箱:' + item.email"
      :title="'用户名:' + item.userName"
      :thumb="item.fileUrl"
    />
    <div id="status" :style="`background-color:${item.statusCode}`"></div>
    <van-cell-group>
      <van-cell title="创建时间" :value="item.create_time" />
    </van-cell-group>
  </div>
</template>

<script setup>
import { allUser } from "@/api/index";
import { onMounted, ref, reactive, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import Cookie from "js-cookie";
const router = useRouter();

const users = reactive({
  userInfo: [],
});
function onClickLeft() {
  router.back();
}
onMounted(() => {
  allUser(Cookie.get("token"), Cookie.get("token"))
    .then(
      (res) => {
        console.log(res.data);
        users.userInfo = res.data;

        //   for(let i=0 ; i<res.data.length; i++){
        //    console.log(res.data[i].statusCode);
        // }

        // console.log(backgrounds.backgroundColor);
      },
      (error) => {
        console.log(error.message);
      }
    )
    .catch();
});
</script>

<style lang="less" scoped>
#father {
  position: relative;
}
/deep/.van-nav-bar{
    z-index: 3;
}
#status {
  position: absolute;
  height: 14px;
  width: 14px;
  top: 7px;
  left: 12px;
  z-index: 2;
  border-radius: 7px;
}
.van-card {
  position: relative;
  z-index: 1;
  background-color: azure;
  max-height: 11vh;
  border-radius: 15px 15px 0 0;
  margin-top: 10px;
}
.van-cell {
  background-color: azure;
  border-radius: 0 0 15px 15px;
}
:deep .van-ellipsis {
  margin-top: 15px;
  font-size: medium;
}
:deep .van-card__title {
  font-size: medium;
}
</style>