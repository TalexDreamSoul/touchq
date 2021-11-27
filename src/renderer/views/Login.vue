<template>

  <div class="Login-Page" ref="LoginPageRef" v-loading="loadingData">

    <div class="LeftAside">

      <ul class="bg-bubbles">
        <li v-for="i in 10" :key="i"></li>
      </ul>

     <div class="AsideLiteImage">

       <LiteImage></LiteImage>

     </div>

    </div>

    <div class="RightAside">

      <div :class="isLogin ? 'Login-Main-Frame' : ''" class="Login-Main" @keydown.enter="isLogin" v-loading="isLogin">

<!--        头像区-->
        <div v-show="!codeMode" class="Login-AvatarContainer" :class="isLogin ? 'Login-Main-Avatar-Frame' : ''">

          <img :class="{ avatarExpand: avatarExpand, avatarShrink: avatarShrink }" ref="loginAvatarRef" alt="" :src='loginAvatar' />

        </div>

<!--        登录表单-->
        <div class="loginForm">

          <span v-show="!codeMode">

            <el-input prefix-icon="el-icon-user" placeholder="账号" v-model="loginForm.user" clearable></el-input>
            <el-input prefix-icon="el-icon-lock" placeholder="密码" v-model="loginForm.pass" clearable></el-input>

            <TBubbleButton class="LoginButton" @clicker="login">登录</TBubbleButton>

          </span>

          <span @click="refreshLoginCode" v-show="codeMode">

            <div class="codeImg" :style="`background-image: url(${codeSrc})`" ></div>

          </span>

          <el-button :style="codeMode ? 'width: 85%;left: 0' : ''" @click="codeMode = !codeMode" class="codeButton" :type="codeMode ? 'primary' : 'info'" round><TIcon class="codeIcon" :icon="codeMode ? 'touchq-yonghu1' : 'touchq-erweima'"></TIcon><span style="position: relative;top: -1px" v-show="codeMode">&nbsp;&nbsp;&nbsp;切换为账号密码登录</span></el-button>

        </div>

        <TipMentioner ref="mentioner" class="mentioner" content=""></TipMentioner>

      </div>

    </div>

    <TalexDialog header-content="验证码" :visible="sliderDialogVisible">

      <iframe frameborder="0" class="sliderFrame" :src="sliderSrc"></iframe>

      <br /><br />

      <TBubbleButton @clicker="submitSlider">滑动完成</TBubbleButton>

    </TalexDialog>

  </div>

</template>

<script>

