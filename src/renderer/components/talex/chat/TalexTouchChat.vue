<template>

  <el-container ref="TalexTouchChat" class="TalexTouchChat-Page_container">

    <el-main ref="bubbleContainer" @scroll="userScroll">

      <div class="BubbleMessageContainer" v-for="(msg, index) in msgs" :ref="'ref_' + index">

        <div :class="{ bubble_system: msg.type === 'system', bubble_left: msg.type === 'left', bubble_right: msg.type === 'right'}">

          <div class="bubble_container" v-if="msg.type !== 'system'">

            <div @click="clickAvatar(msg)"><el-avatar class="user_avatar" size="large" :src="msg.target.image"></el-avatar></div>

            <div class="extra_information" v-if="msg.type === 'left'">

              <span style="background-color: red;color: #fff0ff" class="bubble_prefix" v-if="msg.target?.prefix?.admin">管理员</span>
              <span style="background-color: #ffbe0a" class="bubble_prefix" v-if="msg.target?.prefix?.owner">拥有者</span>
              <span class="bubble_prefix vip" v-if="msg.target?.vip"><span>VIP</span></span>

              <span class="bubble_title">{{ msg.target.name }}</span>

            </div>

          </div>

          <div :id="'bubble_content_' + index" style="min-height: 25px" class="content" @mouseenter="enterBubbleContent" @mouseleave="leaveBubbleContent">

            <div class="content_addon" v-if="msg.addon !== undefined" v-html="processContentAddon(msg, index)"></div>

            <span v-else v-html="processContent(msg, index)"></span>

            <div v-if="msg.type !== 'system'" class="content_timer">{{ msg.time }}</div>

          </div>

        </div>

      </div>

    </el-main>

  </el-container>

</template>

<script>

