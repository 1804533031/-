<template>
  <!-- 头部区域 -->
  <van-nav-bar
    title="修改信息"
    left-text="返回"
    left-arrow
    fixed
    placeholder
    @click-left="onClickLeft"
  />
  <!-- 表单区域 -->
  <van-form @submit="onSubmit">
    <!-- 修改头像 -->
    <van-field name="uploader" label="修改头像:">
      <template #input>
        <van-uploader v-model="value" :max-count="1" />
      </template>
    </van-field>
    <!-- 修改用户名 -->
    <!-- <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    /> -->
    <!-- 修改性别 -->
    <van-field
      v-model="result"
      is-link
      readonly
      name="picker"
      label="修改性别"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <!-- 提交按钮 -->
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import router from '@/router'
import Cookie from 'js-cookie'
import { updateUserInfo } from '@/api/index'
export default {
  setup() {
    const user = JSON.parse(Cookie.get('userInfo'))
    // console.log(user)
    const router = useRouter()
    // const username = ref('李四')
    const value = ref([])
    const result = ref(user.sex == '1' ? '男' : '女')
    const showPicker = ref(false)
    const columns = ['男', '女']
    const onConfirm = (value) => {
      result.value = value
      showPicker.value = false
    }
    const formData = new FormData()
    function base64toFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }

    function onClickLeft() {
      router.back()
    }
    function onSubmit() {
      var image = JSON.parse(JSON.stringify(value.value))
      // console.log(image[0].content)
      image[0] = base64toFile(
        image[0].content,
        `${user.userName}${Date.parse(new Date())}00.jpg`
      ) //调用base64toFile将base64转化为文件
      let sex = result.value == '男' ? '1' : '0'
      formData.append('file', image[0]) //将图片追加到formdata中
      formData.append('userName', user.userName)
      formData.append('sex', sex)
      // console.log(image[0], '----', user.userName, '----', ww)
      updateUserInfo(formData).then((res) => {
        console.log(res.data.data)
        Cookie.set('userInfo', JSON.stringify(res.data.data))
        router.push({
          name: 'user'
        })
      })
    }
    return {
      // username,
      value,
      onClickLeft,
      onSubmit,
      result,
      columns,
      onConfirm,
      showPicker
    }
  }
}
</script>

<style lang="less"></style>
