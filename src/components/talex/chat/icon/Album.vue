<template>

  <div ref="AlbumContainer" class="AlbumContainer">

    <div v-for="item in 5"></div>

  </div>

</template>

<script>
export default {
  name: "Album",

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

        setTimeout(() => {

          const el = this.$refs.AlbumContainer;

          el.style.setProperty("--color", newValue)

        }, 200)

      }

    }

  }

}
</script>

<style lang="scss" scoped>

.AlbumContainer {

  --color: #212121;

  position: relative;

  div {

    position: relative;

    display: inline-block;

    width: 2px;
    height: 10px;

    background-color: var(--color);

    margin-right: 1px;

    transition: all .45s;

  }

  :nth-child(1) {

    animation: loading .65s infinite ease-in-out;

  }

  :nth-child(2) {

    animation: loading .45s infinite;

  }

  :nth-child(3) {

    animation: loading .85s infinite ease-in-out;

  }

  :nth-child(4) {

    animation: loading .25s infinite;

  }

  :nth-child(5) {

    animation: loading 1.25s infinite ease-in-out;

  }

}

@keyframes loading {

  from {

    height: 4px;

    transform: translateY(-3px);

  }

  to {

    height: 10px;

    transform: translateY(0px);

  }

}

</style>
