<template>

  <div class="Login-Page" ref="LoginPage" v-loading="loadingData">

    <div class="LeftAside">

      <ul class="bg-bubbles">
        <li v-for="i in 10" :key="i"></li>
      </ul>

     <div class="AsideLiteImage">

       <LiteImage></LiteImage>

     </div>

      <div class="Wave"></div>

    </div>

    <div class="RightAside">

      <div v-show="isLogin">

        <div class="Login-bgContainer"></div>
        <div class="Login-bgContainer"></div>
        <div class="Login-bgContainer"></div>
        <div class="Login-bgContainer"></div>
        <div class="Login-bgContainer"></div>

      </div>

      <div :class="isLogin ? 'Login-Main-Frame' : ''" class="Login-Main" @keydown.enter="isLogin" v-loading="isLogin">

        <div class="Login-AvatarContainer" :class="isLogin ? 'Login-Main-Avatar-Frame' : ''">

          <img :class="{ avatarExpand: avatarExpand, avatarShrink: avatarShrink }" ref="loginAvatarRef" alt="" :src='loginAvatar' />

        </div>

        <div class="loginForm">

          <el-input prefix-icon="el-icon-s-platform" placeholder="远程服务器地址" v-model="systemConfig.baseUrl"></el-input>
          <el-input prefix-icon="el-icon-s-custom" placeholder="账号" v-model="loginForm.user"></el-input>

          <TBubbleButton class="LoginButton" @clicker="login">登录</TBubbleButton>

        </div>

        <TipMentioner ref="mentioner" class="mentioner" content="测试提示"></TipMentioner>

      </div>

    </div>

  </div>

</template>

<script>

export default {

  name: "Login",

  data() {

    return {

      avatarTimeOut: null,
      loginAvatar: "http://q1.qlogo.cn/g?b=qq&nk=10000&s=100",
      loginForm: {

        user: "1000",

      },

      isLogin: false,

      systemConfig: {

        baseUrl: "",
        keyCode: "",

      },

      loadingData: true,
      darkMode: false,
      textColor: '#0d0d0d',

      avatarShrink: false,
      avatarExpand: false,

    }

  },

  mounted() {

    let interval = setInterval(() => {

      if(this.$touchq.touchq_loaded) {

        clearInterval(interval)

        this.systemConfig = this.$touchq.systemConfig
        this.loginForm = this.$touchq.userConfig

        if( this.$touchq.$app ) {

          this.$touchq.$app.stop()

        }

        this.loadingData = false

      }

    }, 1000)

  },

  watch: {

    loginForm: {

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
          this.loginAvatar = `http://q1.qlogo.cn/g?b=qq&nk=${latest.user}&s=100`

        }, 350)

      }

    },

    darkMode: {

      immediate: true,
      handler(latest, old) {

        if(latest) {

          this.updateTheme({

            themeColor: '#000',
            mainColor: '#1C1C1C',
            hoverColor: '#262626',
            textColor: '#f5f5f5',
            subTextColor: '#e8e7ba'

          })

        } else {

          this.updateTheme({

            themeColor: '#fff',
            mainColor: '#f5f6f7',
            hoverColor: '#e0dfdf',
            textColor: '#0d0d0d',
            subTextColor: 'grey'

          })

        }

      }

    }

  },

  methods: {

    updateTheme(theme) {

      document.body.style.setProperty('--ThemeColor', theme.themeColor)
      document.body.style.setProperty('--mainColor', theme.mainColor)
      document.body.style.setProperty('--hoverColor', theme.hoverColor)
      document.body.style.setProperty('--textColor', theme.textColor)
      document.body.style.setProperty('--subTextColor', theme.subTextColor)

      this.textColor = theme.textColor

    },

    login() {

      const systemDb = this.$touchq.$db.system

      const instance = this

      systemDb.update({"_id": this.systemConfig._id},

          { $set: { baseUrl: this.systemConfig.baseUrl, keyCode: this.systemConfig.keyCode } }, function(err, doc) {

            instance.systemConfigLoading = false

            if(err !== undefined && err !== null) {

              return instance.$alert('保存失败, 请检查应用是否拥有读写权限', '遇到了一些问题', {
                confirmButtonText: '了解',
              });

            }

      })

      this.$refs.mentioner.showTip('', 0)
      this.isLogin = true

      const msgFunc = (msg) => {

        this.isLogin = false

        if(!msg.access) {

          this.$refs.mentioner.showTip(msg.msg, 2900)

        } else {

          const el = this.$refs.LoginPage

          el.style.transition = 'all .45s'
          el.style.transform = 'translateY(300px)'
          el.style.opacity = '0'

          setTimeout(() => {

            this.$router.push("/chat")

          }, 450)

        }

      }

      setTimeout(() => {

        this.$touchq.connect(this.loginForm.user, msgFunc)

      }, Math.round(Math.random() * 1500))

    }

  }

}
</script>

<style lang="scss" scoped>

.avatarShrink {

  animation: avatarShrink .45s;

}

@keyframes avatarShrink {

  0% {



  }

  5% {

    transform: translate(-50%, -50%) scale(0.8);

  }

  100% {

    transform: translate(-50%, -50%) translateY(-80px) scale(0.45);

  }

}

