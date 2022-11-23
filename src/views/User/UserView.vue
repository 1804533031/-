<template>
  <van-nav-bar title="我的" fixed placeholder />
  <div class="all">
    <div class="header">
      <div class="background">
        <img :src="user.fileUrl" alt="" />
      </div>
      <div class="user">
        <img :src="user.fileUrl" class="headpotrait" />
        <span
          >{{ user.userName }}
          <img v-if="user.sex == 1" src="@/assets/icon/man.png" class="sex" />
          <img v-else src="@/assets/icon/woman.png" class="sex"
        /></span>
      </div>
    </div>
    <div class="function">
      <router-link to="/myLike">
        <p>我的点赞<span>></span></p>
      </router-link>

      <div class="divide">
        <router-link to="/myArticle">
          <p>我的帖子<span>></span></p>
        </router-link>
      </div>

      <router-link to="/order">
        <p>我的订单<span>></span></p>
      </router-link>

      <router-link to="/myAdopt">
        <p>我的领养<span>></span></p>
      </router-link>

      <router-link to="/alter">
        <p>修改信息<span>></span></p>
      </router-link>
  
      <router-link to="/about">
        <p>关于社区<span>></span></p>
      </router-link>

     
        <p @click="limits">用户信息  <span>></span><span>管理员</span></p>

      <p @click="logout">退出登录<span>></span></p>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { allUser } from "@/api/index";
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { LogOut } from '@/api/index'
import Cookie from 'js-cookie'

export default {
  name: 'user',
  setup() {
 
    const router = useRouter()
    let user = JSON.parse(Cookie.get('userInfo'))
    function logout() {
      console.log('退出登录')
      // Cookie.remove('token')
      // router.push({
      //   name: 'login'
      // })
      LogOut({ userId: JSON.parse(Cookie.get('userInfo')).userId }).then(
        (res) => {
          Cookie.remove('token')
          router.push({
            name: 'login'
          })
        }
      )
    }


    function   limits(){
      allUser(Cookie.get("token"), Cookie.get("token"))
    .then(
      (res) => {
        if(  res.data.code==403){
          Dialog({message:res.data.msg})
        }else{
          router.push({
            name:"Alluser"
          })
        }
      
      },
      (error) => {
        console.log(error.message);
      }
    )
    }
      
   
    return {
      user,
      limits,
      logout,
     
    }
  }
}
</script>

<style lang="less" scoped>
a {
  color: black;
}
.all {
  min-height: calc(100vh - 96px);
  background-color: whitesmoke;
  .header {
    width: 100%;
    background-color: whitesmoke;
    position: relative;
    .background {
      height: 200px;
      overflow: hidden;
      img {
        width: 100%;
        filter: blur(5px);
      }
    }
    .user {
      // border: 1px solid transparent;
      height: 50px;
      .headpotrait {
        position: absolute;
        top: 150px;
        left: 20px;
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
      span {
        line-height: 40px;
        margin-left: 130px;
        font-weight: 500;
        font-size: 20px;
        // padding-top: 20px;
      }
      .sex {
        height: 25px;
        vertical-align: middle;
      }
    }
  }
  .function {
    margin-top: 20px;
    .divide {
      margin-bottom: 20px;
    }
    p {
      margin: 0px;
      height: 40px;
      // background-color: whitesmoke;
      background-color: white;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px dotted #eee;
      span {
        float: right;
        margin-right: 20px;
        color: #ccc;
      }
    }
    P:active {
      background-color: whitesmoke;
    }
  }
}
</style>
