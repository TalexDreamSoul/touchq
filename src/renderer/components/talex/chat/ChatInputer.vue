<template>

  <div class="ChatInputer-Page" ref="ChatInputer" @keydown.prevent.enter="sendMessage">

    <VueTribute ref="atTribute" class="tribute" :options="atOptions">

      <div @paste.prevent="pasteData" @input="handleInput" @keydown="handleInput" ref="UserInputer" class="inputer" v-model="inputer.origin" :contenteditable="!sending">

      </div>

      <div ref="sendButtonRef" class="sendButton" @click="sendMessage">

        <span v-show="!sending" class="content">发送</span>

        <Loading v-show="sending" :color="textColor" class="loading"></Loading>

      </div>

    </VueTribute>

  </div>

</template>

<script>

import VueTribute from '../cmd/VueTribute'
import Global from '../cmd/Global'
import Loading from '../chat/icon/CircleLoading'

class Msg {

  constructor(type, data) {

    this.type = type;
    this.data = data;

  }

}

export default {

  name: "ChatInputer",

  props: {

    darkMode: {

      type: Boolean,
      default: false,

    },

    theme: {

      type: [Object],
      default() {

        return {

          containerBg: "#f5f6f7",
          buttonBg: '#ebebeb',
          hoverBg: "#e0dfdf",
          textColor: "#000",

        }

      }

    }

  },

  watch: {

    theme: {

      immediate: true,
      deep: true,
      handler(latest, old) {

        this.updateTheme(latest)

      }

    },

    darkMode: {

      immediate: true,
      handler(latest, old) {

        if(latest) {

          this.updateTheme(

              {

                containerBg: "#1c1c1c",
                buttonBg: '#262626',
                hoverBg: "#202020",
                textColor: "#f5f5f5",

              }

          )

        } else {

          this.updateTheme(this.theme)

        }

      }

    },

    canSendData: {

      immediate: true,
      handler(latest, old) {

        this.$nextTick(() => {

          const el = this.$refs.sendButtonRef

          if(!el) return

          el.style.transform = latest ? 'scale(1)' : 'scale(0)'

        })

      }

    },

    sending: {

      immediate: true,
      handler(latest, old) {

        this.$nextTick(() => {

          const el = this.$refs.sendButtonRef

          if(!el) return

          el.style.cursor = !latest ? 'pointer' : 'not-allowed'

        })

      }

    }

  },

  methods: {

    sendMessage(e) {

      if(this.sending) return

      const el = this.$refs.UserInputer

      if(e.ctrlKey) {

        el.innerHTML += "<br />"

        const selection = window.getSelection()

        el.focus()

        selection.selectAllChildren(el);//range 选择obj下所有子内容

        selection.collapseToEnd();//光标移至最后

        return

      }

      if(!this.canSendData) return

      this.sending = true

      const instance = this

      const html = el.innerHTML

      el.innerHTML = ''

      let access = false

      this.$emit("sendMessage", html, function(e) {

        access = true
        instance.sending = false

        if(e !== null) {

          el.innerHTML = html

        }

        instance.$nextTick(() => {

          const selection = window.getSelection()

          el.focus()

          selection.selectAllChildren(el);//range 选择obj下所有子内容

          selection.collapseToEnd();//光标移至最后

          instance.canSendData = false

        })

      })

      setTimeout(() => {

        if(access) {

         if( instance.sending )  instance.sending = false
          el.innerHTML = html

        }

      }, 2000)

    },

    handleInput(event) {

      const el = event.target

      this.canSendData = el.innerText.length > 0

    },

    pasteData(event) {

      const el = event.target

      el.innerHTML += event.clipboardData.getData('text')

      const selection = window.getSelection()

      // range.setRangeText(event.clipboardData.getData('text'), el.selectionStart, el.selectionEnd, "end")

      el.focus()

      selection.selectAllChildren(el);//range 选择obj下所有子内容

      selection.collapseToEnd();//光标移至最后

    },

    updateTheme(theme) {

      document.body.style.setProperty("--containerBg", theme.containerBg)
      document.body.style.setProperty("--buttonBg", theme.buttonBg)
      document.body.style.setProperty("--hoverBg", theme.hoverBg)
      document.body.style.setProperty("--textColor", theme.textColor)

      const color = Global.hexToRgba(theme.textColor, 0.3)

      document.body.style.setProperty("--scrollColor", color)

      this.textColor = theme.textColor

    }

  },

  components: {

    VueTribute, Loading,

  },

  data() {

    return {

      inputer: {

        origin: "[Talex:Image=http://q1.qlogo.cn/g?b=qq&nk=2418876761&s=100]测试图片"

      },

      atOptions: {

        trigger: "@",
        requireLeadingSpace: false,
        noMatchTemplate: function  ()  {
          return  '<span style="visibility: hidden;"></span>' ;
        },
        loadingItemTemplate: function  ()  {
          return  '<span style="visibility: hidden;"></span>' ;
        },
        positionMenu: true,
        selectTemplate: function(item) {

          const a = JSON.parse(JSON.stringify(item.original))

          a.src = undefined

          return (
              "<span contenteditable='false' data-at='" + JSON.stringify(a) + "' style='color: #6f86fb;opacity: 0.95;margin: 0 5px 0 3px'>" +
              "@" +
              item.original.key +
              "</span>"
          );
        },
        menuItemTemplate: function (item) {

          return (

              "<img class='at_avatar' src='" + item.original.src +"' alt='无法加载' /><span class='at_user'>" + item.original.key + "</span>"

          );

        },

        values: (text, cb) => {

          this.$emit("onAtSearchUser", text, cb)

        }

      },

      canSendData: false,
      sending: false,
      textColor: "#000",

    }

  },

}

