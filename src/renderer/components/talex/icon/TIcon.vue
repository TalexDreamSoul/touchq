<template>

  <icon class="iconfont" :class="icon"></icon>

</template>

<script>
export default {
  name: "TIcon",

  props: {

    icon: {

      type: String,
      require: true

    }

  }

}
</script>

<style scoped>

</style>