export default {
  name: "TalexTouchChat",

  props: {

    target: {},
    messages: [],
    darkMode: {

      type: Boolean,
      default: false,

    }

  },

  data() {

    return {

      lastScrollTime: -1,
      msgs: [],

    }

  },

  mounted() {

    this.messages.forEach(message => {

      setTimeout(() => {

        this.msgs.push(message)

      })

    })

  },

  watch: {

    darkMode: {

      immediate: true,

      handler(latest, old) {

        this.setTheme(latest);

      }

    },

    msgs: {

      handler (latest, old) {

        if(Date.now() - this.lastScrollTime > 2600) {

          const el = this.$refs.bubbleContainer.$el;

          setTimeout(() => {

            el.scrollTop = el.scrollHeight

            setTimeout(() => {

              const elContainer = this.$refs['ref_' + (this.msgs.length - 1)][0]

              elContainer.style.background = "grey"

              setTimeout(() => {

                elContainer.style.background = ""

              }, 500)

            }, 300)

          }, 20)

        }

      },

      deep: true

    }

  },

  methods: {

    getTargetFullyPrefix(name, image, vip, owner, admin) {

      return {

        name, image, vip,

        prefix: {

          owner,
          admin

        }

      }

    },

    getTargetFully(name, image, vip, prefix) {

      return {

        name, image, vip, prefix

      }

    },

    setTargetVip(target) {

      target.vip = true

      return target

    },

    targetAddPrefix(target, k) {

      if( target.prefix === undefined )

        target.prefix = {}

      target.prefix.k = true

      return target

    },

    spawnTarget(name, image) {

      return {

        name,
        image

      }

    },

    addTargetRedPacket(target, content, time, length) {

      this.addCustomBubble({ type: 'left', target, content, time,

        addon: {

          album: true,
          length,

        }

      })

    },

    addTargetAlbum(target, content, time, length) {

      this.addCustomBubble({ type: 'left', target, content, time,

        addon: {

          album: true,
          length,

        }

      })

    },

    addSelfAlbum(target, content, time, length) {

      this.addCustomBubble({ type: 'right', target, content, time,

        addon: {

          album: true,
          length,

        }

      })

    },

    addTargetBubble(target, content, time) {

      this.addCustomBubble({ type: 'left', target, content, time })

    },

    addSelfBubble(target, content, time) {

      this.addCustomBubble({ type: 'right', target, content, time })

    },

    addCustomBubble(obj) {

      this.msgs.push(obj)

    },

    addSystemBubble(content) {

      this.msgs.push({

        type: "system",
        content,

      })

    },

    setTheme(mode) {

      this.$nextTick(() => {

        const el = this.$refs.TalexTouchChat.$el;

        console.log("@SetTheme: ", el)

        // 开启 暗黑模式
        if(mode) {

          el.style.setProperty('--containerBg', '#1C1C1C');
          el.style.setProperty('--textColor', '#fff');
          el.style.setProperty('--bubble_system', '#0b0a09');
          el.style.setProperty('--bubble_left', '#262626');
          el.style.setProperty('--bubble_right', '#2b5278');

        } else {

          el.style.setProperty('--containerBg', '#f5f6f7');
          el.style.setProperty('--textColor', 'black');
          el.style.setProperty('--bubble_system', 'grey');
          el.style.setProperty('--bubble_left', '#d0d3d5');
          el.style.setProperty('--bubble_right', '#b6d3f0');

        }

      })

    },

    userScroll(event) {

      this.lastScrollTime = Date.now();

    },

    leaveBubbleContent(event) {

      const el = event.target.querySelector(".content_timer")

      if( el === null ) return

      el.style.transform = "translateY(3px)"
      el.style.opacity = "0"

    },

    enterBubbleContent(event) {

      const el = event.target.querySelector(".content_timer")

      if( el === null ) return

      el.style.transform = "translateY(0)"
      el.style.opacity = "0.8"

    },

    processContentAddon(msg, i) {

      if(msg.addon.album) {

        const length = msg.addon.length

        let width = length * 1.75 * (msg.type === 'right' ? 1.25 : 1);

        const divClass = (msg.type === 'right' ? "bubble_album_self" : "bubble_album")
        const divStyle = (msg.type === 'right' ? "margin-left" : "margin-right")

        return "<div class=\"" + divClass + "\" style='" + divStyle + ": " + width + "px !important' ><div class='wifi-symbol'>" +
            "<div class='wifi-circle first'></div><div class='wifi-circle second'></div><div class='wifi-circle third'></div></div><span class='album_length'>" + length + "''</span></div>"

      } else if(msg.addon.red_packet) {

        setTimeout(() => {

          const el = document.getElementById('bubble_content_' + i)

          if(el !== undefined && el !== null) {

            el.className += " content_red_packet"

          } else {

            this.addSystemBubble("出现错误!")

          }

        }, 100)

        const divClass = (!msg.addon.confirmed ? "red_packet" : "red_packet_confirmed")

        return "<div class='" + divClass + "'><el-icon class='" + (msg.addon.confirmed ? "el-icon-circle-check" : "el-icon-bangzhu") + "'></el-icon><p class='content'>" + msg.addon.content + "</p>" +
            "<div class='divider'></div><p>TalexTouchChat - 红包</p></div>"

      }

    },

    processContent(msg, i) {

      if(msg === null || !msg.content) { return "unknown: " + i }

      let content = msg.content;

      let index = content.indexOf("[Talex:");

      while( index !== -1 ) {

        let index2 = content.indexOf("]", index);

        const str = content.substring(index, index2 + 1);

        content = content.replace(str, this.getSpecialCodeHtml(str, i));

        index = content.indexOf("[Talex:", index2);

      }

      return content;

    },

    getSpecialCodeHtml(code, i) {

      code = code.replace("[Talex:", "");

      const index1 = code.indexOf("=");

      const type = code.substring(0, index1);

      if( type.toLowerCase() === 'at') {

        const index2 = code.indexOf(";", index1);

        const content = code.substring(index1 + 1, index2);

        return "<span style='color: #6f86fb;opacity: 0.95;margin-right: 5px'>@" + content + " </span>";

      }

      if( type.toLowerCase() === 'image') {

        return "<img class='chat_img' alt='无法加载图片' src='" + code.substring(index1 + 1, code.length - 1) + "'/>"

      }

      if( type.toLowerCase() === 'reply') {

        const index2 = code.indexOf(";", index1);

        const content = code.substring(index1 + 1, index2);

        const lastIndex = code.indexOf(";msg", index2);

        const replyContent = code.substring(lastIndex + 5, code.length - 1).replace("id=", "")

        if(this.msgs.length <= replyContent - 1) {

          return "<div class='chat_reply'><div class='reply_user'>" + content + "</div><div class='contenter'><span style='color: red'>无法定位到回复消息</span></div></div>"

        }

        const obj = this.msgs[replyContent]

        return "<div class='chat_reply'><div class='reply_user'>" + content + "</div><div class='contenter'>" + this.processContent(obj, i) + "</div></div>"

      }

      return code;

    },

    clickAvatar(msg) {

      this.$emit("clickAvatar", msg);

    }

  }

}
</script>