</script>

<!--tribute-->
<style lang="scss">

body {

  --containerBg: #f5f6f7;
  --scrollColor: rgba(0, 0, 0, 0.3);
  --buttonBg: #ebebeb;
  --hoverBg: #e0dfdf;
  --textColor: #e0dfdf;

}

// Tribute-specific styles
.tribute-container {

  position: absolute;
  display: block;

  top: 0;
  left: 0;

  overflow-x: hidden;
  overflow-y: auto;

  margin: 0 0 0 15px;
  padding: 0;

  min-width: 100px;
  max-width: 50%;
  width: auto !important;

  //min-height: 180px;
  height: auto;
  max-height: 180px;

  border-radius: 15px 5px 10px 10px;
  box-shadow: 2px 2px 10px var(--hoverBg);

  background-color: var(--scrollColor);

  transition: all .25s;

}

.tribute-container ul {

  margin: 0;
  padding: 0;

  min-width: 100px;
  max-width: 100%;
  width: auto !important;

  list-style: none;
  background-color: var(--containerBg);

}

.tribute-container li {

  color: var(--scrollColor);

  .at_user {

    position: relative;

    left: 10px;
    top: -5px;

    width: fit-content;
    width: -moz-fit-content;

    font-size: 15px;

  }

  .at_avatar {

    position: relative;

    left: 5px;
    top: 3px;

    max-width: 28px;

    border-radius: 50%;

    filter: drop-shadow(0 0 3px var(--containerBg));

  }

  position: relative;

  top: 0;
  left: 0;

  max-width: 100%;
  min-width: 80px;
  width: auto;

  padding: 1px 50px 1px 3px;
  height: auto;

  font-size: 16px;

  cursor: pointer;

  transition: all .25s;

  margin: 0 !important;

  border-right: 3px solid rgba(0, 0, 0, 0);

}

.tribute-container li.highlight, .tribute-container li:hover {

  background-color: var(--hoverBg);
  color: #3f5efb;

  border-right: 2px solid #1b7cb9;

}

.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}

</style>

<style lang="scss" scoped>

.sendButton:hover {

  filter: drop-shadow(0 0 5px var(--buttonBg)) invert(5%);

}

.sendButton {

  position: absolute;

  width: 42px;
  height: 42px;

  right: 20px;
  bottom: 20px;

  border-radius: 50%;

  background-color: var(--buttonBg);
  filter: drop-shadow(0 0 3px var(--buttonBg)) invert(5%);

  cursor: pointer;

  transition: all .35s;

  .loading {

    position: relative;

    left: 11px;
    top: 11px;

    width: 20px;
    height: 20px;

  }

  .content {

    position: relative;

    left: 10px;
    top: 13px;

    font-size: 12px;

    color: var(--textColor);

  }

}

.ChatInputer-Page {

  position: relative;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;

  z-index: 10000;
  border-top: 2px solid var(--hoverBg);

}

.inputer, .tribute {

  position: relative;

  padding: 8px 5px 5px 5px;

  min-width: 100%;
  max-width: 100%;

  height: 100%;
  min-height: 100%;
  max-height: 100%;

  overflow-x: hidden;
  overflow-y: auto;

  outline: none;

  background-color: var(--containerBg);

  color: var(--textColor);
  font-size: 14px;

}

::-webkit-scrollbar-thumb {

  background-color: var(--scrollColor);
  border-radius: 3px;

  transition: all .25s;

}
::-webkit-scrollbar-track {

  border-radius: 1px;
  width: 10px !important;
  background-color: var(--containerBg);

  transition: all .25s;

}

</style>
