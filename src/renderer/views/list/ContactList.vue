<template>

  <div class="ContactList-Page">

    <div class="ListAside">

      <div class="ListSearchBar">

        <el-input clearable placeholder="搜索"></el-input>

      </div>

<!--      最近聊天-->
      <div class="list-block">

        <p class="title">最近聊天</p>

        <div class="items">

          <a-avatar icon="plus" />

        </div>

      </div>

<!--      正式联系人列表-->
      <div class="contact-list-page">

        <el-collapse>

          <el-collapse-item title="好友" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>

          <el-collapse-item title="群组" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>

        </el-collapse>

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

        classes: [],
        tree: [],
        select: -1,

      },

      group: {

        tree: [],
        select: -1,

      },

    }

  },

  created() {

    this.$nextTick(async () => {

      const cls = Array.from(this.$touchq.client.classes.values())

      this.friend.classes = []
      cls.forEach((item, index) => {

        this.friend.classes.push({ title: item, children: []})

      })

      this.friend.tree = await this.$touchq.$userData.getFriendList()

      Array.from(this.friend.tree.values()).forEach((item, index) => {

        this.friend.classes[item.class_id].children.push({

          class_id: item.class_id, key: item.class_id + '-' + index,  title: item.nickname, remark: item.remark, sex: item.sex, user_id: item.user_id,
          scopedSlots: { icon: 'avatar' }

        })

      })

      this.group.tree = await this.$touchq.$userData.getGroupList()

      console.log(this.friend, this.group)

    })

  },

  methods: {

    changeClassName(dataRef) {

      console.log(dataRef)

    },

    deleteClass(dataRef) {

      console.log(dataRef)

    },

    deleteFriend(dataRef) {

      const userId = dataRef.user_id;
      this.$confirm('你确定要删除好友 <strong>' + dataRef.title + '(' + userId + ')</strong> 吗?<br /><br /><span style="color: red">删除后将失去关于他的一切信息</span>', '删除确认',

          {

            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
            confirmButtonText: '删除',
            cancelButtonText: '放弃'

          }).then(async () => {

        const res = await this.$touchq.client.deleteFriend(userId)

        if( res ) {

          const key = `delete-${dataRef.key}-${new Date()}`

          this.$notify({

            title: '删除成功',
            dangerouslyUseHTMLString: true,
            message: '你已删除好友 ' + dataRef.title + '(' + userId + ')<br /><br /><br /><el-button>加回</el-button>'

          });

          // this.$notification.open({
          //
          //   key,
          //   message: '删除成功',
          //   description:
          //       '你已删除好友 ' + dataRef.title + '(' + userId + ')',
          //   icon: <a-icon type="smile" style="color: #108ee9" />,
          //   btn: h => {
          //     return h(
          //         'a-button',
          //         {
          //           props: {
          //             type: 'primary',
          //             size: 'small',
          //           },
          //           on: {
          //             click: () => {
          //
          //               setTimeout(async() => {
          //
          //                 const res = await this.$touchq.client.addFriend(0, userId, '删除加回')
          //
          //                 this.$message.info('已发送加回请求!')
          //
          //                 // const res = await this.$touchq.client.pickFriend(userId)
          //
          //                 // console.log(res)
          //
          //                 this.$notification.close(key)
          //
          //               }, 200)
          //
          //             },
          //           },
          //         },
          //         '加回',
          //     );
          //   }
          //
          // });

        }

      });

      console.log(dataRef)

    },

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

<style lang="scss">

.contact-list-page .el-collapse {

  position: relative;

  margin-bottom: 10px;
  left: 0;

  width: 100%;

  .el-collapse-item__header {

    margin-bottom: 20px;
    padding: 10px;

    background-color: var(--mainColor);

    border: none;

    font-size: 16px;



  }

  .is-active {

    transition: all .25s;

  }

  .el-collapse-item__content {

    padding: 10px;

    background-color: var(--mainColor);

  }

}

.ListAside {

  .ListSearchBar {

    .el-input {

      input {

        border: 0;
        background-color: var(--color2);

        transition: all .25s;

        border-bottom: 2px solid rgba(0,0,0,0);

        color: var(--textnormalColor)

      }

      input:focus {

        border-bottom: 2px solid #1b7cb9;

        border-radius: 5px 5px 0 0;

      }

      position: relative;

      max-width: 90%;
      max-height: 38px;

      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

    }

  }

}

</style>

<style lang="scss" scoped>

.list-block {

  position: relative;

  padding: 10px;

  margin-bottom: 30px;

  .title {

    font-size: 14px;

  }

  .items {

    position: relative;

    left: 10px;

  }

}

.contact-list-page {

  position: relative;

}

.ContactList-Page {

  .contactDetails {

    position: relative;

    left: calc(20% + 2px);

    width: calc(80% - 2px);
    height: 100%;

  }

  .ListAside {

    .ListSearchBar {

      position: relative;

      top: 5px;

      width: 100%;
      height: 52px;

      background-color: var(--ThemeColor);

      border-bottom: 2px solid var(--hoverColor);

    }

    position: absolute;

    top: 0;
    left: 0;

    width: 20%;
    height: 100%;

    border-right: 2px solid var(--hoverColor);

  }

  position: relative;

  width: 100%;
  height: 100%;

  box-sizing: content-box;
  overflow-x: hidden;

}

</style>