<!--聊天大致布局样式-->
<style lang="scss" scoped>

.BubbleMessageContainer {

  position: relative;

  top: 0;
  left: 0;

  min-width: 100%;
  height: auto;

  margin-bottom: 10px;

}

.bubble_right {

  position: relative;
  float: right;
  max-width: 70%;

  .bubble_container {

    position: relative;
    float: right;

    .el-avatar {

      position: relative;

      right: -5px;
      top: 0;

      overflow: unset;

      animation: right_bubble_avatar_load .25s;

    }

  }

  .content_red_packet {

    background-color: #ee8d0e !important;

    animation: right_red_packet_bubble_load .5s !important;

  }

  .content_red_packet::after {

    border-top: 10px solid #ee8d0e !important;

  }

  .content {

    position: relative;

    top: -25px;
    right: 55px;

    background-color: var(--bubble_right);
    padding: 9px 6px 15px 6px;

    border-radius: 7px 0 5px 7px;

    filter: drop-shadow(0 0 2px var(--bubble_right));

    animation: right_bubble_load .5s;

    z-index: 100;

    .content_timer {

      position: absolute;

      left: 3px;
      bottom: 0;

      transform: translateY(3px);
      opacity: 0;
      font-size: 12px;

    }

    * {

      font-size: 15px;

      animation: bubble_content_load .85s ;

    }

  }

  .content::after {

    position: absolute;

    content: "";

    right: -9px;
    top: 0;

    border-top: 10px solid var(--bubble_right);
    border-right: 10px solid rgba(0,0,0,0);

    z-index: -1;

    animation: right_bubble_pointer_load 1.35s 1;

  }

}

.bubble_left {

  position: relative;
  max-width: 60%;

  .bubble_container {

    position: relative;

    .el-avatar {

      position: relative;

      left: -5px;
      top: 12px;

      overflow: unset;

      animation: left_bubble_avatar_load .25s;

    }

    .extra_information {

      position: relative;

      top: -40px;
      left: 50px;

      min-width: 500px;
      width: auto;
      height: 20px;

      margin-bottom: 5px;

      overflow: hidden;

      .bubble_prefix {

        padding: 1px 3px 1px 3px;

        font-size: 13px;

        border-radius: 3px;

        color: #2f2f2f;

      }

      .vip {

        background-color: #131312;

        span {

          position: relative;

          left: 2px;

          color: rgba(255, 227, 223, 0.8);

          @extend .slideShine;

        }

      }

      * {

        margin-right: 5px;

      }

      animation: left_bubble_extra_information_load .55s;

    }

  }

  .content_red_packet {

    background-color: #ee8d0e !important;

    animation: left_red_packet_bubble_load .5s !important;

  }

  .content_red_packet::before {

    border-top: 10px solid #ee8d0e !important;

  }

  .content {

    position: relative;

    top: -40px;
    left: 55px;

    background-color: var(--bubble_left);
    padding: 9px 6px 15px 6px;

    border-radius: 0 7px 7px 5px;

    filter: drop-shadow(0 0 2px var(--bubble_left));

    animation: left_bubble_load .5s;

    .content_timer {

      position: absolute;

      right: 3px;
      bottom: 0;

      transform: translateY(3px);
      opacity: 0;
      font-size: 12px;

    }

    * {

      font-size: 14px;

      animation: bubble_content_load .85s;

    }

  }

  .content::before {

    position: absolute;

    left: -10px;
    top: 0;

    content: "";

    border-top: 10px solid var(--bubble_left);
    border-left: 10px solid rgba(0,0,0,0);

    z-index: -1;

    animation: left_bubble_pointer_load 1.35s 1;

  }

}

