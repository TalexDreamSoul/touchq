<template>

  <div :class="{ 'ChatterItem-Page': true, 'ChatterItem-Selected': selected }" ref="ChatterItemContainerRef">

    <div class="badge" v-show="!badge.hidden"><span>{{ badge.content }}</span></div>
    <img class="chat_icon" alt="无法加载图片" :src="chat.img" />

    <span class="title">{{ chat.title }}</span>

    <div class="content">

      <Album class="album" v-show="album" :color="albumColor"></Album>

      {{ chat.latestContent }}

    </div>

    <Loading class="loading" v-show="loading" :color="albumColor"></Loading>
    <span class="time" v-text="timer(chat.time)"></span>

  </div>

</template>

<script>

import Album from '../icon/Album'
import Loading from '../icon/Loading'

export default {
  name: "ChatterItem",

  components: {

    Album,
    Loading,

  },

  props: {

    chat: {

      type: [Object],
      require: true,

    },

    selected: {

      type: [Boolean],
      default: false,

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
          textColor: "#000"

        }

      }

    },

    album: {

      type: Boolean,
      default: false,

    },

    loading: {

      type: Boolean,
      default: false,

    },

    badge: {

      type: Object,
      default() {

        return {

          content: "+5",
          hidden: true,

        }

      }

    }

  },

  data() {

    return {

      albumColor: "#212121"

    }

  },

  watch: {

    darkMode: {

      immediate: true,
      handler(newValue, old) {

        if(newValue) {

          this.changeTheme({

            defaultBg: "#1c1c1c",
            hoverBg: "#262626",
            selectedBg: "#202020",
            textColor: "#f5f5f5"

          })

        } else if(this.theme !== undefined) {

          this.changeTheme(this.theme)

        }

      }

    },

    theme: {

      immediate: true,
      deep: true,
      handler(newValue, old) {

        if(!this.darkMode && newValue !== undefined) {

          this.changeTheme(newValue);

        }

      }

    }

  },

  methods: {

    timer(val) {

      if(typeof val !== 'number') return val

      val = parseInt(val) * 1000

      const date = new Date(val)
      const now = new Date()

      const year = date.getFullYear();

      if(now.getFullYear() > year) {

        const month = (date.getMonth() + 1 + '').padStart(2, '0');
        const d = (date.getDate() + 1 + '').padStart(2, '0');

        return year + '-' + month + '-' + d

      }

      let period = now.getTime() - val

      period += '0'

      period += 0

      if(period >= 7 * 24 * 3600000) {

        const month = (date.getMonth() + 1 + '').padStart(2, '0');
        const d = (date.getDate() + 1 + '').padStart(2, '0');

        return month + '-' + d

      }

      if(period >= 24 * 3600000) {

        period /= 24 * 3600000

        const dayPrefix = (period === 1) ? '昨天' : period + '天前'

        const hh = (date.getHours() + '').padStart(2, '0');
        const mm = (date.getMinutes() + '').padStart(2, '0');

        return dayPrefix + ' ' + hh + ':' + mm

      }

      const hh = (date.getHours() + '').padStart(2, '0');
      const mm = (date.getMinutes() + '').padStart(2, '0');
      const ss = (date.getSeconds() + '').padStart(2, '0');

      return hh + ":" + mm + ":" + ss;

    },

      changeTheme(theme) {

        const el = this.$refs.ChatterItemContainerRef;

        if(!el) {

          setTimeout(() => {

            this.changeTheme(theme);

          }, 500)

          return

        }

        el.style.setProperty("--defaultBg", theme.defaultBg)
        el.style.setProperty("--hoverBg", theme.hoverBg)
        el.style.setProperty("--selectedBg", theme.selectedBg)
        el.style.setProperty("--textColor", theme.textColor)

        this.albumColor = theme.textColor

      }

  }

}
</script>

<style lang="scss" scoped>

@keyframes badge_loading {

  0% {

    box-shadow: 0 0 5px rgba(255, 255, 0, 0.85);

  }

  20%, 100% {

    opacity: 0;

    //filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0));

  }

}

.badge {

  position: absolute;

  width: 45px;
  height: 45px;

  border-radius: 50%;

  top: 7px;
  left: 9px;

  z-index: 10000;

  text-align: center;

  background-image: radial-gradient(circle, var(--hoverBg), rgba(0,0,0,0));

  box-sizing: content-box;
  animation: badge_loading 5s infinite ease-in-out;

  span {

    position: absolute;

    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%) translate(2px, 2px);

    color: var(--textColor)

  }

}

.loading {

  position: absolute;

  height: 12px;
  width: 12px;

  bottom: 38px;
  right: 10px;

}

.time {

  position: absolute;

  bottom: 12px;
  right: 10px;

  font-size: 10px;
  opacity: 0.75;

  color: var(--textColor)

}

.album {

  position: relative;
  display: inline-block;

  left: 0;
  top: 1px;

  color: var(--textColor)

}

.content {

  position: absolute;

  left: 65px;
  top: 35px;

  max-width: 50%;
  height: 15px;

  overflow: hidden;

  font-size: 12px;

  opacity: 0.75;

  color: var(--textColor)

}

.title {

  position: absolute;

  left: 65px;
  top: 10px;

  height: 20px;

  max-width: 60%;

  overflow: hidden;

  font-size: 15px;

  //font-weight: bold;

  color: var(--textColor)

}

.chat_icon {

  position: relative;

  width: 42px;
  height: auto;

  border-radius: 50%;

  top: 3px;
  left: 5px;

  //transform: translateY(-50%);
  filter: drop-shadow(0 0 2px var(--textColor)) !important;

}

.ChatterItem-Page {

  position: relative;

  top: 0;
  left: 0;

  width: 100%;
  height: 60px;

  padding: 8px 5px 8px 5px;

  //overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;

  transition: all .25s;

  border-left: 3px solid rgba(0, 0, 0, 0);

  background-color: var(--defaultBg);

  --defaultBg: #f5f6f7;
  --hoverBg: #e0dfdf;
  --selectedBg: #ebebeb;
  --textColor: #000;

  * {

    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

  }

}

.ChatterItem-Selected {

  border-left: 3px solid #1b7cb9;

  background-color: var(--selectedBg) !important;

}

.ChatterItem-Page:hover {

  background-color: var(--hoverBg)

}

</style>
