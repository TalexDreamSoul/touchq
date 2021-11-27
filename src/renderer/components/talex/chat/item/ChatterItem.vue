<template>

  <div @mouseenter="hover = true" @mouseleave="hover = false" :class="{ 'ChatterItem-Page': true, 'ChatterItem-Selected': selected }" ref="ChatterItemContainerRef">

    <div class="badge" v-show="!badge.hidden"><span>{{ badge.content }}</span></div>
    <el-avatar class="chat_icon" alt="无法加载图片" :src="chat.url"></el-avatar>

    <div class="title"><TMarquee :allow="hover" :speed=3 :text="chat.name"></TMarquee></div>

    <div class="content">

<!--      <Album class="album" v-show="album" :color="albumColor"></Album>-->

      <div class="marquee"><TMarquee :allow="hover" :text="chat.content"></TMarquee></div>

    </div>

    <Loading class="loading" v-show="loading" :color="albumColor"></Loading>
    <span class="time" v-text="timer(chat.time)"></span>

  </div>

</template>

<script>

import Moment from 'moment'

import Album from '../icon/Album'
import Loading from '../icon/Loading'
import TMarquee from "../../others/TMarquee";

export default {
  name: "ChatterItem",

  components: {
    TMarquee,

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

      albumColor: "#212121",

      hover: false,

    }

  },

  methods: {

    timer(val) {

      if(typeof val !== 'number') return val

      val = parseInt(val) * 1000

      Moment.locale("zh-cn")

      return Moment(val).fromNow()

    },

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

  z-index: 310;

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

  position: relative;
  display: inline-block;

  left: 7px;
  top: 0;

  width: 50%;
  height: 15px;

  //overflow: hidden;

  font-size: 12px;

  opacity: 0.75;

  color: var(--textColor);

  .marquee {

    position: relative;

    width: 80%;
    height: 15px;

    overflow: hidden;

  }

}

.title {

  position: relative;
  display: inline-block;

  left: 20px;
  top: -18px;

  margin-right: -90px;

  height: 20px;
  width: 50%;

  overflow: hidden;

  font-size: 15px;

  color: var(--textColor);

  div {

    width: 100%;
    height: 15px;

  }

}

.chat_icon {

  position: relative;

  width: 42px;
  height: 42px;

  border-radius: 50%;

  top: 3px;
  left: 5px;

  filter: drop-shadow(0 0 2px var(--textColor)) !important;

}

.ChatterItem-Page {

  position: relative;

  top: 0;
  left: 0;

  width: 100%;
  min-height: 60px;
  height: 60px;

  padding: 8px 5px 8px 10px;

  cursor: pointer;
  box-sizing: border-box;

  transition: all .25s;

  background-color: var(--mainColor);

}

.ChatterItem-Selected::before {

  position: absolute;
  content: "";

  left: 0;
  top: 0;

  width: 3px;
  height: 100%;

  background-color: #1b7cb9;
  border-radius: 0 5px 5px 0;
  box-shadow: 3px 0 6px #1b7cb9;

  animation: selected .25s;

}

@keyframes selected {

  from {

    transform: translateX(5px) scaleY(0);

  }

}

.ChatterItem-Selected {

  filter: invert(5%);

}

.ChatterItem-Page:hover {

  background-color: var(--hoverColor)

}

</style>
