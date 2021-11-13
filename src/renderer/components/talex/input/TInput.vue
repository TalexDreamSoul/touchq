<template>

  <div @mouseenter="hover = true" @mouseleave="hover = false" class="TAsideInput-Page">

    <el-input :class="hover ? 'InputHover' : ''" v-bind="$attrs" v-on="$listeners" :type="type" :placeholder="placeholder" :prefix-icon="prefix_icon" :suffix-icon="suffix_icon">

      <template v-slot:prepend>

<!--        <div class="TAsideInput-Aside"></div>-->

        <slot name="prepend"></slot>

      </template>

      <template v-slot:prefix>

        <slot name="prefix"></slot>

      </template>

      <template v-slot:suffix>

        <slot name="suffix"></slot>

      </template>

      <template v-slot:append>

        <slot name="append"></slot>

      </template>

    </el-input>

  </div>

</template>

<script>
export default {

  name: "TAsideInput",

  props: {

    type: {

      type: String,
      default: "primary"

    },

    prefix_icon: {

      type: String,
      default: ""

    },

    suffix_icon: {

      type: String,
      default: ""

    },

    placeholder: {

      type: String,
      default: ""

    }

  },

  data() {

    return {

      hover: false,

    }

  }

}
</script>

<style lang="scss">

.TAsideInput-Page {

  position: relative;

  input {

    position: relative;

    border: 1px solid rgba(0,0,0,0.1);
    background-color: var(--mainColor);

    filter: drop-shadow(0 0 1px var(--mainColor));
    transition: all .25s;

    border-radius: 0 3px 3px 0;
    color: var(--textColor);

  }

  .InputHover {

    filter: drop-shadow(1px 0 2px #1b7cb9) invert(5%);

  }

}

</style>
