<template>

  <div :class="{ appQuit: quit }" id="app">

    <div v-show="$router.history.current.path === '/login'" class="applicationHeader">

      <img class="icon" src="https://i.loli.net/2021/10/05/yP5d6Aw19jRNUc7.png" />

      <span class="title">

        TalexTouchChat&nbsp;

        <span class="beta"><span class="lite">3.0.0-Lite</span></span>
        <span class="github" @click="openGitHub">GitHub&nbsp;</span>

      </span>

      <button class="headerButton" @click="close">×</button>
      <button class="headerButton" @click="min">-</button>

    </div>

    <div class="mainContainer">

<!--      非登录控件-->
      <div class="nonLoginControl" v-show="$router.history.current.path !== '/login'">

        <button class="headerButton" @click="close">×</button>
        <button class="headerButton" @click="min">-</button>

      </div>

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

.nonLoginControl {

  position: absolute;

  right: 0;
  top: 0;

  width: 100%;
  height: 28px;

  -webkit-app-region: drag;
  cursor: move;

}

::selection {

  color: var(--textnormalColor);
  background: rgba(69, 147, 196, 0.9);

}

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

  position: relative;
  padding: 2px 3px 1px 3px;

  top: 1px;
  left: 2px;

  border-radius: 3px;

  background-color: rgba(253, 75, 75, 0.8);

}

.lite {

  padding: 2px 3px 1px 3px;

  left: 2px;

  background: black linear-gradient(to bottom right, white, white) no-repeat 0 0;
  background-size: 50% 100%;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  text-decoration: underline;

  animation: slideShine 1.75s linear infinite;

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

  position: relative;
  padding: 2px 3px 1px 18px;

  top: 1px;
  left: 2px;

  border-radius: 3px;

  background: url("https://github.githubassets.com/favicons/favicon.png") 3px/12px no-repeat #1d8fff;

  -webkit-app-region: no-drag;
  cursor: pointer

}

.title {

  position: relative;

  left: 2px;
  top: 1px;

  font-size: 12px;

  color: var(--textnormalColor);

}

.icon {

  position: relative;

  left: 3px;
  top: 0;

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

  background-color: var(--color1);

  z-index: 330;

  transition: all .25s;

  -webkit-app-region: no-drag

}

.headerButton:hover {

  cursor: pointer;

  background-color: var(--color2);

}

.applicationHeader {

  position: fixed;

  left: 1%;
  top: 1%;

  width: 98%;
  height: 25px;

  border-radius: 5px 5px 0 0;
  background-color: var(--color1);

  transition: all .25s;

  overflow: hidden;
  cursor: move;

  z-index: 330;
  -webkit-app-region: drag

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
