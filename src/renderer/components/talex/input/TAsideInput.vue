<template>

  <div @mouseenter="hover = true" @mouseleave="hover = false" @focus="focus = true" @blur="focus = false" class="TAsideInput-Page">

    <div :class="focus ? 'AsideFocus' : (hover ? 'AsideHover' : '')" class="TAsideInput-Aside"></div>

    <el-input :class="focus ? 'InputFocus' : (hover ? 'InputHover' : '')" v-bind="$attrs" v-on="$listeners" :type="type" :placeholder="placeholder" :prefix-icon="prefix_icon" :suffix-icon="suffix_icon">

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
      focus: false,

    }

  }

}
</script>

<style lang="scss">

.TAsideInput-Page {

  .TAsideInput-Aside {

    position: absolute;

    top: 0;
    left: -1px;

    width: 3px;
    height: 100%;

    transform: scaleY(0);
    transition: all .2s

  }

  .AsideHover {

    transform: scaleY(1);

    border-radius: 0 3px 3px 0;
    box-shadow: 2px 0 4px #1b7cb9;

    background-color: #1b7cb9;

    z-index: 100;

  }

  .AsideFocus {

    width: 5px;

    transform: scaleY(1) translateX(1px);

    border-radius: 0 5px 5px 0;
    box-shadow: 3px 0 6px #1b7cb9;

    background-color: #1b7cb9;

    z-index: 100;

  }

  input {

    position: relative;

    border: 1px solid rgba(0,0,0,0);
    background-color: var(--mainColor);

    filter: drop-shadow(0 0 1px var(--mainColor));
    transition: all .25s;

    border-radius: 0 3px 3px 0;
    color: var(--textColor);

  }

  .InputHover {

    filter: drop-shadow(1px 0 2px #1b7cb9) invert(5%);

  }

  .InputFocus {

    border: 1px solid #1b7cb9;
    filter: drop-shadow(1px 0 2px #1b7cb9) invert(5%);

  }

}

</style>
