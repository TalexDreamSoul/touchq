<template>

  <div class="ChatBarRouter-Page" ref="RouterPageRef">

    <div class="ChatBarRouter-LeftAside">

      <ul class="AsideMenu">

        <li @click="selectMenuIndex = 0"><MessageIcon :selected="selectMenuIndex === 0"></MessageIcon></li>
        <li @click="selectMenuIndex = 1"><ListIcon :selected="selectMenuIndex === 1"></ListIcon></li>

      </ul>

      <div class="asideAvatar">

        <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${nowUser}&s=100`" />

      </div>

      <div class="logout">

        <QuitLoading @clicker="quitLogin"></QuitLoading>

      </div>

    </div>

    <div class="ChatBarRouter-RightAside">

      <router-view></router-view>

    </div>

  </div>

</template>

<script>
export default {

  name: "ChatBarRouter",

  data() {

    return {

      selectMenuIndex: 0,
      nowUser: this.$touchq.$userData.$nowUser,

    }

  },

  methods: {

    quitLogin() {

      const el = this.$refs.RouterPageRef

      el.style.transition = 'all .45s'
      el.style.transform = 'translateY(300px)'
      el.style.opacity = '0'

      setTimeout(() => {

        this.$router.push("/login")

      }, 450)

    },

  }

}
</script>

<style lang="scss" scoped>

.AsideMenu {

  position: relative;

  margin: 0;
  padding: 0;

  top: 80px;

  li {

    position: relative;

    margin-bottom: 15px;

    left: -2px;

    width: 100%;
    height: 48px;

    list-style-type: none;

    transform: scale(0.75);

  }

}

.asideAvatar {

  position: absolute;

  bottom: 60px;
  left: 7px;

  width: 36px;
  height: 36px;

  img {

    width: 36px;
    height: 36px;

    border-radius: 3px;

  }

  &:after {

    content: "";
    position: absolute;

    left: 28px;
    top: 28px;

    width: 10px;
    height: 10px;

    border-radius: 50%;
    background-color: #2cea8c;

  }

}

.logout {

  position: relative;

  top: calc(100% - 180px);
  left: 3px;

  width: 16px;
  height: 16px;

  transform: scale(1.25);

}

.ChatBarRouter-Page {

  .ChatBarRouter-LeftAside {

    z-index: 2;
    position: absolute;

    height: 100%;
    width: 50px;

    opacity: 0.8;

    background-color: var(--ThemeColor);
    box-shadow: 3px 0 5px var(--hoverColor);

    //background-size: 500% 500%;
    //background-image: linear-gradient(to bottom, #42acf1, #25a4f5, #6ebdf5, #38a7ee, #1b7cb9, #1b7cb9, #25a4f5, #1660a8, #25a4f5, #1660a8, #25a4f5, #1b7cb9, #25a4f5, #1b7cb9, #1b7cb9);

    //animation: LeftAsideWaving 120s infinite linear;

  }

  .ChatBarRouter-RightAside {

    z-index: 1;
    position: absolute;

    top: 0;
    left: 50px;

    height: 100%;
    width: calc(100% - 50px);

    overflow: hidden;

  }

}

@keyframes LeftAsideWaving {

  0% {

    background-position: 0;

  }

  100% {

    background-position: -500% -500%;

  }

}

</style>