.avatarExpand {

  animation: avatarExpand .45s;

}

@keyframes avatarExpand {

  0% {

    transform: translate(-50%, -50%) translateY(200px) scale(0.45);

  }

  5% {

    transform: translate(-50%, -50%) translateY(200px) scale(0.5);

  }

  100% {

    transform: translate(-50%, -50%) translateY(0) scale(0.85);

  }

}

</style>

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

  width: 70%;
  height: 100%;
  //overflow: hidden;

  background-color: #1b7cb9;

  .AsideLiteImage {

    position: absolute;

    left: 50%;
    top: 50%;

    height: 100%;
    width: 100%;

    transform: translate(-60%, -55%);

  }

  .Wave {

    z-index: -1;
    position: absolute;

    top: 51%;
    left: 76%;

    height: 1200px;
    width: 900px;

    transform: translate(0%, -50%);

    border-radius: 50%;
    background-color: var(--mainColor);

    //animation: rotate 5s infinite linear;

    &:before {

      content: "";
      position: absolute;

      top: -40px;
      //left: 10%;

      height: 1250px;
      width: 1250px;

      border-radius: 46%;
      background-color: var(--mainColor);

      opacity: 0.9;

      animation: rotate 6s infinite ease-in-out;

    }

    &:after {

      content: "";
      position: absolute;

      top: -50px;
      //left: 10%;

      height: 1250px;
      width: 1200px;

      border-radius: 44%;
      background-color: var(--mainColor);

      opacity: 0.3;

      animation: rotate 8s infinite linear;

    }

  }

}

@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(360deg);
  }
}

.RightAside {

  z-index: 1;
  position: absolute;

  top: 0;
  right: 0;

  width: 40%;
  height: 100%;
  overflow: hidden;

  background-color: var(--mainColor);

}

.Login-Main-Avatar-Frame {

  transform: rotate(0);

  animation: avatarFrame 1.25s infinite linear;

}

@keyframes avatarFrame {

  from {

    transform: translate(-50%, 0) rotate(0);
    box-shadow: 0 0 5px var(--textColor);

  }

  to {

    transform: translate(-50%, 0) rotate(360deg);
    box-shadow: 0 0 30px var(--textColor);

  }

}

.Login-Main-Frame {

  transform: translate(-50%, -50%) translateY(-3%) scale(0.85) !important;

}

.loginForm {

  position: relative;

  top: 60px;

  .el-input {

    input {

      border: 0;
      background-color: var(--mainColor);

      filter: drop-shadow(0 0 5px var(--mainColor));
      transition: all .25s;

      border-bottom: 1px solid var(--mainColor);

      color: var(--textColor) !important;

    }

    input:focus {

      background-color: var(--mainColor) !important;

      border-radius: 3px 3px 0 0;
      border-bottom: 1px solid #1b7cb9;

    }

    position: relative;

    max-width: 90%;
    max-height: 38px;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    margin-bottom: 20px;

  }

}

</style>

<style lang="scss" scoped>

.mentioner {

  position: absolute;

  margin: 95px 0 0 -25px;

}

.Login-bgContainer {

  position: absolute;

  left: 50%;
  top: 50%;

  height: 440px;
  width: 420px;

  transform: translate(-50%, -50%) translateY(-2%);

  border-radius: 50%;

  background-color: var(--hoverColor);

  box-shadow: 0 0 15px var(--hoverColor);

}

.Login-Main {

  .LoginButton {

    position: relative;

    top: -10px;
    left: 5%;

    width: 90%;

    transition: all .35s;

    border: 1px solid var(--ThemeColor);
    background-color: var(--hoverColor) !important;

  }

  .LoginButton:hover {

    border: 1px solid #1b7cb9;

    background-color: var(--hoverColor) !important;

  }

  .LoginButton:focus {

    border: 1px solid #1b7cb9 !important;

    background-color: var(--hoverColor) !important;

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

    background-color: rgba(128, 128, 128, 0.1);

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

  position: absolute;

  left: 50%;
  top: 50%;

  height: 340px;
  width: 360px;

  background-color: var(--hoverColor) !important;
  padding: 30px;

  border-radius: 5px;
  transform: translate(-50%, -50%) translateY(-3%);

  filter: drop-shadow(0 0 5px var(--hoverColor));
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

  .Login-bgContainer:nth-child(1) {

    opacity: 0.8;

    animation: circling 2.45s infinite;

  }

  .Login-bgContainer:nth-child(2) {

    opacity: 0.25;

    filter: invert(10%);

    animation: circling 7.45s infinite;

  }

  .Login-bgContainer:nth-child(3) {

    opacity: 0.3;

    filter: invert(30%);

    animation: circling 2.85s infinite;

  }

  .Login-bgContainer:nth-child(4) {

    opacity: 0.65;

    animation: circling 1.85s infinite;

  }

  .Login-bgContainer:nth-child(5) {

    opacity: 0.45;

    filter: invert(20%);

    animation: circling 3.85s infinite;

  }

}

@keyframes circling {

  0%, 100% {

    transform: translate(-50%, -50%) translateY(-2%) rotate(360deg) scale(1.1, 1.105);

  }

  50% {

    transform: translate(-50%, -50%) translateY(-2%) rotate(0);

  }

}

</style>
