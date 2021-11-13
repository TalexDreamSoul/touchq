<template>

  <svg aria-hidden="true">

    <use :xlink:href="'#' + icon"></use>

  </svg>

</template>

<script>
export default {

  name: "QIcon",

  props: {

    icon: {

      type: String,
      require: true

    }

  }

}
</script>

<style scoped>

svg {

  width: 16px;
  height: 16px;

}

</style>
