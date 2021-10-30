<template>

  <div class="DeviceCardPad-Main_Container">

<!--    整个平板的绘制-->
    <div class="cardPad-Container">

      <div class="padMain">

        <div class="padBg">

          <p v-for="i in 5" class="padMain-Bg"></p>

        </div>

      </div>

      <div class="padBtn"></div>

      <img class="padQ" src="./../../../../assets/TalexTouchChat.png"  alt=""/>

    </div>

  </div>

</template>

<script>
export default {

  name: "DeviceCardPad",

}
</script>

<style lang="scss" scoped>

.padQ {

  position: absolute;

  left: 50%;
  top: 50%;

  width: 128px;
  height: 128px;

  filter: drop-shadow(0 0 20px #a6cce4);
  transform: translate(-50%, -50%);

}

.padQ:hover {

  filter: drop-shadow(0 0 20px #1b7cb9);

}

.cardPad-Container {

  position: relative;

  width: 100%;
  height: 100%;

}

.cardPad-Container:hover {

  .padMain {

    filter: drop-shadow(1px 10px 5px var(--mainColor)) invert(10%);

  }

  .padBg {

    transform: scale(1.05);

    :nth-child(1) {

      left: -50px;
      top: -30px;

      width: 122px;
      height: 128px;

      filter: blur(5px);
      opacity: 0.15;

      background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);

    }

    :nth-child(2) {

      left: 90px;
      top: -110px;

      width: 82px;
      height: 88px;

      filter: blur(20px);
      opacity: 0.85;

      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);

    }

    :nth-child(3) {

      left: -20px;
      top: -185px;

      width: 256px;
      height: 256px;

      opacity: 0.45;

      background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

    }

    :nth-child(4) {

      left: -20px;
      top: -600px;

      width: 256px;
      height: 256px;

      opacity: 0.15;
      filter: blur(20px);

      background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);

    }

    :nth-child(5) {

      left: 80px;
      top: -900px;

      width: 48px;
      height: 48px;

      opacity: 0.05;
      filter: blur(3px);

      background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);

    }

  }

}

.padBg {

  transition: all .35s;

}

.padMain {

  position: relative;
  margin-bottom: 10px;

  left: 50%;

  width: 180px;
  height: 120px;

  background-color: var(--mainColor);
  border: 5px solid var(--ThemeColor);
  border-right-width: 20px;
  border-radius: 3px;

  transform: translateX(-50%);
  filter: drop-shadow(2px 5px 10px var(--mainColor)) invert(10%);

  overflow: hidden;

  .padMain-Bg {

    position: relative;
    display: inline-block;

    width: 64px;
    height: 64px;

    border-radius: 50%;
    animation: loadingRotate 8.5s linear infinite;
    transition: all .35s;

  }

  .padBg {

    :nth-child(1) {

      left: -50px;
      top: -30px;

      width: 122px;
      height: 128px;

      filter: blur(5px);
      opacity: 0.5;

      background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);

    }

    :nth-child(2) {

      left: 90px;
      top: -110px;

      width: 82px;
      height: 88px;

      filter: blur(20px);
      opacity: 0.5;

      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);

    }

    :nth-child(3) {

      left: -20px;
      top: -200px;

      width: 256px;
      height: 256px;

      opacity: 0.25;

      background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

    }

    :nth-child(4) {

      left: -20px;
      top: -600px;

      width: 256px;
      height: 256px;

      opacity: 0.25;
      filter: blur(30px);

      background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);

    }

    :nth-child(5) {

      left: 80px;
      top: -900px;

      width: 48px;
      height: 48px;

      opacity: 0.95;
      filter: blur(3px);

      background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);

    }

  }

}

@keyframes loadingRotate {

  0%, 100% {

    transform: rotate(0deg) scale(1.05);

  }

  50% {

    transform: rotate(360deg) scale(1);

  }

}

.padBtn {

  position: absolute;
  content: "";

  top: 50%;
  left: 50%;

  transform: translate(87px, -50%);

  width: 12px;
  height: 12px;

  border-radius: 50%;
  background-color: var(--ThemeColor);

  transition: all .35s;
  filter: drop-shadow(0 0 2px var(--ThemeColor)) invert(70%);

}

.padBtn:hover {

  filter: drop-shadow(0 0 3px var(--ThemeColor)) invert(80%);

}

</style>
