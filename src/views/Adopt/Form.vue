<template>
  <van-nav-bar
    title="领养意愿单"
    left-text="返回"
    left-arrow
    fixed
    placeholder
    @click-left="onClickLeft"
  />

  <van-cell-group inset>
    <!-- 输入任意文本 -->
    <van-field v-model="text" label="宠物编号" :readonly="true" />
    <!-- 输入手机号，-->
    <van-field v-model="tel" type="tel" label="联系方式" />
    <!-- 允许输入正整数， -->
    <van-field v-model="name" label="领养人姓名" />
    <!-- 可以使用cookie拿 -->

    <van-field v-model="adress" label="家庭住址" />
    <!-- 输入地址-->
  </van-cell-group>
  <van-field name="radio" label="有无其他宠物">
    <template #input>
      <van-radio-group v-model="checked" direction="horizontal">
        <van-radio name="1">有</van-radio>
        <van-radio name="2">无</van-radio>
      </van-radio-group>
    </template>
  </van-field>
  <van-field name="radio" label="是否有过宠物因素过敏">
    <template #input>
      <van-radio-group v-model="checked2" direction="horizontal">
        <van-radio name="1">是</van-radio>
        <van-radio name="2">否 </van-radio>
      </van-radio-group>
    </template>
  </van-field>

  <van-field name="checkboxGroup" label="领养前准备">
    <template #input>
      <van-checkbox-group v-model="groupChecked" direction="horizontal">
        <van-checkbox name="1" shape="square">宠物的窝</van-checkbox>
        <van-checkbox name="2" shape="square">相关食物</van-checkbox>
      </van-checkbox-group>
    </template>
  </van-field>
  <van-field name="rate" label="家庭或朋友对宠物的接受度">
    <template #input>
      <div>
        <van-rate v-model="value" />
      </div>
    </template>
  </van-field>
  <van-field name="uploader" label="与宠物的亲密照片(可选)">
    <template #input>
      <van-uploader v-model="value3" />
    </template>
  </van-field>
  <!-- 这是地区 -->
  <van-field
    v-model="result"
    is-link
    readonly
    name="area"
    label="所在地区选择"
    placeholder="点击选择省市区"
    @click="showArea = true"
  />
  <van-popup v-model:show="showArea" position="bottom">
    <van-area
      :area-list="areaList"
      @confirm="onConfirm"
      @cancel="showArea = false"
    />
  </van-popup>
  <!-- 这是申请 -->
  <van-cell-group inset>
    <van-field
      v-model="message"
      rows="4"
      autosize
      label="申请"
      type="textarea"
      maxlength="150"
      placeholder="请输入留言"
      show-word-limit
    />
  </van-cell-group>
  <div id="switch">
    <van-button
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      loading-text="加载中..."
      :loading="animate"
      @click="submit"
    >
      提交申请
    </van-button>
  </div>
</template>

<script setup>
import { submitPet } from '@/api/index'
import { Dialog } from 'vant'
import { areaList } from '@vant/area-data'
import Cookie from 'js-cookie'
import { ref, onMounted, nextTick, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
let userName = JSON.parse(Cookie.get('userInfo')).userName

let animate = ref(false)
// 动画请稍等
const text = ref('')
// 宠物编号
const tel = ref('')
// 手机
const name = ref('')
// 姓名
const adress = ref('')
// 地址
const checked = ref('2')
const checked2 = ref('2')
// 两个单选
const groupChecked = ref([])
// 领养前准备
const value = ref(0)
// 能否接受
const value3 = ref([])
//  上传照片

const message = ref('')

// 配置额外信息
// console.log(route.query.id); // 第二步
// 地区选择配置
const result = ref('')
// 所在地区
const showArea = ref(false)
const onConfirm = (areaValues) => {
  showArea.value = false
  result.value = areaValues
    .filter((item) => !!item)
    .map((item) => item.name)
    .join('/')
}
// 使用路由传参
const route = useRoute()
const router = useRouter()
onMounted(() => {
  console.log(route.query.ID)
  text.value = route.query.ID
})
const onClickLeft = () => history.back()
// 返回领养页面
// 提交页面

// 以下关于发请求
const submits = reactive({
  wishFormId: route.query.ID,
  telephone: tel,
  userName: userName
  // cookie拿数据
})

function submit() {
  animate.value = true
  // 发一波请求
  console.log('请求')
if(submits.telephone!=''){
  Dialog.confirm({
  title: '注意',
  message:
    '确认提交领养信息?',
})
  .then(() => {
    // on confirm  
    submitPet(submits).then(
    (res) => {
      Dialog({ message: res.data.msg })
        animate.value = false
    },
    (error) => {
      error.message
    }
  )
    const timers = setTimeout(() => {
    router.push({
    name: 'adopt'
    })
  }, 1600)
  })
  .catch(() => {
    // on cancel

  });
    
}
else{
  alert("您的电话号码不能为空")
  animate.value = false
}
 
  

}
</script>

<style scoped>
#switch {
  margin-left: 40vw;
  margin-top: 3vh;
}
:deep .van-field__body {
  margin-top: 1.5vh;
  margin-left: 1vw;
}
:deep .van-button {
  width: 25vw;
}
</style>
