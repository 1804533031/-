<template>
  <!-- 头部导航栏 -->
  <van-nav-bar
    title="发布帖子"
    left-text="返回"
    right-text="发表"
    left-arrow
    fixed
    placeholder
    @click-right="onClickRight"
    @click-left="onClickLeft"
  />
  <div>
    <!-- 多行文本框 -->
    <form>
      <textarea
        v-model="text"
        class="text"
        cols="30"
        rows="10"
        autofocus
        required
        maxlength="100"
        placeholder="分享这一刻..."
      ></textarea>
    </form>
    <!-- 帖子图片 -->
    <van-field name="uploader" label="上传图片：">
      <template #input>
        <van-uploader v-model="value" :max-count="9" />
      </template>
    </van-field>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { publishPost } from '@/api/index'
import Cookie from 'js-cookie'
export default {
  setup() {
    const router = useRouter()
    const value = ref([]) //帖子图片数组
    const text = ref('') //帖子文本
    // console.log(Cookie.get('userInfo'))
    const user = JSON.parse(Cookie.get('userInfo')) //在cookie中拿到用户信息
    const formData = new FormData()
    //dataurl:base64图片格式字符串
    //filename：文件名称
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
    function onClickRight() {
      var image = JSON.parse(JSON.stringify(value.value))
      for (let i = 0; i < image.length; i++) {
        //循环遍历图片数组
        image[i] = base64toFile(
          image[i].content,
          `${user.userName}${Date.parse(new Date())}${i}.jpg`
        ) //调用base64toFile将base64转化为文件
        formData.append('artPhoto', image[i]) //将图片逐个追加到formdata中
      }
      formData.append('userName', user.userName) //将用户名追加到formdata中
      formData.append('context', text.value) //将评论内容追加到formdata中
      publishPost(formData).then((res) => {
        console.log(res)
        // 发布成功跳转到PostView页面
        router.push({
          name: 'stroll'
        })
      }) //post请求发布帖子
    }
    function onClickLeft() {
      router.back() //返回上一页
    }
    return {
      onClickRight,
      value,
      text,
      onClickLeft
    }
  }
}
</script>

<style lang="less" scoped>
form {
  margin-left: 20px;
  .text {
    margin-right: 20;
    resize: none;
    width: 80%;
    height: 100px;
    border: none;
  }
}
.van-field {
  margin-right: -15px;
}
</style>