.bubble_system {

  position: relative;

  left: 50%;

  height: 35px;
  width: auto !important;
  max-width: 80%;

  transform: translateX(-50%);
  padding: 2px 5px 0 5px;

  .content {

    position: relative;

    top: 50%;
    left: 50%;
    transform: translate(-50%);

    span {

      position: relative;

      padding: 5px 10px 5px 10px;

      height: 5px;
      width: fit-content;

      border-radius: 10px;

      text-align: center;
      opacity: 0.95;

      color: var(--textColor);
      background-color: var(--bubble_system);

    }

  }

  animation: bubble_system_load .35s 1 ease;

}

.bubble_frame {

  width: fit-content;
  width: -moz-fit-content;

  height: auto !important;
  clear: both !important;

}

.TalexTouchChat-Page_container {

  background-color: var(--containerBg);

  .el-main {

    position: relative;

    overflow-y: auto;
    overflow-x: hidden;

    max-height: 100%;

    z-index: 1000;

    div {

      @extend .bubble_frame;

    }

  }

  position: relative;

  width: 100%;
  height: 100%;

  overflow: hidden;

  * {

    color: var(--textColor);

  }

}

// VIP 图标

.slideShine{
  background: #ffe3df linear-gradient(to bottom right, yellow, yellow, black, #ffe3df, #ffe3df) no-repeat 0 0;
  background-size: 50% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  text-decoration: underline;
}
.slideShine {-webkit-animation: slideShine .75s linear infinite;animation: slideShine 1.25s linear infinite;}
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

</style>

<style lang="scss">

.TalexTouchChat-Page_container {

  --containerBg: #f5f6f7;
  --textColor: black;
  --bubble_left: #d0d3d5;
  --bubble_right: #b6d3f0;
  --bubble_system: grey;

  * {

    transition: all .15s;

  }

}

// 聊天图片定义

.chat_img:hover {

  margin: 2px;

  padding: -10px;
  opacity: 0.95;
  box-sizing: content-box;

  border-bottom: 2px solid #1b7cb9;

}

.chat_img {

  position: relative;
  display: inline-block;

  margin: 2px;
  padding: -10px;

  max-width: 128px;
  height: auto;
  opacity: 0.8;

  border-bottom: 2px solid rgba(0, 0, 0, 0);

  transition: all .35s;

}

@keyframes fadeInOut {

  0% {

    opacity: 0; /*初始状态 透明度为0*/

  }

  100% {

    opacity: 1; /*结尾状态 透明度为1*/

  }

}

// 回复

.chat_reply {

  .reply_user {

    position: relative;

    font-size: 16px;

  }

  position: relative;

  left: 50%;
  top: 50%;

  width: auto;
  height: auto;

  padding: 10px;
  margin-bottom: 10px;

  transform: translate(-50%);

  border-radius: 3px 3px 4px 4px;
  border-left: 2px solid #1b7cb9;

  background-color: rgba(0, 0, 0, 0.2);

  filter: drop-shadow(0 1px 5px rgba(0, 0, 0, 0.25));

  .contenter {

    opacity: 0.95 !important;

  }

}

// 用户头像

.user_avatar {

  img {

    border-radius: 50%;

    filter: drop-shadow(0 0 3px var(--textColor))

  }

  img:hover {

    border-radius: 50%;

    filter: drop-shadow(0 0 5px var(--textColor))

  }

}

// 红包

.red_packet {

  position: relative;

  top: -25px;
  left: -9px;

  width: 368px;
  height: 103px;

  opacity: 0.8;

  transform: translateY(5px);

  el-icon {

    position: relative;

    left: 20px;
    top: 20px;

    font-size: 70px;
    color: #fff;

  }

  .content {

    position: absolute;

    left: 95px;
    top: 18px;

    font-size: 23px;
    color: #fff;

  }

  .divider {

    position: relative;

    left: 50%;
    transform: translateX(-50%);

    width: 90%;
    height: 1px;

    top: 30px;

    background-color: #fff;

  }

  .divider + p {

    position: relative;

    top: 20px;
    left: 20px;

    color: #fff;

  }

}

// 语音 气泡定义

