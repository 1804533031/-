<template>
  <!-- 登录控件 -->
  <div id="login">
    <input id="tab-1" type="radio" name="tab" class="sign-in hidden" checked />
    <input id="tab-2" type="radio" name="tab" class="sign-up hidden" />
    <input id="tab-3" type="radio" name="tab" class="sign-out hidden" />
    <div class="wrapper">
      <!-- 登录页面 -->
      <div class="login sign-in-htm" :style="{ opacity }">
        <form class="container offset1 loginform">
          <!-- 猫头鹰控件 -->
          <div id="owl-login" class="login-owl">
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
                  id="login-username"
                  autocomplete="off"
                  placeholder="请输入用户名"
                  tabindex="1"
                  maxlength="15"
                  v-model="userName"
                />
                <label
                  class="input__label input__label--hideo"
                  for="login-username"
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
                  type="password"
                  id="login-password"
                  placeholder="请输入密码"
                  tabindex="2"
                  maxlength="15"
                  v-model="password"
                />
                <label
                  class="input__label input__label--hideo"
                  for="login-password"
                >
                  <i class="fa fa-fw fa-lock icon icon--hideo"></i>
                  <span
                    class="input__label-content input__label-content--hideo"
                  ></span>
                </label>
              </span>
              <span class="input input--hideo input--verify_code">
                <input
                  class="input__field input__field--hideo"
                  type="text"
                  id="login-verify-code"
                  autocomplete="off"
                  placeholder="请输入验证码"
                  tabindex="3"
                  maxlength="4"
                  v-model="yzm"
                />
                <label
                  class="input__label input__label--hideo"
                  for="login-verify-code"
                >
                  <i class="fa fa-fw fa-bell-o icon icon--hideo"></i>
                  <span
                    class="input__label-content input__label-content--hideo"
                  ></span>
                </label>
              </span>
              <!--这个是画验证码的地方 -->
              <div class="code-canvas">
                <canvas
                  class="verify-code-canvas"
                  id="code-canvas"
                  @click="createCode()"
                  :width="canvasWidth"
                  :height="canvasHeight"
                ></canvas>
              </div>
            </section>
          </div>
          <div class="form-actions">
            <!-- 以下按钮 -->
            <a
              tabindex="4"
              class="btn pull-left btn-link text-muted"
              @click.prevent="forget"
              >忘记密码?</a
            >
            <a
              tabindex="5"
              class="btn btn-link text-muted"
              @click.prevent="reset"
              >注册</a
            >
            <input
              class="btn btn-primary"
              type="button"
              tabindex="3"
              @click="login"
              value="登录"
              style="color: white"
            />
          </div>
        </form>
      </div>
      <img src="@/assets/img/logo.png" alt="" id="logo" />
      <div id="bg"></div>
    </div>
  </div>
</template>
<script>
import { postUser } from '@/api/index'
import Cookie from 'js-cookie'
import { mapState } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      userName: '',
      password: '',
      verificationCode: '',
      yzm: '',
      num: 0
    }
  },
  computed: {
    ...mapState('animation', ['opacity'])
  },
  watch: {
    verificationCode() {
      this.drawPic()
    }
  },
  methods: {
    // 以下登录验证
    login() {
      // console.log(1111)
      // const token = res.data.token.token
      // localStorage.setItem('token', 11)
      postUser({
        userName: this.userName,
        password: this.password
      }).then(
        (res) => {
          // console.log(res.data.data.token)
          const token = res.data.data.token
          Cookie.set('token', token)
          Cookie.set('userInfo', JSON.stringify(res.data.data.userDatas))
          Cookie.set('userlike', JSON.stringify(res.data.data.articleId))
          this.$router.push({
            name: 'content'
          })
        },
        (error) => {
          console.log(error.message)
        }
      )
    },
    // 跳转忘记密码页面
    forget() {
      this.$router.push({
        name: 'reset'
      })
    },
    //  跳转注册页面
    reset() {
      this.$router.push({
        name: 'signIn'
      })
    },
    // 生成验证码
    createCode() {
      let code = ''
      let codeLength = 4
      let randomArr = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
      for (var i = 0; i < codeLength; i++) {
        // Math.random()取值范围 [0,1)
        // index 取值范围 [0,9)
        let index = Math.floor(Math.random() * 9)
        code += randomArr[index]
      }
      this.verificationCode = code
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max)
      let g = this.randomNum(min, max)
      let b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    drawPic() {
      let canvas = document.getElementById('code-canvas')
      let ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(
        this.backgroundColorMin,
        this.backgroundColorMax
      )
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
      // 绘制文字
      for (let i = 0; i < this.verificationCode.length; i++) {
        this.drawText(ctx, this.verificationCode[i], i)
      }
      // 绘制干扰线
      this.drawLine(ctx)
      // 绘制干扰点
      this.drawDot(ctx)
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.textColorMin, this.textColorMax)
      ctx.font =
        this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
      let x = (i + 1) * (this.canvasWidth / (this.verificationCode.length + 1))
      let y = this.randomNum(this.fontSizeMax, this.canvasHeight - 5)
      var deg = this.randomNum(-45, 45)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    },
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
        ctx.beginPath()
        ctx.moveTo(
          this.randomNum(0, this.canvasWidth),
          this.randomNum(0, this.canvasHeight)
        )
        ctx.lineTo(
          this.randomNum(0, this.canvasWidth),
          this.randomNum(0, this.canvasHeight)
        )
        ctx.stroke()
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(
          this.randomNum(0, this.canvasWidth),
          this.randomNum(0, this.canvasHeight),
          1,
          0,
          2 * Math.PI
        )
        ctx.fill()
      }
    }
  },
  props: {
    fontSizeMin: {
      type: Number,
      default: 25
    },
    fontSizeMax: {
      type: Number,
      default: 30
    },
    backgroundColorMin: {
      type: Number,
      default: 255
    },
    backgroundColorMax: {
      type: Number,
      default: 255
    },
    textColorMin: {
      type: Number,
      default: 0
    },
    textColorMax: {
      type: Number,
      default: 160
    },
    lineColorMin: {
      type: Number,
      default: 100
    },
    lineColorMax: {
      type: Number,
      default: 255
    },
    dotColorMin: {
      type: Number,
      default: 0
    },
    dotColorMax: {
      type: Number,
      default: 255
    },
    canvasWidth: {
      type: Number,
      default: 110
    },
    canvasHeight: {
      type: Number,
      default: 35
    }
  },
  created() {
    this.createCode()
  },
  mounted() {
    this.$store.dispatch('animation/opcity', this.num)
    console.log(this.$store.state.animation)
  }
}
</script>
<style scoped>
#bg {
  background: url(@/assets/img/background2.jpg);
  width: 100%;
  height: 100vh;
  background-position: 20%, 0%;
}
#logo {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 65vh;
  left: 6vw;
  border-radius: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
}
.code-canvas {
  border-radius: 10px;
  cursor: pointer;
}
</style>
<!-- 无外部资源局部引入css -->

<style src="@/assets/css/tooltips.css" scoped></style>
<style src="@/assets/css/sign-up-login.css" scoped></style>
<style src="@/assets/css/normalize.css" scoped></style>
<style src="@/assets/css/verifyCode.css" scoped></style>
<style src="@/assets/css/inputEffect.css" scoped></style>
