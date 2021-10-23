<template>

  <div @click="click" ref="LoadingContainer" :class="{ 'LoadingContainer': true, 'loading_ing': loading }">

    <el-button v-show="!loading" circle plain :class='icon' class="ui_btn"></el-button>

  </div>

</template>

<script>
export default {
  name: "CircleLoading",

  props: {

    color: {

      type: String,
      default: "#212121",

    },

    icon: {

      type: String,
      require: true

    }

  },

  watch: {

    color: {

      immediate: true,
      handler(newValue, old) {

        setTimeout(() => {

          const el = this.$refs.LoadingContainer;

          if(!el) return

          el.style.setProperty("--color", newValue)

        }, 200)

      }

    }

  },

  data() {

    return {

      loading: false,

    }

  },

  methods: {

    click(e) {

      this.loading = true

      setTimeout(() => {

        this.loading = false

        this.$emit("clicker", e)

      }, Math.round(Math.random() * 3000))

    }

  }

}
</script>

<style lang="scss" scoped>

.ui_btn, .ui_btn:focus {

  position: relative;

  left: 1px;
  top: 1px;

  color: var(--textColor) !important;
  margin: 3px 5px 0 3px;

  background-color: rgba(0,0,0,0) !important;
  border: 0;

}

.ui_btn:hover {

  color: var(--textColor) !important;
  background-color: rgba(27, 124, 185, 0.4) !important;

}

.LoadingContainer {

  --color: #212121;

  position: relative;

  width: 80%;
  height: 80%;

  border-radius: 50%;

}

.LoadingContainer:hover {

  color: var(--textColor) !important;
  //background-color: rgba(27, 124, 185, 0.4) !important;
  cursor: pointer;

}

.loading_ing {

  left: 8px;
  top: 10px;

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
