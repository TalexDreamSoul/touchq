<template>

  <div  :class="dark ? 'dark LoadingContainer' : 'light LoadingContainer'">

    <el-button @click="click" circle plain ref="icon" :class="dark ? 'el-icon-sunny ui_btn' : 'el-icon-moon-night ui_btn'"></el-button>

  </div>

</template>

<script>
export default {
  name: "ThemeChange",

  props: {

    color: {

      type: String,
      default: "#212121",

    },

    defaultMode: {

      type: Boolean,
      default: false

    }

  },

  mounted() {

    this.dark = this.defaultMode

  },

  watch: {

    color: {

      immediate: true,
      handler(newValue, old) {

        this.$nextTick(() => {

          const el = this.$refs.LoadingContainer;

          if(!el) return

          el.style.setProperty("--color", newValue)

        })

      }

    }

  },

  data() {

    return {

      dark: false,

    }

  },

  methods: {

    click() {

      const el = this.$refs.icon.$el

      if(!el) return

      el.style.transform = 'scale(0)'
      el.style.opacity = '0'

      setTimeout(() => {

        this.dark = !this.dark

        el.style.transform = 'scale(1)'
        el.style.opacity = '1'

        this.$emit('modeChange', this.dark)

      }, 200)

    }

  }

}
</script>

<style lang="scss" scoped>

.ui_btn, .ui_btn:focus {

  position: relative;

  color: var(--textColor) !important;
  margin: 3px 5px 0 3px;

  background-color: rgba(0,0,0,0) !important;
  border: 0;

}

.ui_btn:hover {

  color: var(--textColor) !important;
  background-color: rgba(27, 124, 185, 0.4) !important;

}

.el-icon-moon-night {

  top: 2px !important;

}

.el-icon-sunny, .el-icon-moon-night {

  position: absolute;

  left: 1px;
  top: 1px;

  transition: all .45s;

  color: var(--color);

}

.LoadingContainer {

  --color: #212121;

  position: relative;

  min-width: 20px;
  min-height: 20px;

  width: auto;
  height: auto;

  max-width: 80%;
  max-height: 80%;

  border-radius: 50%;

}

.LoadingContainer:hover {

  color: var(--textColor) !important;
  background-color: rgba(27, 124, 185, 0) !important;
  cursor: pointer;

}

.loading_ing {

  opacity: 0.25;

  background-color: var(--color);

  border-radius: 50%;

  animation: lds-circle 5.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;

}

@keyframes lds-circle {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}


</style>
