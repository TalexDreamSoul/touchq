<template>

  <div class="TalexFloatDialog-Page__Container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">

    <template>

      <slot name="display"></slot>

    </template>

    <div v-show="mouseIn" :class="mouseIn ? 'pageContainer-MouseIn' : 'pageContainer-MouseLeave'" class="pageMainContainer">

      <template>

        <slot name="dialog"></slot>

      </template>

    </div>

  </div>

</template>

<script>
export default {

  name: "FloatDialog",

  data() {

    return {

      mouseIn: false,
      tryMouseLeave: false,

    }

  },

  methods: {

    handleMouseEnter(e) {

      this.mouseIn = true
      this.tryMouseLeave = false

    },

    handleMouseLeave() {

      this.tryMouseLeave = true

      setTimeout(() => {

        if(this.tryMouseLeave) {

          this.mouseIn = false

        }

      }, 100)


    },

  }

}
</script>

<style scoped>

.pageContainer-MouseIn {

  animation: pageEnter .3s


}

.pageContainer-MouseLeave {



}

@keyframes pageEnter {

  from {

    transform-origin: left bottom;
    transform:  translateY(calc(-100% - 5px)) scale(0)

  }

  to {

    transform: translateY(calc(-100% - 5px)) scale(1)

  }

}

.pageMainContainer {

  position: absolute;
  z-index: 350;

  padding: 3px 2px;

  left: 2px;
  top: 0;

  width: auto;
  height: auto;

  min-width: 100px;
  min-height: 30px;

  box-shadow: 1px 1px 5px var(--hoverColor);
  border-radius: 3px;
  background-color: var(--containerBg);

  transform: translateY(calc(-100% - 5px))

}

.TalexFloatDialog-Page__Container {

  display: inline-block;

}

</style>
