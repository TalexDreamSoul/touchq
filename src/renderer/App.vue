<template>

  <div :class="{ appQuit: quit }" id="app" ref="app">

    <div class="applicationHeader">

      <img class="icon" src="https://i.loli.net/2021/10/05/yP5d6Aw19jRNUc7.png" />

      <span class="title">

        TalexTouchChat&nbsp;

        <span class="beta"><span class="lite">2.0.0-Lite</span></span>
        <span class="github" @click="openGitHub">GitHub&nbsp;</span>

      </span>

      <button class="headerButton" @click="close">×</button>
      <button class="headerButton" @click="min">-</button>

    </div>

    <div class="mainContainer">

      <router-view></router-view>

    </div>

  </div>

</template>

<script>

const { shell } = require('electron');

import { ipcRenderer } from 'electron'

  export default {

    name: 'talextouchqq',

    data() {

      return {

        windowX: 0,
        windowY: 0,

        quit: false,

      }

    },

    beforeDestroy() {

      if( this.$touchq.$app ) {

        this.$touchq.$app.stop()

      }

      this.$touchq.setTheme(this.darkMode)

    },

    methods: {

      min() {

        ipcRenderer.send('min')

      },

      close() {

        this.quit = true

        setTimeout(() => {

          ipcRenderer.send('close')

        }, 1000)

      },

      openGitHub() {

        shell.openExternal('https://github.com/TalexDreamSoul/touchq')

      }

    }

  }
</script>

<style lang="scss">

.appQuit {

  animation: appQuit .25s

}

@keyframes appQuit {

  to {

    opacity: 0;
    transform: scaleY(0)

  }

}

.beta {

  padding: 2px 3px 1px 3px;

  left: 2px;

  border-radius: 3px;

  background-color: rgba(255, 0, 0, 0.8);

}

.lite {

  padding: 2px 3px 1px 3px;

  left: 2px;

  border-radius: 3px;

  background: black linear-gradient(to bottom right, black, black, black, white, white) no-repeat 0 0;
  background-size: 50% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  text-decoration: underline;

  -webkit-animation: slideShine 1.25s linear infinite;animation: slideShine 1.25s linear infinite;

}

@-webkit-keyframes slideShine {

  0% {

    background-position: -100%;

  }

  35% {

    background-position: 100%;

  }

  100% {

    background-position: 300%;

  }

}

.github {

  padding: 2px 3px 1px 18px;

  left: 2px;

  border-radius: 3px;

  background: url("https://github.githubassets.com/favicons/favicon.png") 3px/12px no-repeat rgba(9, 115, 198, 1);

  -webkit-app-region: no-drag;
  cursor: pointer

}

.title {

  position: relative;

  left: 2px;
  top: -3px;

  font-size: 12px;

  color: var(--textColor);

}

.icon {

  position: relative;

  left: 2px;
  top: 2px;

  width: 20px;

}

button {

  -webkit-app-region: no-drag;

}

.headerButton {

  position: relative;
  float: right;

  display: inline-block;

  border: none;

  width: 33px;
  height: 100%;

  background-color: var(--hoverColor);

  z-index: 330;

  transition: all .25s;

  -webkit-app-region: no-drag；

}

.headerButton:hover {

  cursor: pointer;

  background-color: var(--mainColor);

}

.applicationHeader {

  position: fixed;

  left: 1%;
  top: 1%;

  width: 98%;
  height: 25px;

  border-radius: 5px 5px 0 0;
  background-color: var(--hoverColor);

  transition: all .25s;

  overflow: hidden;
  cursor: move;

  z-index: 330;
  -webkit-app-region: drag

}

body {

  background-color: rgba(0,0,0,0) !important;

  --ThemeColor: #fff;

  --mainColor: #f5f6f7;
  --hoverColor: #e0dfdf;

  --textColor: #0d0d0d;
  --subTextColor: grey;

  * {

    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: var(--textColor);

  }

}

.el-loading-mask {

  background-color: var(--mainColor) !important;

  opacity: 0.9;

}

#app {

  position: absolute;

  left: 1%;
  top: 1%;

  width: 98%;
  height: 98%;

  border-radius: 5px;

  background-color: var(--mainColor);
  box-shadow: 1px 1px 5px #000;

  overflow: hidden;
  animation: appLoad 1.25s

}

@keyframes appLoad {

  0% {

    opacity: 0.75

  }

  80% {

    opacity: 1

  }

  85% {

    transform: scale(1.0125)

  }

  100% {

    transform: scale(1)

  }

}

</style>
