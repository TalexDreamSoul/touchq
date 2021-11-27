<template>

  <div class="GroupContact-Page">

    <el-card :class="frame ? 'FrameLoad' : ''" class="GroupDetails">

      <div class="avatarContainer">

        <el-avatar class="avatar" :src="`https://p.qlogo.cn/gh/${groupId}/${groupId}/100`"></el-avatar>

      </div>

      <br />

      <div class="header">

        <div class="marquee"><TMarquee linear :text="data.groupName"></TMarquee></div>
        <el-tag plain>{{ groupId }}</el-tag>

      </div>

      <br />

      <el-tabs>

        <el-tab-pane label="公告" name="announcements">暂无公告</el-tab-pane>
        <el-tab-pane label="成员" name="members">正在加载成员数据...</el-tab-pane>
        <el-tab-pane label="文件" name="files">加载失败</el-tab-pane>

        <el-tab-pane class="honorTabPane" label="荣誉" name="honor">

          <div class="dragon">

            <span class="dragonPointer">龙王</span>

            <el-badge :value="'蝉联' + honorInfo.current_talkative.day_count + '天'">
              <img alt="" :src="`http://q.qlogo.cn/headimg_dl?dst_uin=${honorInfo.current_talkative.user_id}&spec=640`" />
            </el-badge>

            <span class="dragon-title">{{ honorInfo.current_talkative.nickname }}</span>

          </div>

          <el-card class="emotion_publisher">

            <span class="card_title">加特林炮弹王</span>

            <div class="listAvatar" :class="`listAvatar-${index}`" v-for="(item, index) in honorInfo.legend_list" :key="index">

              <el-tooltip placement="top" :content="item.description">

                <img alt="" :src="`http://q.qlogo.cn/headimg_dl?dst_uin=${item.user_id}&spec=640`" />

              </el-tooltip>

              <span class="avatar-title">{{ item.nickname }}</span>

            </div>

          </el-card>

          <el-card class="emotion_publisher">

            <span class="card_title">表情包输出者</span>

            <div class="listAvatar" :class="`listAvatar-${index}`" v-for="(item, index) in honorInfo.emotion_list" :key="index">

              <el-tooltip placement="top" :content="item.description">

                <img alt="" :src="`http://q.qlogo.cn/headimg_dl?dst_uin=${item.user_id}&spec=640`" />

              </el-tooltip>

              <span class="avatar-title">{{ item.nickname }}</span>

            </div>

          </el-card>

          <el-card class="emotion_publisher">

            <span class="card_title">新奇的聊天站</span>

            <div class="listAvatar" :class="`listAvatar-${index}`" v-for="(item, index) in honorInfo.performer_lis" :key="index">

              <el-tooltip placement="top" :content="item.description">

                <img alt="" :src="`http://q.qlogo.cn/headimg_dl?dst_uin=${item.user_id}&spec=640`" />

              </el-tooltip>

              <span class="avatar-title">{{ item.nickname }}</span>

            </div>

          </el-card>

        </el-tab-pane>
      </el-tabs>

    </el-card>

  </div>

</template>

<script>
import TMarquee from "../../components/talex/others/TMarquee";
export default {
  name: "GroupContact",
  components: {TMarquee},
  data() {

    return {

      groupId: this.$route.params.groupId,
      data: this.dataAnalysis(),
      honorInfo: null,
      frame: true,

    }

  },

  watch: {

    '$route' (to, from) {

      this.frame = false
      this.groupId = this.$route.params.groupId

      this.dataAnalysis()

    }

  },

  methods: {

    dataAnalysis() {

      this.$nextTick(async() => {

        this.data = await this.$touchq.$bot.getGroup(this.groupId)

        this.frame = true

        const {data: res} = await this.$touchq.axios.post("/get_group_honor_info", { group_id: this.groupId, type: "all" })

        this.honorInfo = res.data

        console.log(this.honorInfo)

      })

    }

  }

}
</script>

<style lang="scss" scoped>

.FrameLoad {

  animation: detailsLoad .35s;

}

.GroupDetails {

  .honorTabPane {

    overflow-y: auto;
    overflow-x: hidden;

    max-height: 80%;

  }

  min-width: 400px;

  .emotion_publisher {

    margin-bottom: 10px;

    .listAvatar-0 img {

      box-shadow: 0 0 5px red;

      transform: scale(1.1);

    }

    .listAvatar-1 img {

      box-shadow: 0 0 4px orange;
      transform: scale(1.08);

    }

    .listAvatar-2 img {

      box-shadow: 0 0 3px yellow;
      transform: scale(1.05);

    }

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;

    overflow-x: hidden;
    overflow-y: auto;

    &:hover {

      transform: scale(1.015);

      .avatar-title {

        height: auto;
        opacity: 0.75;

        transform: translate(-50%, -20px);

      }

    }

  }

  .listAvatar {

    transition: all .25s;

    .avatar-title {

      position: absolute;
      padding: 3px;

      left: 50%;
      top: 45px;

      width: 12px;
      height: 0;

      transform: translate(-50%, 0);

      word-break: break-all;
      font-size: 10px;
      border-radius: 10px;
      background-color: #1b7cb9;

      overflow: hidden;
      opacity: 0;

      transition: all .25s;

    }

    position: relative;
    display: inline-block;

    margin-right: 15px;
    margin-bottom: 10px;

    top: 15px;

    img {

      position: relative;

      width: 36px;

      border-radius: 50%;

    }

  }

  .el-card {

    position: relative;

    .card_title {

      position: absolute;

      top: 3px;
      left: 3px;

      opacity: 0.8;
      font-size: 12px;

    }

  }

  .dragon {

    height: 70px;

    .dragonPointer {

      position: relative;
      padding: 5px;

      left: -70px;

      margin-right: -50px;

      border-radius: 5px 0 0 5px;
      background-color: rgba(33, 33, 33, 0.2);

      &:after {

        content: "";
        position: absolute;

        top: 4px;
        right: -10px;

        border-right: 20px solid rgba(33, 33, 33, 0.2);
        border-bottom: 20px solid rgba(33, 33, 33, 0);

        transform: rotate(45deg);

      }

    }

    margin-bottom: 10px;
    padding-top: 10px;

    img {

      position: relative;

      width: 64px;

      border-radius: 50%;
      box-shadow: 1px -5px 9px #0d0d0d;

    }

    .dragon-title {

      position: absolute;

      padding: 5px;

      top: 0;
      left: 50%;

      opacity: 0.95;

      border-radius: 5px;
      transform: translate(-50%, calc(200% + 5px)) scale(0.9, 0.8);

      background-image: linear-gradient(to right, orange, yellow);
      font-size: 12px;

    }

  }

  text-align: center;

  overflow: visible;

  .header {

    position: relative;

    display: flex;

    justify-content: space-around;

    width: 300px;
    height: auto;

    .marquee {

      position: relative;

      width: 200px;

      overflow: hidden;

    }

  }

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

    top: 0;
    left: 50%;

    filter: drop-shadow(0 -3px 5px rgba(231, 232, 232, 1));
    transform: translate(-50%, -10px) scale(1.5);

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