.bubble_album_self {

  position: relative;
  float: right;

  height: 25px;

  .album_length {

    position: absolute;

    width: 40px;
    height: 40px;
    top: 4px;

    right: 10px;

    z-index: 1000;

    color: var(--textColor);
    filter: invert(30%);

  }

  .wifi-symbol {

    transform: translateX(-5px) rotate(180deg) rotate(135deg) scale(0.6);

  }

}

.bubble_album {

  height: 30px;

  margin-bottom: -10px;

  .album_length {

    position: absolute;

    width: 40px;
    height: 40px;
    top: 13px;

    left: 40px;

    z-index: 1000;

    color: var(--textColor);
    filter: invert(30%);

  }

}

// 语音 wifi 样式定义

.wifi-symbol {

  position: relative;

  top: -10px;
  left: 5px;

  width: 50px;
  height: 50px;

  overflow: hidden;
  transform: rotate(135deg) scale(0.6);

}

.first {

  width: 3px;
  height: 3px;
  background: #cccccc;
  top: 45px;
  left: 45px;

  transform: scale(1.2);

}

.second {

  width: 25px;
  height: 25px;
  top: 35px;
  left: 35px;

}

.third {

  width: 40px;
  height: 40px;
  top: 25px;
  left: 25px;

}

.wifi-play {

  .second {

    animation: fadeInOut 1s infinite 0.2s;

  }

  .third {

    animation: fadeInOut 1s infinite 0.4s;

  }

}

.wifi-circle {

  position: absolute;

  border: 5px solid var(--textColor);
  border-radius: 50%;

  filter: invert(30%);

}

</style>

<!--相关杂项和动画-->
<style lang="scss">

.content_timer {

  transition: all .35s;

}

@keyframes left_bubble_extra_information_load {

  0% {

    opacity: 0;

    transform: translateY(50px);

  }

  60% {

    opacity: 0;

    transform: translateY(40px);

  }

  90% {

    opacity: 0.5;
    transform: translateY(5px);

  }

  100% {

    opacity: 1;

    transform: translateY(0);

  }

}

@keyframes left_red_packet_bubble_load {

  from {

    opacity: 0;

    transform: translate(-40px) translate(-20px, -5px) scale(0.65, 1);

  }

  to {

    transform: translate(0) translate(-20px, -5px) scale(1);

  }

}
@keyframes right_red_packet_bubble_load {

  from {

    opacity: 0;

    transform: translate(40px) translate(20px, -5px) scale(0.65, 1);

  }

  to {

    transform: translate(0) translate(20px, -5px) scale(1);

  }

}

@keyframes left_bubble_pointer_load {

  0% {

    opacity: 0;
    left: 13px;

  }

  60% {

    opacity: 1;

  }

  80% {

    left: -10px;

  }

  100% {

    right: 23px;

  }

}
@keyframes right_bubble_pointer_load {

  0% {

    opacity: 0;
    transform: translateX(-20px);

  }

  60% {

    opacity: 1;

  }

  80% {

    transform: translateX(0);

  }

  100% {

    transform: translateX(0);

  }

}

@keyframes left_bubble_load {

  from {

    opacity: 0;

    transform: translate(-40px) scale(0.65, 1);

  }

  to {

    transform: translate(0) scale(1);

  }

}
@keyframes right_bubble_load {

  from {

    opacity: 0;

    transform: translate(40px) scale(0.65, 1);

  }

  to {

    transform: translate(0) scale(1);

  }

}

@keyframes right_bubble_avatar_load {

  from {

    transform: translateX(100px);

  }

  to {

    transform: translateX(0);

  }

}
@keyframes left_bubble_avatar_load {

  from {

    transform: translateX(-100px);

  }

  to {

    transform: translateX(0);

  }

}

@keyframes bubble_system_load {

  from {

    opacity: 0;
    transform: translate(-50%, -30px);

  }

  to {

    opacity: 1;
    transform: translate(-50%, 0);

  }

}
@keyframes bubble_content_load {

  from {

    opacity: 0;

  }

  to {

    opacity: 1;

  }

}

::-webkit-scrollbar-thumb {

  background-color: rgba(63, 64, 66, 0.3);
  border-radius: 3px;

  transition: all .25s;

}
::-webkit-scrollbar-track {

  border-radius: 1px;
  width: 10px !important;
  background-color: rgba(128, 128, 128, 0.3);

  transition: all .25s;

}

</style>
