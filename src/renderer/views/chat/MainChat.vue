<template>

  <div class="MainChat-Page" ref="MainChatRef">

    <div class="aside-list">

      <ChatList :dark-mode="darkMode" @selectChat="selectChat" ref="chatList" :list="chatListArray"></ChatList>

    </div>

    <div class="main-container" v-show="chat !== undefined && chat !== null">

      <div class="main-container__header">

        <span class="main-container__header__innerContent">{{ (chat && chat.title) || '' }}</span>

      </div>

      <div class="main-container__chat">

        <TalexLightChat @onClickBubble="onClickBubble" @onViewImg="viewImg" ref="LightChat" :messages="nowChatMessages" :dark-mode="darkMode"></TalexLightChat>

      </div>

      <div class="main-container__input">

        <ChatInputer @sendMessage="sendMessage" :dark-mode="darkMode"></ChatInputer>

      </div>

    </div>

<!--    加载数据 Dialog-->
    <TalexDialog class="loadingDataDialog" :visible="dialogLoadingVisible" header-content="请稍等">

      <Loading class="loading" :color="textColor"></Loading>

      正在加载数据

    </TalexDialog>

    <TalexImgViewer @close="imgLookerVisible = false" :visible="imgLookerVisible" :src="imgLookerSrc"></TalexImgViewer>

  </div>

</template>

<script>

