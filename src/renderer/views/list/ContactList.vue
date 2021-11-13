<template>

  <div class="ContactList-Page">

    <div class="ListAside">

      <div class="ListSearchBar">

        <TInput></TInput>

      </div>

      <ul class="TabSelector">

        <li @click="selectTab = 0" :class="selectTab === 0 ? 'selected' : ''">

          <TIcon class="icon" icon="touchq-yonghu"></TIcon>

          <br />
          <span>好友</span>

        </li>

        <li @click="selectTab = 1" :class="selectTab === 1 ? 'selected' : ''">

          <TIcon class="icon" icon="touchq-haoyou"></TIcon>

          <br />

          <span>群组</span>

        </li>

      </ul>

      <div class="contactList">

        <ul :class="selectTab === 0 ? '' : 'ListLeft'" class="friend">

          <li v-for="(contact, index) in friend.tree" :key="contact.userId" @click="handleClickContact(contact, index)">

            <img :src="contact.avatar" alt="" />
            <div><TMarquee class="marquee" :text="contact.username"></TMarquee></div>

          </li>

        </ul>

        <ul :class="selectTab === 0 ? 'ListRight' : ''" class="group">

          <li v-for="(contact, index) in group.tree" :key="contact.groupId" @click="handleClickContact(contact, index)">

            <img :src="`https://p.qlogo.cn/gh/${contact.groupId}/${contact.groupId}/100`" alt="" />
            <div><TMarquee class="marquee" :text="contact.groupName"></TMarquee></div>

          </li>

        </ul>

      </div>

    </div>

    <div class="contactDetails">

      <router-view></router-view>

    </div>

  </div>

</template>

<script>
export default {
  name: "ContactList",

  data() {

    return {

      selectTab: 0,

      friend: {

        tree: [],
        select: -1,

      },

      group: {

        tree: [],
        select: -1,

      },



    }

  },

  mounted() {

    this.$nextTick(async () => {

      this.friend.tree = await this.$touchq.$bot.getFriendList()
      this.group.tree = await this.$touchq.$bot.getGroupList()

    })

  },

  methods: {

    handleClickContact(contact, index) {

      if(this.selectTab === 0) {

        this.friend.select = index

        this.$router.push("/contact/friend/" + contact.userId)

      } else {

        this.group.select = index

        this.$router.push("/contact/group/" + contact.groupId)

      }

    }

  }

}
</script>

<style lang="scss" scoped>

.ListLeft {

  opacity: 0;
  transform: scale(0.85) translateX(-100%);

}

.ListRight {

  opacity: 0;
  transform: scale(0.85) translateX(100%);

}

.ContactList-Page {

  .contactDetails {

    position: relative;

    left: 212px;

    width: calc(100% - 212px);
    height: 100%;

  }

  .contactList {

    height: calc(100% - 122px);

    ul {

      position: absolute;
      z-index: 0;

      width: 210px;

      padding: 0;

      top: 80px;

      height: 100%;

      background-color: var(--ThemeColor);

      li {

        &:hover {

          background-color: var(--hoverColor);

          img {

            opacity: 0.95;

            transform: translateX(-5px);

          }

          div {

            opacity: 0.95;

            transform: translateX(-5px);

          }

        }

        padding: 5px 0;

        display: flex;

        justify-content: space-around;

        img {

          position: relative;

          z-index: 1;

          left: 20px;
          top: 1px;

          height: 42px;
          width: 42px;

          border-radius: 50%;

          transition: all .25s;

        }

        div {

          z-index: 0;

          height: 44px;
          width: 100%;

          background-color: var(--ThemeColor);

          transition: all .25s;

          .marquee {

            position: relative;

            left: 30px;
            top: 13px;

            font-size: 14px;

          }

          overflow: hidden;

        }

        position: relative;

        margin-top: 10px;

        width: 100%;

        list-style-type: none;
        cursor: pointer;

        transition: all .25s;

      }

      overflow-y: auto;
      overflow-x: hidden;

      transition: all .25s;

    }

  }

  .ListAside {

    .ListSearchBar {

      position: relative;

      padding: 5px 10px;

      background-color: var(--ThemeColor);

      border-bottom: 1px solid var(--hoverColor);

    }

    .TabSelector {

      position: relative;
      z-index: 1;

      display: flex;
      justify-content: space-around;

      margin: 0 auto;
      padding: 0;

      background-color: var(--ThemeColor);

      .selected {

        transform: translateY(5px);

        .icon, span {

          color: #1b7cb9;

        }

        &:hover {

          transform: translateY(5px) scale(0.95);

          cursor: not-allowed;

          opacity: 1;

        }

        &:before {

          content: "";

          position: absolute;

          left: 50%;
          top: -50%;

          width: 15px;
          height: 3px;

          transform: translate(-50%, 5px);
          border-radius: 0 0 10px 10px;

          box-shadow: 0 3px 5px #1b7cb9;

          background-color: #1b7cb9;

        }

      }

      li {

        &:hover {

          transform: translateY(-2px);

          opacity: 0.75;

        }

        .icon {

          position: absolute;

          left: 11px;
          top: 5px;

        }

        span {

          position: absolute;

          left: 10px;
          bottom: 5px;

          font-size: 11px;

        }

        position: relative;

        display: inline-block;

        margin-top: 10px;

        width: 42px;
        height: 42px;

        background-color: var(--ThemeColor);
        border-radius: 50%;

        list-style-type: none;
        cursor: pointer;

        transition: all .25s;

      }

      filter: drop-shadow(0 2px 3px var(--hoverColor));

    }

    position: absolute;

    top: 0;
    left: 0;

    width: 20%;
    height: 100%;

    border-right: 2px solid var(--hoverColor);

  }

  position: relative;

  margin-top: 25px;

  width: 100%;
  height: 100%;

}

</style>
