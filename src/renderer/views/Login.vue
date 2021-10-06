<template>

  <div class="Login-Page" v-loading="loadingData">

    <div v-show="isLogin">

      <div class="Login-bgContainer"></div>
      <div class="Login-bgContainer"></div>
      <div class="Login-bgContainer"></div>
      <div class="Login-bgContainer"></div>
      <div class="Login-bgContainer"></div>

    </div>

    <div :class="isLogin ? 'Login-Main-Frame' : ''" class="Login-Main" @keydown.enter="isLogin" v-loading="isLogin">

      <img :class="isLogin ? 'Login-Main-Avatar-Frame' : ''" alt="" :src='"http://q1.qlogo.cn/g?b=qq&nk=" + loginForm.user + "&s=100"' />

      <div class="loginForm">

        <el-input placeholder="账号" v-model="loginForm.user"></el-input>

        <el-button class="LoginButton" @click="login">登录</el-button>

      </div>

      <TipMentioner ref="mentioner" class="mentioner" content="测试提示"></TipMentioner>

    </div>

    <!--    配置系统默认项目的Dialog-->
    <TalexDialog :visible="systemConfigDialogVisible" header-content="需要完成一些设置" :loading="systemConfigLoading">

      <el-alert description="请先绑定远程服务器后登录" :closable="false" type="warning" show-icon></el-alert>

      <div class="systemConfigForm">

        <el-input placeholder="远程服务器地址" v-model="systemConfig.baseUrl"></el-input>
        <el-input placeholder="远程服务器密钥" type="password" v-model="systemConfig.keyCode"></el-input>

        <br />

        <el-button class="verifyButton" @click="verifySystemConfig">验证</el-button>

      </div>


    </TalexDialog>

    <el-tooltip content="远程服务器设置">

      <el-button class="ui_btn setting_btn" icon="el-icon-s-tools" circle plain @click="systemConfigDialogVisible = true"></el-button>

    </el-tooltip>

    <div class="themeBtn">

      <ThemeChange :default-mode="darkMode" :color="textColor" @modeChange="darkMode = !darkMode"></ThemeChange>

    </div>

  </div>

</template>

<script>

import TalexDialog from '../components/talex/dialog/TalexDialog'
import TipMentioner from '../components/talex/mention/TipMentioner'

import ThemeChange from '../components/talex/chat/icon/ThemeChange'

export default {
  name: "Login",

  components: {

    TalexDialog, TipMentioner, ThemeChange

  },

  data() {

    return {

      loginForm: {

        user: "1000",

      },

      isLogin: false,

      systemConfigDialogVisible: false,
      systemConfigLoading: false,

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

    setTimeout(() => {

      this.$touchq.isDarkMode((mode) => {

        this.darkMode = mode;

      })

    }, 500)

    let interval = setInterval(() => {

      if(this.$touchq.touchq_loaded) {

        clearInterval(interval)

        this.systemConfigDialogVisible = this.$touchq.firstInner

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

    darkMode: {

      immediate: true,
      handler(latest, old) {

        // --ThemeColor: #fff;
        //
        // --mainColor: #f5f6f7;
        // --hoverColor: #e0dfdf;
        //
        // --textColor: #0d0d0d;
        // --subTextColor: grey;

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

    verifySystemConfig() {

      this.systemConfigLoading = true

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

        instance.systemConfigDialogVisible = false

      })

    },

    login() {

      this.$refs.mentioner.showTip('', 0)
      this.isLogin = true

      const msgFunc = (msg) => {

        this.isLogin = false

        if(!msg.access) {

          this.$refs.mentioner.showTip(msg.msg, 2600)

        } else {

          this.$router.push("/chat")

        }

      }

      setTimeout(() => {

        this.$touchq.connect(this.loginForm.user, msgFunc)

      }, Math.round(Math.random() * 2500))

    }

  }

}
</script>

<style lang="scss">

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

.el-alert--warning.is-light {

  background-color: var(--mainColor) !important;

}

.systemConfigForm {

  position: relative;

  margin-top: 30px;

  .el-input {

    input {

      border: 0;
      background-color: var(--hoverColor);

      filter: drop-shadow(0 0 5px var(--mainColor));
      transition: all .25s;

      border-left: 3px solid var(--hoverColor);

      color: var(--textColor)

    }

    input:hover {

      border-left: 3px solid rgba(27, 124, 185, 0.5);
      background-color: var(--mainColor)

    }

    input:focus {

      border-left: 3px solid #1b7cb9;
      background-color: var(--mainColor)

    }

    position: relative;

    max-width: 90%;
    max-height: 38px;

    margin-bottom: 30px;

  }

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

    margin-bottom: 30px;

  }

}

</style>

<style lang="scss" scoped>

.themeBtn {

  position: absolute;

  margin: 0 5px 3px 3px;

  bottom: 15px;
  left: 30px;

}

.setting_btn {

  transform: rotate(-360deg);

  transition: all 1.45s;

}

.setting_btn:hover {

  transform: rotate(360deg);

}

.ui_btn, .ui_btn:focus {

  position: absolute;

  left: 0;
  bottom: 0;

  color: var(--textColor) !important;
  margin: 0 5px 3px 3px;

  background-color: rgba(0,0,0,0);
  border: 0;

}

.ui_btn:hover {

  color: var(--textColor) !important;
  background-color: rgba(27, 124, 185, 0.4) !important;

}

.verifyButton {

  position: relative;

  width: 90%;

  transition: all .35s;

  background-color: var(--mainColor) !important;
  border: 1px solid var(--ThemeColor);

}

.verifyButton:hover {

  border: 1px solid rgba(27, 124, 185, 0.5);

  background-color: var(--mainColor) !important;

}

.verifyButton:focus {

  border: 1px solid #1b7cb9 !important;

  background-color: var(--mainColor) !important;

}

.mentioner {

  position: absolute;

  margin: 135px 0 0 -30px;

}

.Login-bgContainer {

  position: absolute;

  left: 50%;
  top: 50%;

  height: 480px;
  width: 520px;

  transform: translate(-50%, -50%) translateY(-2%);

  border-radius: 50%;

  background-color: var(--hoverColor);

  box-shadow: 0 0 15px var(--hoverColor);

}

.Login-Main {

  .LoginButton {

    position: relative;

    margin-top: 10px;
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

  height: 350px;
  width: 380px;

  background-color: var(--hoverColor) !important;
  padding: 30px;

  border-radius: 5px;
  transform: translate(-50%, -50%) translateY(-3%);

  filter: drop-shadow(0 0 5px var(--hoverColor));
  text-align: center;

  box-sizing: border-box;
  transition: all .45s;

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
