<template>

  <div class="FriendContact-Page">

    <el-card :class="frame ? 'FrameLoad' : ''" class="GroupDetails">

      <div class="avatarContainer">

        <el-avatar class="avatar" :src="`http://q.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=640`"></el-avatar>

      </div>

      <br />
      {{ data && data.username }} (<a>{{ qq }}</a>)

      <div v-show="strangeData">

        <br />

        <span class="qid" v-show="strangeData && strangeData.qid"><span class="qid_hover"></span><span class="qid_prefix">QID</span>{{ strangeData.qid }}</span>

        <el-divider></el-divider>

        <el-tag type="warning" plain>{{ strangeData.age }}岁</el-tag>
        <el-tag type="success" plain>{{ strangeData.level }}级</el-tag>
        <el-tag type="info" plain>{{ strangeData.sex === 'unknown' ? '人妖' : (strangeData.sex === 'male' ? '男' : '女') }}</el-tag>
        <el-tag plain>{{ strangeData.login_days }}天达人</el-tag>

      </div>

    </el-card>

  </div>

</template>

<script>
export default {
  name: "FriendContact",

  data() {

    return {

      qq: this.$route.params.qq,
      strangeData: null,
      frame: true,

    }

  },

  watch: {

    '$route' (to, from) {

      this.frame = false
      this.qq = this.$route.params.qq

      this.strangeData = null

      this.dataAnalysis()

    }

  },

  methods: {

    dataAnalysis() {

      this.$nextTick(async() => {

        this.frame = true

        const res = await this.$touchq.client.getFriendList()

        console.log(res)

        this.strangeData = res.data
        console.log(this.strangeData)

      })

    }

  }

}
</script>

<style lang="scss" scoped>

@keyframes slideShine {

  0%, 60% {

    transform: skewX(-30deg);

  }

  100% {

    transform: skewX(-30deg) translateX(130px);

  }

}

.qid {

  position: relative;

  padding: 5px;

  color: white;
  background: black linear-gradient(to right, #212121, black) no-repeat 0 0;

  border-radius: 5px;

  .qid_prefix {

    padding-right: 5px;
    margin-right: 5px;

    border-right: 1px solid var(--hoverColor);

    color: rgba(255, 255, 255, 0.8);

  }

  .qid_hover {

    position: absolute;

    left: -10px;
    top: 0;

    width: 5px;
    height: 100%;

    transform: skewX(-30deg);

    opacity: 0.5;
    background-color: var(--ThemeColor);

    animation: slideShine 1.55s ease-out infinite;

  }

}

.FrameLoad {

  animation: detailsLoad .35s;

}

.GroupDetails {

  text-align: center;

  overflow: visible;

  .avatarContainer {

    &:before {

      content: "";
      z-index: -1;

      position: absolute;

      height: calc(100% + 5px);
      width: calc(100% + 5px);

      left: 50%;

      border-radius: 50%;

      background-color: var(--ThemeColor);

      transform: translate(-50%, -5px);

    }

    position: absolute;

    top: -20%;
    left: 50%;

    filter: drop-shadow(0 -3px 5px rgba(231, 232, 232, 1));
    transform: translate(-50%, 5px) scale(1.25);

  }

  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

}

@keyframes detailsLoad {

  0% {

    transform: translate(-50%, -50%) scale3D(0, 0, 0);

  }

  70% {

    transform: translate(-50%, -50%) scale3D(1.2, 1.2, 1.2);

  }

  100% {

    transform: translate(-50%, -50%) scale3D(1, 1, 1);

  }

}

</style>
