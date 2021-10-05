<template>

  <div ref="LoadingContainer" class="LoadingContainer">

  </div>

</template>

<script>
export default {
  name: "CircleLoading",

  props: {

    color: {

      type: String,
      default: "#212121",

    }

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

  }

}
</script>

<style lang="scss" scoped>

.LoadingContainer {

  --color: #212121;

  position: relative;

  width: 80%;
  height: 80%;

  left: 10%;
  top: 10%;

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