export default {

  name: "MainChat",

  created() {

    try {

      this.listener.friendMessage = this.$touchq.$app.on('message/private', data => {

        console.log("@Friend: ", data)
        this.receiveFriendMessage(data, 'left')

      });

      this.listener.groupMessage = this.$touchq.$app.on('message/group', data => {

        console.log("@Group: ", data)
        this.receiveGroupMessage(data, 'left')

      });

    } catch (e) {

      this.destroy = true

      this.$router.push('/login')

    }

    if(this.destroy) return

    //加载用户缓存数据
    const interval = setInterval(() => {

      if(this.destroy) {

        clearInterval(interval)

        return

      }

      const data = this.$touchq.$userData.data

      if(data !== undefined && data !== null) {

        clearInterval(interval)

        this.darkMode = (this.$touchq.theme && this.$touchq.theme.dark) || false

        if(data.chatList) {

          // console.log("----- @DataList: " , data.chatList)

          const list = data.chatList

          list.forEach((chat, index) => {

            this.chatList.set(chat.key, chat)

          })

          this.chatListArray = Array.from(this.chatList.values())

        }

        if(data.chatMessages) {

          // console.log("----- @MessageList: " , data.chatMessages)

          const list = data.chatMessages

          list.forEach((chat, index) => {

            if(chat.length < 1) return

            // console.log("扫描: " + index, "成员列表: ", chat, "Key: " + chat[0])

            this.chatMessageMap.set(chat[0], chat[1])

          })

        }

        this.dialogLoadingVisible = false

      }

    }, 200)

  },

  data() {

    return {

      chatList: new Map(),
      chatListArray: [],
      darkMode: false,
      textColor: '#0d0d0d',

      chat: null,

      dialogLoadingVisible: true,
      destroy: false,

      chatMessageMap: new Map(),
      nowChatMessages: [],

      imgLookerVisible: false,
      imgLookerSrc: "",

      listener: {

        groupMessage: null,
        friendMessage: null,

      },

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

  beforeDestroy() {

    this.destroy = true

    if(this.listener.friendMessage) {

      this.$touchq.$app.off('FriendMessage', this.listener.friendMessage)

    }

    if(this.listener.groupMessage) {

      this.$touchq.$app.off('GroupMessage', this.listener.friendMessage)

    }

    let data = (this.$touchq.$userData && this.$touchq.$userData.data)

    if(typeof data !== 'object') {

      data = {}

    }

    data.chatList = this.chatListArray
    data.chatMessages = Array.from(this.chatMessageMap)

    this.$touchq.$userData.saveData()

  },

  methods: {

    async sendMessage(html, func) {

      if(!this.chat) return

      try {

        const bot = this.$touchq.$bot

        console.log("@SendMessage: ", this.chat)

        let result

        if(this.chat.type === 'group') {

          result = await this.$touchq.$bot.sendMessage(this.chat.id, html);

          await this.receiveGroupMessage({

            author: {

              avatar: bot.avatar,
              userId: bot.selfId,
              username: bot.username,

            },

            sender: {

              nickname: bot.username,
              userId: bot.selfId,

            },

            channelId: this.chat.id,
            content: html,
            groupId: this.chat.id,
            message: html,
            messageId: result,
            time: Date.now()

          }, 'right')

        } else {

          result = await this.$touchq.$bot.sendPrivateMessage(this.chat.id, html);

          await this.receiveFriendMessage({

            author: {

              avatar: bot.avatar,
              userId: bot.selfId,
              username: bot.username,

            },

            sender: {

              nickname: bot.username,
              userId: bot.selfId,

            },

            channelId: this.chat.id,
            content: html,
            groupId: this.chat.id,
            message: html,
            messageId: result,
            time: Date.now()

          }, 'right')

        }

        // this.

        func(null)

      } catch (e) {

        console.log(e)

      }

    },

    viewImg(img) {

      this.imgLookerSrc = img.src

      // this.$viewerApi({
      //   images: [img.src]
      // })

      // this.imgLookerSrc = img.src
      //
      this.imgLookerVisible = true
      //
      // const el = this.$refs.viewer
      //
      // console.log(el)
      //
      //     el.$vuer.show()

    },

    onClickBubble(e) {



    },

    updateTheme(theme) {

      document.body.style.setProperty('--ThemeColor', theme.themeColor)
      document.body.style.setProperty('--mainColor', theme.mainColor)
      document.body.style.setProperty('--hoverColor', theme.hoverColor)
      document.body.style.setProperty('--textColor', theme.textColor)
      document.body.style.setProperty('--subTextColor', theme.subTextColor)

      this.textColor = theme.textColor

    },

    selectChat(chat) {

      this.chat = chat

      const map = this.chatMessageMap

      this.nowChatMessages = map.get(chat.key)

    },

    modeChange(mode) {

      this.darkMode = mode

    },

    async processMessageChain(chain, contact) {

      let content = ""
      let talexContent = ""

      for (const msg of chain) {

        switch( msg.type ) {

          case 'Plain': {

            content += msg.text
            talexContent += msg.text
            break;

          }

          case 'Image': {

            content += '[图片]'

            break;

          }

          case 'At': {

            content += '@'

          }

        }

      }

      return content

    },

    async receiveGroupMessage(data, type) {

      const sender = data.sender
      const groupId = data.groupId

      this.chatList.set(groupId + 'g', {

        type: 'group', //判断类型
        id: groupId, //标注群
        key: groupId + 'g',
        img: "https://p.qlogo.cn/gh/" + groupId + "/" + groupId + "/100",
        title() {

          return this.groupName || groupId

        },
        latestContent: sender.nickname + ": " + await this.processMessageChain(data.content),
        time: sender.time,

      })

      // refreshList
      this.chatListArray = Array.from(this.chatList.values())

      const obj = {

        id: groupId,
        key: groupId + 'g',
        type,
        target: {

          name: sender.nickname,
          image: data.author.avatar,

          author: data.author,

        },
        content: data.content,
        time: sender.time,
        msgId: data.messageId,
        messageSeq: data.messageSeq

      }

      const map = this.chatMessageMap

      let value = map.get(groupId + 'g')

      if(!value) value = []

      value.push(obj)

      map.set(groupId + 'g', value)

    },

    async receiveFriendMessage(data, type) {

      const author = data.author
      const friendQQ = author.userId

      //存储列表的消息
      this.chatList.set(friendQQ + 'f', {

        id: friendQQ,
        key: friendQQ + 'f',
        img: author.avatar,
        title: author.username,
        latestContent: await this.processMessageChain(data.content),
        time: data.time,
        type: 'friend',

      })

      // refreshList
      this.chatListArray = Array.from(this.chatList.values())

      //存储实际聊天的消息
      const obj = {

        id: friendQQ,
        key: friendQQ + 'f',
        type,
        target: {

          name: author.username,
          image: author.avatar,

        },
        content: data.content,
        time: data.time,
        msgId: data.messageId,
        messageSeq: data.messageSeq,

      }

      const map = this.chatMessageMap

      let value = map.get(friendQQ + 'f')

      if(!value) value = []

      value.push(obj)

      map.set(friendQQ + 'f', value)

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

.main-container {

  position: relative;

  left: 20%;

  min-height: 100%;
  height: 100%;
  max-height: 100%;

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
