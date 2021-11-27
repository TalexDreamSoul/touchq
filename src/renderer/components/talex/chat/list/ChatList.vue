<template>

  <div class="ChatList-Page" ref="ChatListRef">

    <div class="searchBar" v-show="searchBar.allow">

      <el-input clearable @keydown.native.enter="handleSearch" v-model="searchBarContent" placeholder="搜索"></el-input>

    </div>

    <div class="ChatList-Items">

      <ChatterItem v-show="canShowChatterItem(item)" :badge="item.badge" :loading="item.loading" :album="item.album"
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

      },

      interval: null,

    }

  },

  beforeDestroy() {

    clearInterval(this.interval);

  },

  created() {

    this.chatList = this.list

    this.interval = setInterval(() => {

        this.chatList.forEach((item, index) => {

          this.chatList[index].time++

        })

      setTimeout(() => {

        this.chatList.forEach((item, index) => {

          this.chatList[index].time--

        })

      }, 1000)

    }, 10000)

  },

  watch: {

    list: {

      deep: true,
      handler(latest, old) {

        this.chatList = latest

      }

    },

    selectChatIndex(latest, old) {

      this.chatList[old].loading = false

      if(latest < 0) return

      this.chatList[latest].loading = true

      this.$emit("selectChat", this.chatList[latest])

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
  background-color: var(--mainColor) !important;

  transition: all .25s;

}

.ChatList-Page {

  .searchBar {

    .el-input {

      input {

        border: 0;
        background-color: var(--mainColor);

        filter: drop-shadow(0 0 5px var(--hoverBg)) invert(8%);
        transition: all .05s;

        border-bottom: 2px solid rgba(0,0,0,0);

        color: var(--textColor)

      }

      input:focus {

        border-bottom: 2px solid #1b7cb9;

        border-radius: 5px 5px 0 0;

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

  background-color: var(--mainColor);

  border-bottom: 2px solid var(--hoverColor);

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
    transform: translateX(-100%) scale(0.5);

  }

  50% {

    opacity: 1;
    transform: translateX(0) scale(0.95);

  }

  60% {

    background-color: var(--hoverColor);
    filter: invert(-50%)

  }

  100% {

    background-color: var(--mainColor);
    filter: invert(-50%)

  }

}

.ChatList-Page {

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
