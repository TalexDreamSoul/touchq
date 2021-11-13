<template>

  <div class="TMarquee-Page" ref="page">

    <span class="MarqueeMain" :class="marquee ? 'marquee' : ''" ref="main">{{ text }}</span>

  </div>

</template>

<script>
export default {
  name: "TMarquee",

  props: {

    text: {

      type: String,
      require: true

    }

  },

  data() {

    return {

      marquee: false,

    }

  },

  mounted() {

    const page = this.$refs.page;
    const main = this.$refs.main;

    console.log(page.offsetWidth, main.offsetWidth, this.text)

    if(main.offsetWidth + 40 >= page.offsetWidth) {

      this.marquee = true

    }

  }

}
</script>

<style lang="scss" scoped>

.TMarquee-Page {

  .marquee {

    position: absolute;

    animation: marqueeFrame 7s infinite ease-in-out;

  }

  white-space: nowrap;

  //overflow: hidden;

}

@keyframes marqueeFrame {

  0%, 5% {

    transform: translateX(200%);

  }

  20%, 45% {

    transform: translateX(0%);

  }

  55%, 80% {

    transform: translateX(-50%);

  }

  95%, 100% {

    transform: translateX(-200%);

  }

}

</style>
