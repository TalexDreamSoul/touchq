<template>

  <div class="TMarquee-Page" ref="page" @mouseenter="hover = true" @mouseleave="hover = false">

    <span :style="`transform: translateX(${x}px)`" class="MarqueeMain" :class="linear ? 'marquee_linear' : ''" ref="main">{{ text }}</span>

  </div>

</template>

<script>
export default {
  name: "TMarquee",

  props: {

    text: {

      type: String,
      require: true

    },

    linear: {

      type: Boolean,
      default: false

    },

    speed: {

      type: Number,
      default: 1,

    },

    hoverMode: {

      type: Boolean,
      default: false

    },

    allow: {

      type: Boolean,
      default: true

    }

  },

  data() {

    return {

      marquee: false,
      hover: false,

      start: -1,
      x: 0,

      timeInterval: null,

    }

  },

  watch: {

    marquee: {

      immediate: true,
      handler(latest, old) {

        if(!latest) { clearInterval(this.timeInterval); return }

        let count = 0

        const page = this.$refs.page;
        const main = this.$refs.main;

        this.timeInterval = setInterval(() => {

          if(!this.allow || (this.hoverMode && !this.hover)) {

            this.x = 0

            return

          }

          this.x -= this.speed

          const scroll = this.start - this.x

          //滚动一次停顿
          if( scroll > 40 && (scroll - 40) % page.offsetWidth === 0 ) {

            count++

            this.x += this.speed

            if( count >= 50 + (this.speed * 2) ) {

              count = 0

              this.x -= this.speed

            }

          }

          //滚动完毕复位
          if( scroll >= main.offsetWidth * 2 + (60 * (this.speed * 2)) ) {

            this.x = this.start

          }

        }, 50)

      }

    }

  },

  mounted() {

    const page = this.$refs.page;
    const main = this.$refs.main;

    // console.log(page.offsetWidth, main.offsetWidth, this.text)

    if(main.offsetWidth + 40 >= page.offsetWidth) {

      this.x = this.start = page.offsetWidth + 40

      this.marquee = true

    }

  }

}
</script>

<style lang="scss" scoped>

.TMarquee-Page {

  //position: relative;

  .marquee_linear {

    animation: marqueeFrameLinear 7s infinite linear;

  }

  .MarqueeMain {

    position: absolute;

    //transition: translate .1s;

  }

  white-space: nowrap;

  overflow: hidden;

}

@keyframes marqueeFrameLinear {

  0% {

    transform: translateX(140%);

  }

  100% {

    transform: translateX(-140%);

  }

}

</style>
