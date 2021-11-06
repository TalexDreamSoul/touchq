<template>

  <div class="ChatList-Page" ref="ChatListRef">

    <div class="searchBar" v-show="searchBar.allow">

      <el-input clearable @keydown.native.enter="handleSearch" v-model="searchBarContent" placeholder="搜索"></el-input>

    </div>

    <div class="ChatList-Items">

      <ChatterItem v-show="canShowChatterItem(item)" :badge="item.badge" :loading="item.loading" :album="item.album" :dark-mode="darkMode" :theme="theme"
                   @click.native="selectChatIndex = index" class="ChatList-Item" v-for="(item, index) in chatList" :selected="selectChatIndex === index" :chat="item" />

      <p class="ended_text" v-show="!searchBarContent">{{ chatList.length > 0 ? '我也是有底线的~' : '暂无数据' }}</p>

    </div>

  </div>

</template>

<script>

import ChatterItem from '../item/ChatterItem'
import Global from '../../cmd/Global'

export default {
  name: "ChatList",

  components: {

    ChatterItem

  },

  props: {

    list: {

      type: [Array],
      default() {

        return []

      }

    },

    darkMode: {

      type: [Boolean],
      default: false,

    },

    theme: {

      type: [Object],
      default() {

        return {

          defaultBg: "#f5f6f7",
          hoverBg: "#e0dfdf",
          selectedBg: "#ebebeb",
          textColor: "#000",

        }

      }

    },

    searchBar: {

      type: Object,
      default() {

        return {

          allow: true,
          addon: true,

        }

      }

    }

  },

  data() {

    return {

      chatList: [],
      selectChatIndex: -1,
      searchBarContent: "",

      ops: {

        vuescroll: {

          mode: 'native',
          detectResize: true,
          locking: true,

        },

        scrollPanel: {

          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 200,
          easing: 'easeInOutQuart',
          verticalNativeBarPos: 'right',
          maxHeight: 1,
          maxWidth: 1,

        },

        rail: {

          background: 'red',
          opacity: 1,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false

        },

        bar: {



        }

      }

    }

  },

  created() {

    this.chatList = this.list

  },

  watch: {

    list: {

      deep: true,
      handler(latest, old) {

        this.chatList = latest

      }

    },

    selectChatIndex(latest, old) {

      this.$emit("selectChat", this.chatList[latest])

    },

    theme: {

      immediate: true,
      deep: true,
      handler(latest, old) {

        this.updateTheme(latest)

      }

    },

    darkMode: {

      handler(latest, old) {

        if(latest) {

          this.updateTheme(

              {

                defaultBg: "#1c1c1c",
                hoverBg: "#262626",
                selectedBg: "#202020",
                textColor: "#f5f5f5"

              }

          )

        } else {

          this.updateTheme(this.theme)

        }

      }

    },

  },

  methods: {

    refreshList() {

      this.chatList = this.list

    },

    canShowChatterItem(item) {

      return !this.searchBar.allow || JSON.stringify(item).toLowerCase().indexOf(this.searchBarContent.toLowerCase()) !== -1

    },

    handleSearch() {

      if(this.searchBar.addon) {

        this.$emit("searchBarAddon", this.searchBarContent)

      }

    },

    updateTheme(theme) {

      const el = this.$refs.ChatListRef;

      if(!el) {

        setTimeout(() => {

          this.updateTheme(theme);

        }, 500)

        return

      }

      el.style.setProperty("--defaultBg", theme.defaultBg)
      el.style.setProperty("--hoverBg", theme.hoverBg)
      el.style.setProperty("--selectedBg", theme.selectedBg)
      el.style.setProperty("--textColor", theme.textColor)

      const color = Global.hexToRgba(theme.textColor, 0.3)

      el.style.setProperty("--scrollColor", color)

      this.ops.rail.background = color

    }

  }

}
</script>

<style lang="scss">

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

::-webkit-scrollbar-thumb {

  background-color: var(--scrollColor) !important;
  border-radius: 3px !important;

  transition: all .25s !important;

}
::-webkit-scrollbar-track {

  border-radius: 1px !important;
  width: 10px !important ;
  background-color: var(--defaultBg) !important;

  transition: all .25s;

}

.ChatList-Page {

  .searchBar {

    .el-input {

      input {

        border: 0;
        background-color: var(--hoverBg);

        filter: drop-shadow(0 0 5px var(--hoverBg));
        transition: all .05s;

        border-bottom: 2px solid rgba(0,0,0,0);

        color: var(--textColor)

      }

      input:focus {

        border-bottom: 2px solid #1b7cb9;

      }

      position: relative;

      max-width: 90%;
      max-height: 38px;

      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

    }

  }

}

</style>

<style scoped>

.ended_text {

  position: relative;

  top: 10px;

  margin-top: 10px;
  padding: 5px 0 35px 0;

  min-height: 30px;
  height: auto;
  min-width: 100%;

  font-size: 13px;
  opacity: 0.65;
  text-align: center;

  color: var(--textColor)

}

.searchBar {

  position: relative;

  top: -1px;

  width: 100%;
  height: 52px;

  background-color: var(--defaultBg);

  border-bottom: 2px solid var(--selectedBg);

  z-index: 310;

}

.ChatList-Item {

  position: relative;

  top: 10px;

  height: auto;
  min-width: 100%;

  animation: chatLoader .75s;

}

@keyframes chatLoader {

  0% {

    opacity: 0;
    transform: translateX(-100%);

  }

  50% {

    opacity: 1;
    transform: translateX(0);

  }

  60% {

    background-color: var(--selectedBg);

  }

  100% {

    background-color: var(--defaultBg);

  }

}

.ChatList-Page {

  --defaultBg: #f5f6f7;
  --hoverBg: #ebebeb;
  --textColor: rgba(245, 245, 245, 0.49);
  --selectedBg: #ebebeb;
  --scrollColor: rgba(0, 0, 0, 0.3);

  position: relative;

  width: 100%;
  min-height: 100%;
  max-height: 100%;

  box-sizing: content-box;

  background-color: var(--defaultBg);

  border-right: 2px solid var(--selectedBg);

  z-index: 310;

  overflow-x: hidden;

}

</style>
