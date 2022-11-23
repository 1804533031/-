<template>
  <van-nav-bar
    title="逛逛"
    right-text="发布"
    fixed
    placeholder
    @click-right="onClickRight"
  />
  <!-- 引用帖子组件并循环渲染 -->
  <article-item
    v-for="item in Article"
    :key="item.id"
    :headPotrait="item.fileUrl"
    :userName="item.userName"
    :title="item.context"
    :comments="item.children"
    :images="item.artPhoto"
    :id="item.id"
    :artLiker="item.artLiker"
    :commentNum="item.commentNum"
  ></article-item>
</template>
<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { onBeforeMount } from 'vue'
import { getArticle } from '@/api/index'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    // 测试假数据
    let forum = reactive([
      //模拟帖子数据

      {
        id: 1,
        context: '这只猫咪很可爱呀，好喜欢！！！',
        userName: 'ymc',
        fileUrl:
          'http://43.143.140.144:9000/images/headpotrait/44C01526ABF1E4C5CB1FC88D2C051F9A.jpg',
        artPhoto: [
          'http://43.143.140.144:9000/images/headpotrait/44C01526ABF1E4C5CB1FC88D2C051F9A.jpg',
          'http://43.143.140.144:9000/images/headpotrait/44C01526ABF1E4C5CB1FC88D2C051F9A.jpg',
          'http://43.143.140.144:9000/images/headpotrait/44C01526ABF1E4C5CB1FC88D2C051F9A.jpg'
        ],
        create_time: '2022-11-11 23:17:11',
        children: [
          {
            id: 2,
            context: 'up的帖子真的好好呀！！！',
            userName: 'zqx',
            replyName: 'ymc',
            fileUrl:
              'http://43.143.140.144:9000/images/headpotrait/5FA4664A154F152EA805C7D488DD59BC.jpg',
            create_time: '2022-11-11 13:24:19',
            children: [
              {
                id: 3,
                context: '网友所言极是，美极了！！！',
                userName: 'djx',
                replyName: 'zqx',
                fileUrl:
                  'http://43.143.140.144:9000/images/headpotrait/6DADAA9524DE4F77CAF6F9953446EF77.jpg',
                create_time: '2022-11-11 13:24:19',
                children: [
                  {
                    id: 5,
                    context: '我也折磨认为滴',
                    userName: 'ershi',
                    replyName: 'djx',
                    fileUrl:
                      'http://43.143.140.144:9000/images/headpotrait/C8DF0A0448C75D9F29857E12F7A08C9C.jpg',
                    create_time: '2022-11-11 13:28:30',
                    children: [],
                    pid: 3
                  }
                ],
                pid: 2
              }
            ],
            pid: 1
          },
          {
            id: 9,
            context: '直接打他，让他屈服',
            userName: 'zqx',
            replyName: 'ymc',
            fileUrl:
              'http://43.143.140.144:9000/images/headpotrait/5FA4664A154F152EA805C7D488DD59BC.jpg',
            create_time: '2022-11-11 23:17:11',
            children: [],
            pid: 1
          }
        ],
        pid: null
      },
      {
        id: 4,
        context: '我家这只猫咪真不让我省心',
        userName: 'caoyabei',
        fileUrl:
          'http://43.143.140.144:9000/images/headpotrait/5FA4664A154F152EA805C7D488DD59BC.jpg',
        create_time: '2022-11-11 13:27:36',
        children: [
          {
            id: 6,
            context: '哈哈，你家的真可爱呀！！！',
            userName: 'ikun',
            replyName: 'caoyabei',
            fileUrl:
              'http://43.143.140.144:9000/images/headpotrait/EE740808859F9A88E9A8A14F9450D44C.jpg',
            create_time: '2022-11-11 13:29:02',
            children: [
              {
                id: 7,
                context: '我觉得越是捣蛋的猫咪，人越喜欢',
                userName: 'zhangsan',
                replyName: 'ikun',
                fileUrl:
                  'http://43.143.140.144:9000/images/headpotrait/7D410EC2E3D022021AC7314867F5B0EA.jpg',
                create_time: '2022-11-11 13:30:16',
                children: [],
                pid: 6
              }
            ],
            pid: 4
          },
          {
            id: 8,
            context: 'hhhh',
            userName: 'ymc',
            replyName: 'caoyabei',
            fileUrl:
              'http://43.143.140.144:9000/images/headpotrait/44C01526ABF1E4C5CB1FC88D2C051F9A.jpg',
            create_time: '2022-11-12 10:11:17',
            children: [],
            pid: 4
          }
        ],
        pid: null
      }
    ])
    var Article = reactive([])
    // 跳转发布帖子页面
    function onClickRight() {
      router.push('/issue')
    }

    console.log()
    // 在BeforeMount生命周期发请求拿到数据
    onBeforeMount(async () => {
      let res = await getArticle()
      console.log(res.data.data)
      Article.push(...res.data.data)
      // Article = res.data.data
    })
    return {
      forum,
      onClickRight,
      Article
    }
  },
  components: {
    ArticleItem
  }
}
</script>
