<template>

  <div class="main-container" v-show="chat !== undefined && chat !== null">

    <div class="main-container__header">

      <span class="main-container__header__innerContent">{{ (chat && chat.title) || '' }}</span>

    </div>

    <div class="main-container__chat">

      <TalexLightChat @onViewImg="viewImg" ref="LightChat" :messages="nowChatMessages" :dark-mode="darkMode"></TalexLightChat>

    </div>

    <div class="main-container__input">

      <ChatInputer @sendMessage="sendMessage" :dark-mode="darkMode"></ChatInputer>

    </div>

    <TalexImgViewer @close="imgLookerVisible = false" :visible="imgLookerVisible" :src="imgLookerSrc"></TalexImgViewer>

  </div>

</template>

<script>
export default {

  name: "FriendChat",

  data() {return {

      friendId: this.$route.params.id,


  }},

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

  }

}
</script>

<style scoped>

</style>
