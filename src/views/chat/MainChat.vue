<template>

  <div class="MainChat-Page" ref="MainChatRef">

    <div class="aside-list">

      <ChatList :dark-mode="darkMode" @selectChat="selectChat" ref="chatList" :list="[]"></ChatList>

    </div>

    <router-view></router-view>

<!--    加载数据 Dialog-->
    <TalexDialog class="loadingDataDialog" :visible="dialogLoadingVisible" header-content="请稍等">

      <Loading class="loading" :color="textColor"></Loading>

      正在加载数据

    </TalexDialog>

<!--    设备信息 Dialog-->
    <TalexDialog class="deviceDialog" :visible="deviceDialogVisible" header-content="设备信息">

      <DeviceCardPad>


      </DeviceCardPad>

      <div class="deviceInfo">



      </div>

<!--      <el-carousel :interval="4000" type="card" height="200px">-->
<!--        <el-carousel-item v-for="item in 6" :key="item">-->
<!--          <h3 class="medium">{{ item }}</h3>-->
<!--        </el-carousel-item>-->
<!--      </el-carousel>-->

    </TalexDialog>

    <div class="statusBar">

      <el-tooltip content="退出登录">
        <div class="statusButton">

          <QuitLoading :color="textColor" @clicker="quitLogin"></QuitLoading>

        </div>
      </el-tooltip>

      <el-tooltip content="切换主题">
        <div style="left: 30px" class="statusButton">

          <ThemeChange :default-mode="darkMode" :color="textColor" @modeChange="modeChange"></ThemeChange>

        </div>
      </el-tooltip>

      <el-tooltip content="设备信息">
        <div style="left: 62px" class="statusButton">

          <TIcon icon="el-icon-monitor" @clicker="deviceDialogVisible = true"></TIcon>

        </div>
      </el-tooltip>

    </div>

  </div>

</template>

<script>

export default {

  name: "MainChat",

  created() {

    //加载用户缓存数据
    const interval = setInterval(() => {

      if(this.destroy) {

        clearInterval(interval)

        return

      }

      if(this.$touchq.$userData) {

        clearInterval(interval)

        this.darkMode = this.$touchq.getDarkMode()

        this.dialogLoadingVisible = false

      }

    }, 500)

  },

  data() {

    return {

      darkMode: false,
      textColor: '#0d0d0d',

      dialogLoadingVisible: true,

      deviceDialogVisible: false

    }

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

    selectChat(chat) {

      if(this.chat.type === 'friend') {

        this.$router.push("/friendChat/" + this.chat.id)

      } else this.$router.push("/groupChat/" + this.chat.id)

    },

    modeChange(mode) {

      this.darkMode = mode

    },

    quitLogin() {

      const el = this.$refs.MainChatRef

      el.style.transition = 'all .45s'
      el.style.transform = 'translateY(300px)'
      el.style.opacity = '0'

      setTimeout(() => {

        this.$router.push("/login")

      }, 450)

    },

  }

}
</script>

<style lang="scss">

.MainChat-Page {

  margin-top: 25px;

  animation: pageLoad .75s;
  transition: all .25s;

}

@keyframes pageLoad {

  from {

    margin-top: 300px;
    opacity: 0;

  }

  to {

    margin-top: 25px;

  }

}

::-webkit-scrollbar-thumb {

  background-color: var(--scrollColor) !important;
  border-radius: 3px;

  transition: all .25s;

}
::-webkit-scrollbar-track {

  border-radius: 1px;
  width: 10px !important;
  background-color: var(--containerBg) !important;

  transition: all .25s;

}

.main-container__chat {

  position: relative;

  margin-top: -11px;

  max-width: 80%;
  width: auto;

  height: 450px;

  overflow-y: hidden;

}

.main-container__input {

  position: relative;

  z-index: 500;

  max-width: 80%;
  width: auto;

  min-height: 150px;
  height: 150px;
  max-height: 150px;

  transform: translateX(5px);

}

.loadingDataDialog {

  .loading {

    position: relative;

    left: 50%;

    transform: translate(-50%, 50%);

    width: 32px;
    height: 32px;

    margin-bottom: 48px;

  }

}

.main-container__header__innerContent:hover {

  cursor: pointer;

  opacity: 0.75;

}

.main-container__header__innerContent {

  position: absolute;

  padding-left: 15px;

  top: 50%;

  transform: translateY(-50%);

  font-size: 20px;

  color: var(--textColor);

}

.main-container__header {

  position: relative;

  margin-bottom: 10px;

  height: 51px;

  border-bottom: 2px solid var(--hoverColor);

  background-color: var(--mainColor);

}

.statusButton {

  position: absolute;
  display: inline-block;

  left: -2px;
  top: -2px;

  width: 24px;
  height: 24px;

  margin-right: 8px;

}

.main-container {

  position: relative;

  left: 20%;

  min-height: 100%;
  height: 100%;
  max-height: 100%;

}

.statusBar {

  position: absolute;

  z-index: 310;

  left: 0;
  bottom: 0;
  padding: 2px 0;

  max-width: 20%;
  width: 20%;
  min-height: 30px;
  height: 30px;
  max-height: 25px;

  background-color: var(--hoverColor)

}

.aside-list {

  position: absolute;

  left: 0;

  min-height: 100%;
  height: 100%;
  max-height: 100%;

  width: 20%;

}

</style>