import TalexDialog from "../components/talex/dialog/TalexDialog";
export default {

  name: "Login",
  components: {TalexDialog},
  data() {

    return {

      avatarTimeOut: null,
      loginAvatar: "http://q1.qlogo.cn/g?b=qq&nk=10000&s=100",
      loginForm: {

        user: "2072897046",
        pass: ""

      },

      sliderDialogVisible: false,
      sliderSrc: "",

      codeMode: false,
      codeSrc: "",
      codeInterval: null,

      isLogin: false,

      loadingData: false,

      avatarShrink: false,
      avatarExpand: false,

    }

  },

  mounted() {

    this.$refs.mentioner.showTip('登录你的账号', -1)

  },

  watch: {

    'loginForm.user': {

      deep: true,
      handler(latest, old) {

        //节流
        if(this.avatarTimeOut) {

          clearTimeout(this.avatarTimeOut)

        }

        this.avatarExpand = false
        this.avatarShrink = true

        this.avatarTimeOut = setTimeout(() => {

          this.avatarShrink = false

          this.avatarExpand = true

          const target = latest.user || 10000

          this.loginAvatar = `http://q1.qlogo.cn/g?b=qq&nk=${target}&s=100`

        }, 350)

      }

    },

    codeMode: {

      handler(latest, old) {

        if(latest) {

          this.refreshLoginCode()

          this.$refs.mentioner.showTip('扫码登录QQ ' + this.loginForm.user, -1)

        } else {

          clearInterval(this.codeInterval)
          this.$refs.mentioner.showTip('登录你的账号', -1)

        }

      }

    }

  },

  methods: {

    login() {

      const { user, pass } = this.loginForm

      if( (!user || user.length < 5) /*|| (!pass || pass.length < 5)*/ ) {

        this.$refs.mentioner.showTip('信息填写不符合规范', 3000)
        return

      }

      if( user[0] === '+' ) {

        if( user.length < 12 ) {

          this.$refs.mentioner.showTip('未知的手机号', 3000)
          return

        }

        this.$refs.mentioner.showTip('已发送手机短信验证码!', 10000)
        return

      }

      this.$refs.mentioner.showTip('', 0)
      this.isLogin = true

      this.$touchq.login(user, pass + '', this.msgFunc)

    },

    refreshLoginCode() {

      this.$touchq.loginWithCode(this.loginForm.user, (src) => {

        this.codeSrc = src

        let hasShow = false

        this.codeInterval = setInterval(async() => {

          const res = await this.$touchq.client.queryQrcodeResult()

          switch(res.retcode) {

              //已扫码
            case 53: {

              if(hasShow) return

              hasShow = true

              this.$refs.mentioner.showTip('请确认登录!', -1)
              break;

            }

            case 54: {

              clearInterval(this.codeInterval)

              this.$refs.mentioner.showTip('二维码已失效, 请点击图片刷新', -1)
              break;

            }

            case 0: {

              clearInterval(this.codeInterval)

              this.loadingData = true

              await this.$touchq.submitQrCodeLogin()

              break;

            }

          }

        }, 1000)

      }, this.msgFunc)

    },

    submitSlider() {

      this.sliderSrc = ""
      this.sliderDialogVisible = false

      this.$touchq.submitSlider()

    },

    msgFunc(access, msg) {

      this.isLogin = false

      if(!access) {

        if(msg.type) {

          switch(msg.type) {

            case 'slider': {

              this.isLogin = true

              this.sliderSrc = msg.e.url
              this.sliderDialogVisible = true

              break;

            }

            case 'device': {

              this.isLogin = true

              this.$message.info("请完成设备验证")

              setTimeout(() => {

                const { shell } = require('electron');

                shell.openExternal(msg.e.url)

              }, 1200)

              break;

            }

            case 'error': {

              if(msg.message)
                this.$message.error(msg.message)

            }

          }

          return

        }

        this.$refs.mentioner.showTip(msg, -1)

      } else {

        const el = this.$refs.LoginPageRef

        el.style.transition = 'all .45s'
        el.style.transform = 'translateY(300px)'
        el.style.opacity = '0'

        setTimeout(() => {

          this.$router.push("/chat")

        }, 450)

      }

    }

  },

}
</script>

<style lang="scss">

.LeftAside {

  .bg-bubbles {
    z-index: -1;
    position: absolute;
    // 使气泡背景充满整个屏幕；
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // 如果元素内容超出给定的宽度和高度，overflow 属性可以确定是否显示滚动条等行为；
    overflow: hidden;
    li {
      position: absolute;
      // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
      bottom: -160px;
      // 默认的气泡大小；
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.15);
      list-style: none;
      // 使用自定义动画使气泡渐现、上升和翻滚；
      animation: square 15s infinite;
      transition-timing-function: linear;
      // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
      &:nth-child(1) {
        left: 10%;
      }
      &:nth-child(2) {
        left: 20%;
        width: 90px;
        height: 90px;
        animation-delay: 2s;
        animation-duration: 7s;
      }
      &:nth-child(3) {
        left: 25%;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-duration: 8s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(5) {
        left: 70%;
      }
      &:nth-child(6) {
        left: 80%;
        width: 120px;
        height: 120px;
        animation-delay: 3s;
        background-color: rgba(255, 255, 255, 0.2);
      }
      &:nth-child(7) {
        left: 32%;
        width: 160px;
        height: 160px;
        animation-delay: 2s;
      }
      &:nth-child(8) {
        left: 55%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
        animation-duration: 15s;
      }
      &:nth-child(9) {
        left: 25%;
        width: 10px;
        height: 10px;
        animation-delay: 2s;
        animation-duration: 12s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(10) {
        left: 85%;
        width: 160px;
        height: 160px;
        animation-delay: 5s;
      }
    }
    // 自定义 square 动画；
    @keyframes square {
      0% {
        opacity: 0.5;
        transform: translateY(0px) rotate(45deg);
      }
      25% {
        opacity: 0.75;
        transform: translateY(-400px) rotate(90deg)
      }
      50% {
        opacity: 1;
        transform: translateY(-600px) rotate(135deg);
      }
      100% {
        opacity: 0;
        transform: translateY(-1000px) rotate(180deg);
      }
    }
  }

  z-index: 1;
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  //overflow: hidden;

  background-color: #1b7cb9;

  .AsideLiteImage {

    position: absolute;

    left: 50%;
    top: 50%;

    height: 100%;
    width: 100%;

    transform: translate(-70%, -55%);

  }

}

.RightAside {

  z-index: 2;
  position: absolute;

  top: 17%;
  right: 5%;

  width: 35%;
  height: 66%;
  overflow: hidden;

  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255,.4);

  border-radius: 5px;

}

