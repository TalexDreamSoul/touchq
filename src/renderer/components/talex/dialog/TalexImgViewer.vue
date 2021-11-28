<template>

  <div @wheel="handleWheel" class="TalexDialog-Page" ref="DialogPage" v-show="dialogVisible">

    <div :class="'TalexDialog-Mask ' + (visible ? 'dialogMaskLoad' : 'dialogMaskUnLoad')" ref="DialogMask"></div>

    <img v-drag :class="play ? 'imgViewPlay' : ''" ref="img" class="TalexDialog-Main" referrerpolicy="no-referrer" :src="src" alt="无法加载图片" />

    <div class="TalexDialog-ToolBar">

      <el-icon @click.native="play = !play" :class="play ? 'el-icon-selected' : ''" class="el-icon el-icon-refresh"></el-icon>
      <el-icon class="el-icon el-icon-refresh-left" @click.native="rotate -= 90"></el-icon>
      <span class="content">{{ (scale * 100).toFixed(0) }}%</span>
      <el-icon class="el-icon el-icon-refresh-right" @click.native="rotate += 90"></el-icon>
      <el-icon class="el-icon el-icon-close" @click.native="handleClose"></el-icon>

    </div>

  </div>

</template>

<script>
export default {
  name: "TalexDialog",

  props: {

    visible: {

      type: Boolean,
      require: true,

    },

    src: {

      type: String,
      require: true

    }

  },

  data() {

    return {

      dialogVisible: false,
      scale: 1,
      rotate: 0,

      play: false,

    }

  },

  watch: {

    visible: {

      immediate: true,
      handler(latest, old) {

        setTimeout(() => {

          this.scale = 1
          this.rotate = 0
          this.play = false

          this.$refs.img.style.transform = 'translate(-50%, -60%) scale(' + this.scale + ') rotate(' + this.rotate + 'deg)'

          this.dialogVisible = latest

        }, 450)

      }

    },

    rotate: {

      handler(latest, old) {

        this.$refs.img.style.transform = 'translate(-50%, -60%) scale(' + this.scale + ') rotate(' + this.rotate + 'deg)'

      }

    }

  },

  methods: {

    handleClose() {

      this.$emit("close")

    },

    handleWheel(e) {

      this.scale += 0.05 * ((e.deltaY > 0 ) ? -1 : 1);

      this.$refs.img.style.transform = 'translate(-50%, -60%) scale(' + this.scale + ') rotate(' + this.rotate + 'deg)'

    }

  },

  directives: {

    drag: {

      bind: function(el, bindings) {

        el.onmousedown = function(e) {

          const disx = e.pageX - el.offsetLeft;
          const disy = e.pageY - el.offsetTop;

          document.onmousemove = function (e) {

            el.style.left = e.pageX - disx + 'px';
            el.style.top = e.pageY - disy + 'px';

          }

          document.onmouseup = function() {

            document.onmousemove = document.onmouseup = null;

          }

        }

      }


    }

  }

}
</script>

<style>

.el-icon {

  position: absolute;

  top: 50%;

  padding: 8px;

  transition: all .45s;
  border-radius: 50%;

  font-size: 25px;

  color: var(--textnormalColor);

}

.el-icon:hover {

  cursor: pointer;

  background-color: rgba(27, 124, 185, 0.6) !important;

}

</style>

<style lang="scss" scoped>

.el-icon-selected {

  background-color: rgba(27, 124, 185, 0.6) !important;

  animation: refreshRotating 2s linear infinite;

}

.el-icon-refresh {

  transform: translate(-135px, -50%);

}

.el-icon-close {

  transform: translate(90px, -50%);

}

@keyframes refreshRotating {

  from {

    transform: translate(-135px, -50%);

  }

  to {

    transform: translate(-135px, -50%) rotate(360deg);

  }

}

.imgViewPlay {

  animation: ThreeDView 5s linear infinite !important;

}

@keyframes ThreeDView {

  from {

    border-radius: 0;

    filter: drop-shadow(0 0 15px var(--textColor));

    transform: translate(-50%, -60%);

  }

  to {

    border-radius: 50%;

    filter: drop-shadow(0 0 10px var(--textColor));

    transform: translate(-50%, -60%) rotateX(360deg) rotateY(360deg) rotateZ(360deg);

  }

}

.el-icon-refresh-right {

  transform: translate(45px, -50%);

}

.el-icon-refresh-left {

  position: absolute;

  top: 50%;

  transform: translate(-87px, -50%);

  font-size: 25px;

  color: var(--textColor);

}

.content {

  position: absolute;

  left: 50%;
  top: 0;

  width: 80px;
  height: 45px;

  font-size: 20px;
  line-height: 45px;

  transform: translateX(-50%);

  filter: invert(5%);
  background-color: var(--mainColor)

}

.TalexDialog-ToolBar:hover {

  opacity: 0.85;

}

.TalexDialog-ToolBar {

  position: absolute;

  left: 50%;
  bottom: 10%;

  min-width: 300px;

  width: auto;
  height: 45px;
  max-height: 150px;

  transform: translateX(-50%);
  transition: all .45s;
  animation: toolbar_load .45s ease-in-out;

  border-radius: 35px;
  background-color: var(--hoverColor);
  backdrop-filter: blur(10px);
  opacity: 0.65;

  z-index: 500;
  text-align: center;

}

@keyframes image_load {

  from {

    opacity: 0;
    top: -50%;

  }

  to {

    top: 50%;
    opacity: 1;

  }

}
@keyframes toolbar_load {

  from {

    opacity: 0;
    bottom: -10%;

  }

  to {

    bottom: 10%;

    opacity: 1;
    max-width: 30%;

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
  backdrop-filter: blur(10px);

  transition: all .45s;

}

.TalexDialog-Main {

  position: absolute;

  left: 50%;
  top: 50%;

  min-width: 20%;
  width: auto;
  max-width: 60%;

  min-height: 30%;
  height: auto;

  transform: translate(-50%, -60%);

  background-color: var(--hoverColor);
  color: var(--textColor);

  filter: drop-shadow(0 0 5px var(--hoverColor));

  text-align: center;
  border-radius: 5px !important;

  animation: image_load .45s ease-in-out;
  transition: all .45s;

  overflow: hidden;

}

.dialogMainLoad {

  animation: dialogLoad .75s

}
.dialogMainUnLoad {

  animation: dialogUnLoad .75s

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

    transform: translate(-50%, -50%) scaleY(0);

    opacity: 0;

  }

  40%, 60% {

    opacity: 1;
    filter: drop-shadow(0 0 10px var(--hoverColor));

  }

  80% {

    transform: translate(-50%, -50%) scaleY(1);
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

    transform: translate(-50%, -50%) scaleY(1);
    filter: drop-shadow(0 0 10px var(--hoverColor));

    opacity: 1;

  }

  40%, 60% {

    filter: drop-shadow(0 0 10px var(--hoverColor));

  }

  80% {

    transform: translate(-50%, -50%) scaleY(0);
    filter: drop-shadow(0 0 5px var(--textColor));

  }

  100% {

    opacity: 0;


  }

}

</style>
