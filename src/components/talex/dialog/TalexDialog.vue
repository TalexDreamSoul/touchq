<template>

  <div @wheel="wheel" class="TalexDialog-Page" ref="DialogPage" v-show="dialogVisible">

    <div :class="'TalexDialog-Mask ' + (visible ? 'dialogMaskLoad' : 'dialogMaskUnLoad')" ref="DialogMask" @click="handleClose"></div>

    <div v-loading="loading" :style="'top: ' + offsetT + 'px'" :class="'TalexDialog-Main ' + (visible ? 'dialogMainLoad' : 'dialogMainUnLoad')" @blur="handleClose" ref="DialogMain">

      <div class="TalexDialog-Main__Header" v-show="headerContent.length > 0">

        <span>{{ headerContent }}</span>

      </div>

      <div class="TalexDialog-Main__Content">

        <slot></slot>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: "TalexDialog",

  props: {

    headerContent: {

      type: String,
      default: "",

    },

    visible: {

      type: Boolean,
      require: true,

    },

    loading: {

      type: Boolean,
      default: false

    }

  },

  data() {

    return {

      dialogVisible: false,
      offsetT: 200,

    }

  },

  watch: {

    visible: {

      immediate: true,
      handler(latest, old) {

        setTimeout(() => {

          this.dialogVisible = latest

        }, 450)

      }

    }

  },

  methods: {

    wheel(e) {

      if(this.loading) return

      const deltaY = e.deltaY

      this.offsetT -= deltaY

    },

    handleClose(e) {

      this.$emit("closed", e)

    },

  }

}
</script>

<style lang="scss" scoped>

.TalexDialog-Main__Content {

  position: relative;

  padding: 10px;

  top: 0;
  left: 50%;

  transform: translateX(-50%);

}

.TalexDialog-Main__Header {

  position: relative;

  width: 100%;
  height: 50px;

  background-color: var(--mainColor);
  border-radius: 3px 3px 0 0 !important;

  span {

    position: absolute;

    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);

    color: var(--textColor);

    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 20px;

  }

}

.TalexDialog-Page {

  position: absolute;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  z-index: 500;

}

.TalexDialog-Mask {

  position: absolute;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  opacity: 0.45;
  background-color: #000;

  filter: blur(15px);
  transition: all .45s;

}

.TalexDialog-Main {

  position: absolute;

  left: 50%;
  top: 20%;

  min-width: 30%;
  width: auto;
  max-width: 60%;

  min-height: 30%;
  height: auto;

  transform: translateX(-50%);

  background-color: var(--hoverColor);
  color: var(--textColor);

  filter: drop-shadow(0 0 2px var(--hoverColor));

  text-align: center;
  border-radius: 2px !important;

  transition: all .45s;

  overflow: hidden;

}

.dialogMainLoad {

  animation: dialogLoad .55s

}
.dialogMainUnLoad {

  animation: dialogUnLoad .55s

}

.dialogMaskUnLoad {

  animation: dialogMaskUnLoad .55s;

}
.dialogMaskLoad {

  animation: dialogMaskLoad .55s;

}

@keyframes dialogMaskLoad {

  from {

    opacity: 0;

  }

  to {

    opacity: 0.45;

  }

}
@keyframes dialogLoad {

  0% {

    transform: translate(-50%, 0) scale3D(0, 0, 0);

    opacity: 0;

  }

  40%, 60% {

    opacity: 1;
    filter: drop-shadow(0 0 10px var(--hoverColor));

  }

  80% {

    transform: translate(-50%, 0) scale3D(1, 1, 1);
    filter: drop-shadow(0 0 10px var(--hoverColor));

  }

  100% {

    filter: drop-shadow(0 0 5px var(--hoverColor));

  }

}

@keyframes dialogMaskUnLoad {

  from {

    opacity: 0.45;

  }

  to {

    opacity: 0;

  }

}
@keyframes dialogUnLoad {

  0% {

    transform: translate(-50%, 0) scale3D(1, 1, 1);
    filter: drop-shadow(0 0 10px var(--hoverColor));

    opacity: 1;

  }

  40%, 60% {

    filter: drop-shadow(0 0 10px var(--hoverColor));

  }

  80% {

    transform: translate(-50%, 0) scale3D(0, 0, 0);
    filter: drop-shadow(0 0 5px var(--textColor));

  }

  100% {

    opacity: 0;


  }

}

</style>
