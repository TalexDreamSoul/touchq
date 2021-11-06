<template>

  <div class="Login-Page" ref="LoginPage" v-loading="loadingData">

    <div class="LeftAside">

      <LiteImage></LiteImage>

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

        <img :class="isLogin ? 'Login-Main-Avatar-Frame' : ''" alt="" :src='loginAvatar' />

        <div class="loginForm">

          <el-input placeholder="远程服务器地址" v-model="systemConfig.baseUrl"></el-input>
          <el-input placeholder="账号" v-model="loginForm.user"></el-input>

          <TBubbleButton class="LoginButton" @clicker="login">登录</TBubbleButton>

        </div>

        <TipMentioner ref="mentioner" class="mentioner" content="测试提示"></TipMentioner>

      </div>

      <div class="themeBtn">

        <ThemeChange :default-mode="darkMode" :color="textColor" @modeChange="darkMode = !darkMode"></ThemeChange>

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
      textColor: '#0d0d0d'

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

        this.avatarTimeOut = setTimeout(() => {

          this.loginAvatar = `http://q1.qlogo.cn/g?b=qq&nk=${latest.user}&s=100`

        }, 1000)

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

          this.$refs.mentioner.showTip(msg.msg, 2600)

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

<style lang="scss">

.LeftAside {

  z-index: 1;
  position: absolute;

  top: 0;
  left: 0;

  width: 60%;
  height: 100%;
  //overflow: hidden;

  box-shadow: 5px 0 10px rgba(128, 0, 128, 0.8);
  background-color: rgba(128, 0, 128, 0.8);

}

.RightAside {

  position: absolute;

  top: 0;
  right: 0;

  width: 40%;
  height: 100%;
  overflow: hidden;

  //background-color: rgba(203, 202, 202, 1);

}

.Login-Main-Avatar-Frame {

  transform: rotate(0);

  animation: avatarFrame 1.25s infinite linear;

}

@keyframes avatarFrame {

  from {

    transform: rotate(0);
    filter: drop-shadow(0 0 5px var(--textColor));

  }

  to {

    transform: rotate(360deg);
    filter: drop-shadow(0 0 30px var(--textColor));

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

.themeBtn {

  position: absolute;

  margin: 0 5px 3px 3px;

  bottom: 15px;
  left: 5px;

}

.mentioner {

  position: absolute;

  margin: 95px 0 0 -30px;

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

  img {

    min-width: 96px;
    min-height: 96px;
    max-width: 96px;

    border-radius: 50%;

    filter: drop-shadow(0 0 3px var(--textColor));

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
