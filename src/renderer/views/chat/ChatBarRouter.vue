<template>

  <div class="ChatBarRouter-Page" ref="RouterPageRef">

    <div class="ChatBarRouter-LeftAside">

      <ul class="AsideMenu">

        <li @click="gotoChat()"><MessageIcon :selected="selectMenuIndex === 0"></MessageIcon></li>
        <li @click="gotoList()"><ListIcon :selected="selectMenuIndex === 1"></ListIcon></li>

      </ul>

      <div class="asideAvatar">

        <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${nowUser}&s=100`" />

      </div>

      <div class="logout">

        <QuitLoading @clicker="quitLogin"></QuitLoading>

      </div>

    </div>

    <div class="ChatBarRouter-RightAside">

      <keep-alive>

        <router-view></router-view>

      </keep-alive>

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

    gotoChat() {

      this.$router.push("/chat")

      this.selectMenuIndex = 0

    },

    gotoList() {

      this.$router.push("/contact/list")

      this.selectMenuIndex = 1

    },

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

    padding-left: 5px;

    height: 100%;
    width: 55px;

    opacity: 0.8;

    background-color: var(--ThemeColor);
    box-shadow: 3px 0 5px var(--hoverColor);

  }

  .ChatBarRouter-RightAside {

    z-index: 1;
    position: absolute;

    top: 0;
    left: 60px;

    height: 100%;
    width: calc(100% - 60px);

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
