<template>

  <div v-show="divVisible" :class="{ 'TipMentioner-Page': true, 'mentioner_loader': divVisible }" ref="TipMentioner">

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

      this.$nextTick(() => {

        this.content = content
        this.divVisible = true

        if(time !== -1) {

          setTimeout(() => {

            this.closeTip()

          }, time)

        }

      })

    },

    closeTip() {

      this.divVisible = false

    }

  }

}

</script>

<style scoped>

.mentioner_loader {

  animation: mentioner_loader_frame .75s;

}

@keyframes mentioner_loader_frame {

  0% {

    border-left: 0 solid rgba(27, 124, 185, 0);
    width: 0;
    opacity: 0;

  }

  40%, 55% {

    border-left: 3px solid rgba(27, 124, 185, 1);
    width: 0;
    opacity: 1;

  }

  100% {

    width: 100%;

  }

}

.TipMentioner-Page {

  height: 20px;
  width: 100%;

  background-color: var(--hoverColor);
  border-left: 3px solid #1b7cb9;

  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  padding: 5px 0 5px 5px;

  color: var(--textColor);

  overflow: hidden;

}

</style>
