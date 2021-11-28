<template>

  <div class="MainChat-Page" ref="MainChatRef">

    <div class="aside-list">

      <ChatList :list="chatListArray" @selectChat="selectChat" ref="chatList"></ChatList>

    </div>

    <div class="main-container" v-show="chat !== undefined && chat !== null">

      <div class="main-container__header">

        <span class="main-container__header__innerContent">{{ (chat && chat.name) || '' }}</span>

      </div>

      <div class="main-container__chat">

        <TalexLightChat :messages="nowChatMessages" @onViewImg="viewImg" ref="LightChat"></TalexLightChat>

      </div>

      <div class="main-container__input">

        <ChatInputer></ChatInputer>

      </div>

    </div>

    <TalexImgViewer @close="imgLookerVisible = false" :visible="imgLookerVisible" :src="imgLookerSrc"></TalexImgViewer>

  </div>

</template>

<script>

export default {

  name: "MainChat",

  data() {

    return {

      userQQ: this.$touchq.$userData.$nowUser,

      imgLookerVisible: false,
      imgLookerSrc: "",

      chatLists: new Map(),
      chatListArray: [],
      chat: null,

      chatMap: new Map(),
      nowChatMessages: [],

    }

  },

  watch: {

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

  created() {

    this.initial()

  },

  methods: {

    viewImg(img) {

      this.imgLookerSrc = img.src

      this.imgLookerVisible = true

    },

    selectChat(chat) {

      this.chat = chat

      this.nowChatMessages = this.chatMap.get(chat.key)

      console.log("@", this.nowChatMessages)

    },

    initial() {

      this.$touchq.$userData.onChatListEvent((list) => {

        switch( list.type ) {

          case 'group': {

            console.log(list)

            const groupId = list.group.groupId;
            const msgType = (this.userQQ === list.user_id) ? 'right' : 'left'

            const obj = { key: groupId, msgType, url: `https://p.qlogo.cn/gh/${groupId}/${groupId}/640`, name: list.group.groupName, ...list }

            this.chatLists.set(groupId, obj)

            const msgs = this.chatMap.get(obj.key) || []

            msgs.push(obj)

            this.chatMap.set(obj.key, msgs)

            break

          }

          case 'private': {

            const userId = list.sender.user_id;
            const msgType = (this.userQQ === list.user_id) ? 'right' : 'left'

            const obj = { key: userId, msgType, url: `https://q1.qlogo.cn/g?b=qq&s=640&nk=${userId}`, name: list.sender.nickname, ...list}

            this.chatLists.set(userId, obj)

            const msgs = [] || this.chatMap.get(obj.key)

            msgs.push(obj)

            this.chatMap.set(obj.key, msgs)

            break

          }

        }

        this.chatListArray = [ ...Array.from(this.chatLists.values()) ]

      })

    }

  }

}
</script>

<style lang="scss">

.MainChat-Page {

  transition: all .25s;

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

  height: 57px;

  border-bottom: 2px solid var(--hoverColor);

  background-color: var(--mainColor);

}

.main-container {

  position: relative;

  left: 20%;

  min-height: 100%;
  height: 100%;
  max-height: 100%;

}

@keyframes listLoad {

  from {

    transform: translateX(-200%);

  }

}

.aside-list {

  position: absolute;
  z-index: 10;

  left: 0;

  min-height: 100%;
  height: 100%;
  max-height: 100%;

  width: 20%;

  border-right: 2px solid var(--hoverColor);

  animation: listLoad .25s;

}

</style>
