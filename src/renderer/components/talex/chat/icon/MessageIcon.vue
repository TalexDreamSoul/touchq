<template>

  <div class="ListIcon-Page">

    <div class="MessageIcon" :class="{ 'selected': selected }">

      <el-icon class="el-icon-chat-dot-square"></el-icon>

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

<style lang="scss">

.ListIcon-Page {

  .el-icon-chat-dot-square {

    position: relative;

    left: 7px;
    top: 8px;

  }

}

</style>

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

    border-radius: 50% 50% 50% 10px;

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

.MessageIcon {

  position: relative;

  top: 9px;
  left: 9px;

  width: 32px;
  height: 32px;

  border-color: rgba(0,0,0,0);
  border-radius: 50% 50% 50% 2px;

  //border: 1px solid #1d8fff;
  background-color: #1b7cb9;

  opacity: 0.85;
  cursor: pointer;

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
