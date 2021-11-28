<template>

  <div v-show="divVisible" :class="{ 'TipMentioner-Page': true, 'mentioner_loader': divVisible }" ref="TipMentioner">

<!--    <span class=""></span>-->

    {{ content }}

  </div>

</template>

<script>

export default {
  name: "TipMentioner",

  data() {

    return {

      content: "",
      divVisible: false,

    }

  },

  methods: {

    showTip(content, time) {

      this.closeTip()

      setTimeout(() => {

        this.content = content
        this.divVisible = true

        if(time !== -1) {

          setTimeout(() => {

            this.closeTip()

          }, time)

        }

      }, 200)

    },

    closeTip() {

      this.divVisible = false

    }

  }

}

</script>

<style lang="scss">

.mentioner_loader {

  animation: mentioner_loader_frame 1.75s ease-in-out;

}

@keyframes barJoin {

  0% {

    color: rgba(0,0,0,0) !important;
    border-radius: 0;
    box-shadow: 0 0 5px rgba(0,0,0,0);
    opacity: 0;
    transform: scaleY(0);

  }

  60% {

    color: rgba(0,0,0,0) !important;
    border-radius: 0;
    box-shadow: 5px 0 5px #1b7cb9;
    width: 3px;
    opacity: 1;
    transform: scaleY(1) translateX(15px);

  }

  90% {

    box-shadow: 5px 0 5px #1b7cb9;
    transform: scaleY(1) translateX(0);

  }

  100% {

    box-shadow: 5px 0 5px #1b7cb9;

  }

}

@keyframes mentioner_loader_frame {

  0% {

    padding: 0;
    width: 0;
    color: rgba(0,0,0,0);

  }

  60% {

    padding: 0;
    width: 0;
    color: rgba(0,0,0,0);

  }

  100% {

    padding: 5px 0 5px 15px;
    width: calc(100% - 20px);

  }

}

.TipMentioner-Page {

  height: 20px;
  width: calc(100% - 20px);

  padding: 5px 0 5px 15px;

  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;

  background-color: var(--themeOpacityColor);
  border-radius: 0 3px 3px 0;

  color: var(--textColor);
  backdrop-filter: blur(30px);

  &:before {

    content: "";
    position: absolute;

    top: 0;
    left: 0;

    width: 2px;
    height: 100%;

    border-radius: 0 5px 5px 0;
    box-shadow: 3px 0 5px #1b7cb9;
    background-color: #1b7cb9;

    animation: barJoin 1.75s ease-in-out;

  }

}

</style>