.Login-Main-Avatar-Frame {

  transform: rotate(0);

  animation: avatarFrame 1.25s infinite linear;

}

.Login-Main-Frame {

  transform: translate(-50%, -50%) translateY(-3%) scale(0.85) !important;

}

.loginForm {

  position: relative;

  height: 100%;

  .codeImg {

    position: relative;

    margin-bottom: -30px;

    width: 85%;
    height: 85%;

    left: 50%;

    transform: translate(-50%, 0);

    background-size: 105%;
    background-repeat: no-repeat;
    background-position: 50%;
    backdrop-filter: blur(10px);
    opacity: 0.8;

  }

  .codeButton {

    position: relative;

    top: 50px;
    left: 15px;

    width: 32px;

    padding: 7px !important;

    border-radius: 3px !important;

    transition: all .25s;

  }

  .el-input {

    input {

      padding: 10px 15px 10px 30px;

      border: 0;
      background-color: var(--mainColor);

      transition: all .25s;

      border-bottom: 2px solid var(--mainColor);

      color: var(--textnormalColor) !important;

    }

    input:focus {

      background-color: var(--mainColor) !important;

      border-radius: 3px 3px 0 0;
      border-bottom: 2px solid var(--appColor);

    }

    position: relative;

    max-width: 90%;
    max-height: 38px;

    left: 50%;

    transform: translate(-50%, 40px);

    margin-bottom: 20px;

  }

}

</style>

<style lang="scss" scoped>

.Login-Main {

  .LoginButton {

    position: relative;

    top: 50px;
    left: 5%;

    width: calc(90% - 38px);

    transition: all .25s;

  }

  .avatarShrink {

    animation: avatarShrink .45s;

  }

  .avatarExpand {

    animation: avatarExpand .45s;

  }

  .codeIcon {

    position: relative;

    font-size: 16px;

  }

  .mentioner {

    position: absolute;

    width: 100%;
    height: 30px;

    left: 0;
    bottom: -45px;

  }

  .Login-AvatarContainer {

    position: relative;

    margin-bottom: -10px;

    left: 50%;
    top: -1%;

    min-width: 96px;
    min-height: 96px;
    max-width: 96px;

    transform: translate(-50%, 0);
    border-radius: 50%;

    backdrop-filter: blur(10px);
    background-color: var(--textOpacityColor3);

    overflow: hidden;

    img {

      position: absolute;

      top: 50%;
      left: 50%;

      width: 100%;

      transform: translate(-50%, -50%) scale(0.85);

      border-radius: 50%;

    }

  }

  position: relative;

  left: 50%;
  top: 50%;

  height: 340px;
  width: 360px;

  padding: 30px;

  border-radius: 3px;
  transform: translate(-50%, -50%) translateY(-5%);

  backdrop-filter: blur(5px);
  background-color: var(--themeOpacityColor);
  text-align: center;

  box-sizing: border-box;
  transition: all .35s;

}

.Login-Page {

  position: absolute;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

}

</style>
