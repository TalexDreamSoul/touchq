<template>

  <div class="ListIcon-Page">

    <div class="ListIcon-Container" :class="{ 'selected': selected }">

      <div class="ListIcon-Head"></div>

      <div class="ListIcon-Body"></div>

    </div>

  </div>

</template>

<script>
export default {

  name: "MessageIcon",

  props: {

    selected: {

      type: Boolean,
      require: true

    }

  }

}
</script>

<style lang="scss" scoped>

.ListIcon-Page {

  position: relative;

  top: 0;
  left: 1px;

  width: 48px;
  height: 48px;

  .selected {

    opacity: 0.95;
    background-color: #0472b7 !important;

    border-radius: 50%;

    .ListIcon-Head {

      background-color: white;

      filter: contrast(10) hue-rotate(0);

      animation: headRounding 1.05s ease-in-out;

    }

    .ListIcon-Body {

      background-color: white;

      filter: contrast(10) hue-rotate(0);

      animation: bodyMove 1.05s ease-in-out;

    }

    &:after {

      content: "";
      position: absolute;

      width: 42px;
      height: 42px;

      left: -5px;
      top: -5px;

      border-radius: 50%;

      opacity: 0.4;
      background-color: #3f5efb;

    }

  }

}

@keyframes bodyMove {

  50% {

    transform: translateY(5px);

  }

}

@keyframes headRounding {

  0% {

    transform: rotate(0);
    box-shadow: 0 0 5px white;

  }

  40%, 50% {

    transform: rotate(360deg);
    box-shadow: 0 0 15px white;

  }

  60% {

    transform: translateY(12px);

  }

  100% {

    transform: rotate(0);

  }

}

@keyframes bubbleIng {

  from {

    left: 9px;
    top: 9px;

    width: 16px;
    height: 16px;

    opacity: 0.5;

  }

  to {

    left: -9px;
    top: -9px;

    width: 50px;
    height: 50px;

    opacity: 0;

  }

}

.ListIcon-Container {

  position: relative;

  top: 8px;
  left: 8px;

  width: 32px;
  height: 32px;

  border-radius: 50%;

  border: 2px solid #1b7cb9;

  opacity: 0.85;
  cursor: pointer;

  overflow: hidden;

  .ListIcon-Head {

    position: absolute;

    left: 10px;
    top: 3px;

    width: 12px;
    height: 12px;

    background-color: #1b7cb9;

    border-radius: 50%;

  }

  .ListIcon-Body {

    position: absolute;

    left: 4px;
    bottom: -12px;

    width: 24px;
    height: 24px;

    background-color: #1b7cb9;

    border-radius: 50%;

  }

  &:active {

    transition: all 0.15s;

    opacity: 0.95;
    transform: scale(0.85);

  }

  &:hover:before {

    animation: bubbleIng .75s infinite;

  }

  &:before {

    content: "";
    position: absolute;

    left: 16px;
    top: 16px;

    width: 0;
    height: 0;

    border-radius: 50%;

    opacity: 1;
    background-color: black;

    transition: all .085s;

  }

  &:active:before {

    content: "";
    position: absolute;

    left: -8px;
    top: -8px;

    width: 48px;
    height: 48px;

    border-radius: 50%;

    opacity: 0.3;
    background-color: black;

  }

}

</style>
