<template>
  <div id="login">
    <input id="tab-1" type="radio" name="tab" class="sign-in hidden" checked />
    <input id="tab-2" type="radio" name="tab" class="sign-up hidden" />
    <input id="tab-3" type="radio" name="tab" class="sign-out hidden" />
    <div class="login sign-out-htm" :style="{ opacity }">
      <form action="#" method="post" class="container offset1 loginform">
        <!-- 猫头鹰控件 -->
        <div id="owl-login" class="forget-owl">
          <div class="hand"></div>
          <div class="hand hand-r"></div>
          <div class="arms">
            <div class="arm"></div>
            <div class="arm arm-r"></div>
          </div>
        </div>
        <div class="pad input-container">
          <section class="content">
            <span class="input input--hideo">
              <input
                class="input__field input__field--hideo"
                type="text"
                id="forget-username"
                autocomplete="off"
                placeholder="请输入用户名"
                v-model="account"
              />
              <label
                class="input__label input__label--hideo"
                for="forget-username"
              >
                <i class="fa fa-fw fa-user icon icon--hideo"></i>
                <span
                  class="input__label-content input__label-content--hideo"
                ></span>
              </label>
            </span>
            <span class="input input--hideo">
              <input
                class="input__field input__field--hideo"
                type="text"
                id="forget-code"
                autocomplete="off"
                placeholder="请输入密码"
                v-model="password"
              />
              <label class="input__label input__label--hideo" for="forget-code">
                <i class="fa fa-fw fa-wifi icon icon--hideo"></i>
                <span
                  class="input__label-content input__label-content--hideo"
                ></span>
              </label>
            </span>
            <span class="input input--hideo">
              <input
                class="input__field input__field--hideo"
                type="password"
                id="forget-password"
                placeholder="请输入邮箱"
                v-model="email"
              />
              <label
                class="input__label input__label--hideo"
                for="forget-password"
              >
                <i class="fa fa-fw fa-lock icon icon--hideo"></i>
                <span
                  class="input__label-content input__label-content--hideo"
                ></span>
              </label>
            </span>
          </section>
        </div>
        <div class="form-actions">
          <!-- 两个按钮实现路由跳转 -->
          <a class="btn pull-left btn-link text-muted" @click.prevent="login"
            >返回登录</a
          >
          <input
            class="btn btn-primary"
            type="button"
            value="注册"
            @click="register"
            style="color: white"
          />
        </div>
      </form>
    </div>
    <div id="bg"></div>
  </div>
</template>

<script>
import { signIn } from '@/api/index'
import { mapMutations } from 'vuex'
export default {
  name: 'zhuce',
  data() {
    return {
      opacity: 1,
      account: '',
      password: '',
      email: '',
      opc: 0,
      switch: true
    }
  },
  methods: {
    login() {
      this.$store.commit('animation/login', this.opc)
      this.$store.commit('animation/switch', this.switch)
      if (this.opacity == 1) {
        this.timer = setInterval(() => {
          this.opacity -= 0.02
          if (this.opacity < 0) {
            clearInterval(this.timer)
            this.$router.push({
              name: 'login'
            })
          }
        }, 20)
      }
    },
    register() {
      signIn({
        userName: this.account,
        password: this.password,
        email: this.email
      }).then(
        (res) => {
          // if注册成功就返回登录页面
          console.log(res)
          alert('注册成功')
          this.$router.push({
            name: 'login'
          })
        },
        (error) => {
          console.log(error.message)
        }
      )
    }
  }
}
</script>

<style scoped>
#bg {
  background: url(@/assets/img/background.jpg);
  width: 100vw;
  height: 100vh;
  background-position: 70%, 0%;
}
.sign-out-htm {
  /* display: none; */
  opacity: 1;
}
</style>
<style src="@/assets/css/tooltips.css" scoped></style>
<style src="@/assets/css/sign-up-login.css" scoped></style>
<style src="@/assets/css/normalize.css" scoped></style>
<style src="@/assets/css/verifyCode.css" scoped></style>
