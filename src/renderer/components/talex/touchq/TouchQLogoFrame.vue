<template>

  <div class="TouchQLogoFrame-Page">

    <div class="LogoContainer">

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

    transform: translate(-50%, -50%);

    animation: logoBreathe 5s infinite;

  }

  .LogoFrameBg {

    position: absolute;

    left: 50%;
    top: 50%;

    width: 64px;
    height: 64px;

    border-radius: 50%;
    transform: translate(-50%, -50%);

    background-color: var(--themeOpacityColor);
    backdrop-filter: blur(10px);

    animation: breathe 2.85s infinite linear;

  }

  .LogoFrameBg:before {

    content: "";
    position: absolute;

    left: 50%;
    top: 50%;

    width: 32px;
    height: 32px;

    border-radius: 50% / 50%;
    transform: translate(-50%, -50%);

    background-color: rgba(0, 0, 0, 0.9);

    animation: breathe 3.65s infinite ease-out;

  }

  .LogoFrameBg:after {

    content: "";
    position: absolute;

    left: 50%;
    top: 50%;

    width: 32px;
    height: 32px;

    border-radius: 50%;
    transform: translate(-50%, -50%);

    background-color: black;

    animation: breathe 1.45s infinite ease-in-out;

  }

}

@keyframes logoBreathe {

  17% {

    transform: translate(-50%, -50%) rotate(60deg) scale(0.8);
    filter: drop-shadow(0 0 5px black);

  }

  34% {

    transform: translate(-50%, -50%) rotate(120deg);
    filter: drop-shadow(0 0 3px white);

  }

  51% {

    transform: translate(-50%, -50%) rotate(180deg) scale(0.8);
    filter: drop-shadow(0 0 5px black);

  }

  68% {

    transform: translate(-50%, -50%) rotate(240deg);
    filter: drop-shadow(0 0 3px white);

  }

  85% {

    transform: translate(-50%, -50%) rotate(300deg) scale(0.8);
    filter: drop-shadow(0 0 5px black);

  }

  100% {

    transform: translate(-50%, -50%) rotate(360deg);
    filter: drop-shadow(0 0 3px white);

  }

}

@keyframes breathe {

  from {

    opacity: 1;
    transform: translate(-50%, -50%) scale(0);

  }

  to {

    opacity: 0;
    transform: translate(-50%, -50%) scale(3.5);

  }

}

</style>
