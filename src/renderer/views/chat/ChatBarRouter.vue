<template>

  <div class="ChatBarRouter-Page" ref="RouterPageRef">

    <div class="AsideSettingMenu" :class="appSettingDrawerVisible ? 'menuJoin' : 'menuQuit'">

      <el-button @click="appSettingDrawerVisible = false">关闭</el-button>

    </div>

    <div class="ChatBarRouter-LeftAside" ref="LeftAsideRef">

      <ul class="AsideMenu">

        <li @click="gotoChat()" :class="selectMenuIndex === 0 ? 'selected' : ''">

          <el-icon class="el-icon-s-promotion"></el-icon>
          <span v-show="selectMenuIndex !== 0"><br />消息</span>

        </li>

        <li @click="gotoList()" :class="selectMenuIndex === 1 ? 'selected' : ''">

          <el-icon class="el-icon-s-custom"></el-icon>
          <span v-show="selectMenuIndex !== 1"><br />联系</span>

        </li>

      </ul>

      <div class="asideAvatar">

        <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${nowUser}&s=100`" />

      </div>

      <el-icon @click.native="appSettingDrawerVisible = true" class="el-icon-s-operation"></el-icon>

<!--      <a-dropdown placement="topRight" :trigger="['hover']">-->

<!--        -->

<!--        <a-menu slot="overlay">-->

<!--          <a-menu-item key="1" @click="appSettingDrawerVisible = true">-->
<!--            <a-icon type="setting" />程序设置-->
<!--          </a-menu-item>-->

<!--        </a-menu>-->

<!--      </a-dropdown>-->

<!--      <a-popover placement="topLeft" arrow-point-at-center>-->

<!--        <template slot="content">-->

<!--          <p>Content</p>-->
<!--          <p>Content</p>-->

<!--        </template>-->

<!--        <el-icon class="el-icon-s-operation"></el-icon>-->

<!--      </a-popover>-->


    </div>

    <div class="ChatBarRouter-RightAside" ref="RightAsideRef">

      <keep-alive>

        <router-view></router-view>

      </keep-alive>

    </div>

  </div>

</template>

<script>
export default {

  name: "ChatBarRouter",

  created() {

    if( !this.$touchq.$userData ) {

      this.$router.push('/login')

    }

  },

  data() {

    return {

      selectMenuIndex: 0,
      nowUser: this.$touchq.$userData.$nowUser,

      darkMode: false,
      textColor: '#0d0d0d',

      appSettingDrawerVisible: true,

    }

  },

  methods: {

    getSettingDrawerContainer() {

      return this.$refs.LeftAsideRef

    },

    updateTheme(theme) {

      document.body.style.setProperty('--ThemeColor', theme.themeColor)
      document.body.style.setProperty('--mainColor', theme.mainColor)
      document.body.style.setProperty('--hoverColor', theme.hoverColor)
      document.body.style.setProperty('--textColor', theme.textColor)
      document.body.style.setProperty('--subTextColor', theme.subTextColor)

      this.textColor = theme.textColor

    },

    gotoChat() {

      if( this.selectMenuIndex === 0 ) return

      this.$router.push("/chat")

      this.selectMenuIndex = 0

    },

    gotoList() {

      if( this.selectMenuIndex === 1 ) return

      this.$router.push("/contact/list")

      this.selectMenuIndex = 1

    },

    quitLogin() {

      const el = this.$refs.RouterPageRef

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

.ant-dropdown {

  .ant-popover-arrow {

    border-right-color: var(--mainColor) !important;
    border-bottom-color: var(--mainColor) !important;

  }

  .ant-dropdown-menu {

    background-color: var(--mainColor) !important;

    .ant-dropdown-menu-item {

      &:hover {

        background-color: var(--hoverColor) !important;

      }

    }

  }

  color: var(--textnormalColor)

}

.ChatBarRouter-LeftAside {

  .el-icon-s-operation {

    font-size: 20px;

  }

}

</style>

<style lang="scss" scoped>

.el-icon-s-operation {

  position: absolute;

  bottom: 50px;
  left: 50%;

  transform: translate(-50%, 0);

  &:hover {

    color: var(--textnormalColor);

    cursor: pointer;

  }

}

.menuQuit {

  transform: translateX(-100%);
  opacity: 0;

}

.menuJoin {

  transform: translateX(0);
  opacity: 1;

}

.AsideSettingMenu {

  z-index: 5;
 position: absolute;

  width: 280px;
  height: 100%;

  background-color:  var(--mainOpacityColor);
  backdrop-filter: blur(5px);
  box-shadow: 3px 0 9px var(--hoverOpacityColor);

  transition: all .45s;

}

.AsideMenu {

  position: relative;

  margin: 0;
  padding: 0;

  top: 160px;

  li {

    position: relative;
    padding: 10px;

    height: 70px;
    width: 70px;

    margin-bottom: 20px;

    list-style-type: none;

    font-size: 20px;

    text-align: center;

    span {

      position: relative;

      top: -10px;

      font-size: 14px;

    }

    &:hover {

      color: var(--textnormalColor);

      cursor: pointer;

      &:before {

        opacity: 0.3;

      }

    }

    transition: all .25s;

    &:before {

      content: "";
      position: absolute;

      left: 50%;
      top: 50%;

      height: 48px;
      width: 48px;

      border-radius: 50%;
      background-color: var(--color2);
      opacity: 0.15;
      filter: invert(10%);

      transform: translate(-50%, -50%);

      transition: all .25s;

    }

  }

  .selected {

    padding: 20px 10px 10px 10px;

    background-color: var(--color2);

    color: var(--appColor);

    &:before {

      left: 5px;
      top: 50%;

      height: 20px;
      width: 4px;

      border-radius: 10px;
      background-color: var(--appColor);

      opacity: 1;
      filter: invert(0);

      transform: translate(0, -50%);

    }

    &:hover {

      color: var(--appColor);

      cursor: not-allowed;

      &:before {

        opacity: 1;

      }

    }

  }

}

.asideAvatar {

  position: absolute;

  top: 50px;
  left: 50%;

  width: 36px;
  height: 36px;

  transform: translate(-50%, 0);

  img {

    width: 36px;
    height: 36px;

    border-radius: 50%;

  }

  &:after {

    content: "";
    position: absolute;

    left: 26px;
    top: 26px;

    width: 10px;
    height: 10px;

    border-radius: 50%;
    background-color: #2cea8c;

  }

}

.logout {

  position: relative;

  top: calc(100% - 180px);
  left: 3px;

  width: 16px;
  height: 16px;

  transform: scale(1.25);

}

.ChatBarRouter-Page {

  .ChatBarRouter-LeftAside {

    z-index: 2;
    position: absolute;

    height: 100%;
    width: 70px;

    opacity: 0.8;

    background-color: var(--mainColor);
    box-shadow: 3px 0 5px var(--hoverColor);

    overflow: hidden;

  }

  .ChatBarRouter-RightAside {

    z-index: 1;
    position: absolute;

    top: 0;
    left: 70px;

    height: 100%;
    width: calc(100% - 70px);

    overflow: hidden;

  }

}

@keyframes LeftAsideWaving {

  0% {

    background-position: 0;

  }

  100% {

    background-position: -500% -500%;

  }

}

</style>
