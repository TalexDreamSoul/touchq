<template>

  <el-button class="BubbleButton" @click="handleClick" v-bind="$attrs" v-on="$listeners" :type="type" :size="size" :icon="icon"
             :native-type="nativeType" :loading="loading" :disabled="disabled" :plain="plain" :autofocus="autofocus" :round="round" :circle="circle">

    <slot></slot>

  </el-button>

</template>

<script>
export default {

  name: "TBubbleButton",

  props: {

    type: {
      type: String,
      default: 'default'
    },

    size: String,

    icon: {

      type: String,
      default: ''

    },

    nativeType: {

      type: String,
      default: 'button'

    },

    loading: Boolean,

    disabled: Boolean,

    plain: Boolean,

    autofocus: Boolean,

    round: Boolean,

    circle: Boolean

  },

  methods: {

    handleClick(e) {

      setTimeout(() => {

        this.$emit("clicker", e)

      }, 100)

    }

  }

}
</script>

<style lang="scss">

.BubbleButton {

  * {

    color: var(--mainColor)

  }

}

</style>

<style lang="scss" scoped>

.BubbleButton {

  background-size: 400%;
  background-image: linear-gradient(to right, #25a4f5, #1b7cb9, #25a4f5, #5198de);

  &:hover {

    animation: bubbleBgWaving 3.45s linear infinite;

  }

}

@keyframes bubbleBgWaving {

  0% {

    background-position: 0;

  }

  100% {

    background-position: -400%;

  }

}

.BubbleButton::before {

  content: "";
  position: absolute;
  z-index: -1;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  border: 4px solid rgba(0,0,0,0);
  border-radius: 3px;

  transform: scale(1);
  transform-origin: center;

}

.BubbleButton:hover::before {

  animation: bubbleIng 0.65s ease-out infinite;

}

@keyframes bubbleIng {

  to {

    border: 1px solid #1b7cb9;
    transform: scale(1.15, 1.5);

    opacity: 0;

  }

}

.BubbleButton:active::before {

  transition: all 0.35s ease-out;

  border: 1px solid #1b7cb9;
  transform: scale(1.5);
  filter: invert(50%) blur(10px);

  opacity: 0;

}

.BubbleButton:active {

  transition: all 0.15s;

  transform: scale(0.9);

}

</style>
