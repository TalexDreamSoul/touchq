<template>

  <div class="TouchQLogoFrame-Page">

    <div class="TextJoin">

      <svg viewBox="0 0 500 300">
        <text x="0" y="70%"> TalexTouchQ </text>
      </svg>

    </div>

    <div class="LogoContainer">

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="128px" height="128px">
        <polygon class="g-polygon-wrap" points="150 0, 300 75, 300 225, 150 300, 0 225,  0 75, 150 0" />
        <polygon class="g-polygon-move" points="150 0, 300 75, 300 225, 150 300, 0 225,  0 75, 150 0" />
      </svg>

      <img class="LogoFrameImg" :src="imgSrc" alt="?" />

    </div>

    <div class="LogoFrameBg"></div>

  </div>

</template>

<script>

export default {
  name: "TouchQLogoFrame",

  data() {

    return {

      imgSrc: require("../../../assets/TalexTouchChat.png")

    }

  }

}
</script>

<style lang="scss" scoped>

.TextJoin {

  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  svg {

    position: absolute;

    height: 150px;

    overflow: visible;

    transform: scale(1.5) translate(-30%, 15%);

    width: 300px;


  }

  svg text {
    //text-transform: uppercase;
    animation: stroke 10s;
    letter-spacing: 10px;
    font-size: 70px;

    fill: rgba(72, 138, 204, 1);
    stroke: rgba(54, 95, 160, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;

  }
  @keyframes stroke {
    0% {
      fill: rgba(72, 138, 20, 0);
      stroke: rgba(54, 95, 160, 1);
      stroke-dashoffset: 25%;
      stroke-dasharray: 0 50%;
      stroke-width: 0.2;
    }
    50% {
      fill: rgba(72, 138, 20, 0);
      stroke: rgba(54, 95, 160, 1);
      stroke-width: 0.5;
    }
    70% {
      fill: rgba(72, 138, 20, 0);
      stroke: rgba(54, 95, 160, 1);
      stroke-width: 1;
    }
    90%,
    100% {
      fill: rgba(72, 138, 204, 1);
      stroke: rgba(54, 95, 160, 0);
      stroke-dashoffset: -25%;
      stroke-dasharray: 50% 0;
      stroke-width: 0;
    }
  }

}

.LogoContainer {

  svg {

    position: absolute;

    margin: auto;

    //left: 50%;
    //top: 50%;

    overflow: visible;

    transform: scale(0.5) translate(50%, 50%) translate(-14px, -25px)  scalex(.9);

  }

  .g-polygon-wrap,
  .g-polygon-move {
    fill: none;
    stroke: rgb(19, 87, 129);
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  .g-polygon-move {
    transform-origin: center center;
    transform: scale(1.05);
    stroke: linear-gradinet(180deg, red, transprent);
    stroke-width:1.5;
    stroke-dasharray: 280, 700;
    stroke-dashoffset: 8;
    animation: move 2.4s infinite linear;
  }

  @keyframes move {
    0% {
      stroke-dashoffset: 8;
    }
    100% {
      stroke-dashoffset: -972;
    }
  }

}

.TouchQLogoFrame-Page {

  width: 100%;
  height: 100%;

  left: 0;
  top: 0;

  .LogoFrameImg {

    z-index: 300;
    position: absolute;

    left: 50%;
    top: 50%;

    width: 256px;
    height: 256px;

    transform: translate(-50%, -50%) translate(-4px, -4px);

  }

  .LogoContainer {

    position: absolute;

    left: 50%;
    top: 50%;

    width: 256px;
    height: 256px;

    overflow: hidden;
    transform: translate(-50%, -50%);

    animation: logoBreathe 2s infinite;

  }

  .LogoFrameBg {

    position: absolute;

    left: 50%;
    top: 50%;

    width: 188px;
    height: 188px;

    border-radius: 50%;
    transform: translate(-50%, -50%);

    background-color: rgba(0, 0, 0, 0.1);

  }

}

@keyframes logoBreathe {

  0%, 100% {

    filter: drop-shadow(0 0 3px white);

  }

  50% {

    filter: drop-shadow(0 0 5px white);

  }

}

</style>
