<template>
  <!-- 商城顶部 -->
  <van-nav-bar
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    title="商城"
    fixed
    placeholder
  />
  <!-- 搜索栏 -->
  <!-- 按esc 清除所输入的内容 -->
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    input-align="center"
  />
  <!-- 警告 -->
  <van-notice-bar left-icon="volume-o" :scrollable="false">
    <van-swipe
      vertical
      class="notice-swipe"
      :autoplay="2500"
      :touchable="false"
      :show-indicators="false"
    >
      <!-- 明月直入，无心可猜
    仙人抚我顶，结发受长生
    今人不见古时月，今月曾经照古人 -->
      <van-swipe-item>所有商品热卖中。</van-swipe-item>
      <van-swipe-item>因疫情发货时间可能推迟。</van-swipe-item>
      <van-swipe-item>临近冬季注意宠物防寒。</van-swipe-item>
    </van-swipe>
  </van-notice-bar>
  <!-- 以下封装成为一个组件 -->

  <item
    v-for="item in shujv"
    :key="item.goodsId"
    :price="item.singPrice"
    :title="item.goodsTitle"
    :desc="item.goodsInfo"
    :img="item.goodsPhoto"
    @send="receipt"
    ref="orders"
  ></item>
  <div class="bottom"></div>
  <!-- 实现从后端传多少商品就展示多少个item  然后利用插槽去实现每个商品的不同-->
  <van-submit-bar
    :loading="loading"
    :price="Allprice * 100"
    button-text="提交订单"
    @submit="onSubmit"
  />
</template>

<script setup>
import { store } from "@/api/index";
import { Dialog } from "vant";
import { shopping } from "@/api/index";
import item from "@/components/StoreItem.vue";
import { useRouter } from "vue-router";
import Cookie from "js-cookie";
import { ref, onMounted, computed, reactive, nextTick } from "vue";
let loading = ref(false);
const orders = ref();
const router = useRouter();
const value = ref("");
let Allprice = ref(0);
const userName = JSON.parse(Cookie.get("userInfo")).userName;
const onConfirm = () => {
  item.value.toggle();
};
function onClickLeft() {
  router.back();
}
function onSubmit() {
  console.log("我是提交订单");
  console.log(orders.value[0].value);
  loading.value = true;
  const meOrder = reactive({
    userName: userName,
    allPrice: Allprice.value,
    goodsOrders: [],
  });
  // const arr = ref([]);

  for (let i = 0; i < orders.value.length; i++) {
    if (orders.value[i].value.num) {
      meOrder.goodsOrders.push({
        goodsNum: orders.value[i].value.num,
        goodsName: orders.value[i].value.title,
        singPrice: orders.value[i].value.price,
      });
    }
  }
  console.log(JSON.parse(JSON.stringify(meOrder)));

  // 发一波请求

  Dialog.confirm({
    title: "消息",
    message: "请确认订单",
  })
    .then(() => {
      // on confirm

      shopping(meOrder).then(
        (res) => {
          console.log(res);
        },
        (error) => {
          error.message;
        }
      );
      router.push({
        name: "home",
      });
    })
    .catch(() => {
      loading.value=false
    });
}
function receipt(shu) {
  Allprice.value += shu;
}
// // 搜索的逻辑

// 搜索功能实现
// stores = computed(() => {
//   return goods.filter((x) => {
//     return x.title.indexOf(value.value) !== -1
//   })
// })
//#endregion
let stores = {
  shujv: [],
};
onMounted(() => {
  store().then(
    (res) => {
      stores.shujv = res.data;

      console.log(stores.shujv);
      guolv.value = stores.shujv;
    },
    (error) => {
      error.message;
    }
  );
});
let guolv = ref([]);
let shujv = computed(() => {
  return guolv.value.filter((x) => {
    return x.goodsTitle.indexOf(value.value) !== -1;
  });
});
</script>

<style>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.van-submit-bar__bar {
  background-color: cornsilk;
}
.bottom {
  height: 50px;
}
</style>
