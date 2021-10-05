<template>

  <div class="ChatInputer-Page" ref="ChatInputer" @keydown.down="downAtSelect" @keydown.up="upAtSelect">

    <div ref="UserInputer" class="inputer" v-model="inputer.origin" contenteditable="plaintext-only"
         @keyup="onInputText" @keydown="onInputKeyDown" >

    </div>

    <ul v-show="atData.dialogShow" class="at_list" ref="atList">

      <li v-show="canShow(item.content) || canShow(item.src)" @mouseenter="atData.selectAt = index" :style="atData.selectAt === index ? 'background-color: var(--textColor)' : ''" v-for="(item, index) in at.list"
          >

        <img class="at_avatar" :src="item.src" alt="无法加载" />
        <span class="at_user">{{ item.content }}</span>

      </li>

    </ul>

  </div>

</template>

<script>

class Msg {

  constructor(type, data) {

    this.type = type;
    this.data = data;

  }

}

export default {
  name: "ChatInputer",

  props: {

    at: {

      type: Object,
      default() {

        let array = []

        for (let i = 0; i < 20; ++i) {

          array.push({

            src: "http://q1.qlogo.cn/g?b=qq&nk=2418876761&s=100",
            content: "测试超级超级超级长的At" + i

          })

        }

        return {

          allow: true,
          list: array

        }

      }

    }

  },

  data() {

    return {

      inputer: {

        origin: "[Talex:Image=http://q1.qlogo.cn/g?b=qq&nk=2418876761&s=100]测试图片"

      },

      //At 相关数据
      atData: {

        dialogShow: false,
        selectAt: -1,
        atUser: "",
        editorRange: {}

      },
      preventKeyUp: false,

    }

  },

  watch: {

    atUser(latest, old) {

      if(!this.at_list_show) {

        return false

      }

    },

    selectAt(latest, old) {

      // if(latest % 3 !== 0) return

      const el = this.$refs.atList

      el.scrollTop = (latest - 1) * el.firstChild.offsetHeight

    },

    // at_list_show(latest, old) {
    //
    //   if(latest) {
    //
    //     document.addEventListener("click", () => {
    //
    //       this.closeAt();
    //
    //     });
    //
    //   } else {
    //
    //     document.removeEventListener("click", () => {
    //
    //       this.closeAt();
    //
    //     });
    //
    //   }
    //
    // }

  },

  methods: {

    onInputKeyDown(e) {

      if (this.atData.dialogShow) {

        if (e.code === 'Enter') {

          this.atData.dialogShow = false

          preventAfterAction.call(this, e)

          this.insertAt(this.at.list[this.atData.selectAt])

        } else if (e.code === 'Escape') {

          this.atData.dialogShow = false

          preventAfterAction.call(this, e)

        }

      } else {
        // 回车给拦掉，什么都不做
        if (e.code === 'Enter') {
          preventAfterAction.call(this, e)
        }

      }

      function preventAfterAction(e) {
        e.preventDefault()
        this.preventKeyUp = true
      }

    },

    onInputText(e) {

      if (this.preventKeyUp) {

        this.preventKeyUp = false
        return

      }

      this.preventKeyUp = false

      const el = e.currentTarget
      // 这是输入了@，那就直接弹选人浮层

      if (e.code === 'Digit2' && e.shiftKey) {

        this.openAt()

      } else {

        // 这里是输入的不是@，但是可能前方有@，因此需要进行检测看看是否要展示选人浮层
        this.tryOpenAt()

      }

    },

    tryOpenAt() {

      const rangeInfo = this.getEditorRange()

      if (!rangeInfo || !rangeInfo.range || !rangeInfo.selection) return

      const curNode = rangeInfo.range.endContainer
      if (!curNode || curNode.nodeName !== '#text') return

      const searchStr = curNode.textContent.slice(0, rangeInfo.selection.focusOffset)
      // 判断光标位置前方是否有at，只有一个at则展示默认dialog，除了at还有关键字则展示searchDialog

      const keywords = (/@([^@]*)$/).exec(searchStr)

      if (keywords && keywords.length >= 2) {

        // 展示搜索选人
        const key_words = keywords[1]
        const allMathStr = keywords[0]

        this.atData.atUser = (allMathStr !== '@') ? key_words : ''

        this.openAt()
        // 重点：记下弹窗前光标位置range
        this.atData.editorRange = rangeInfo

      } else {
        // 关掉选人
        this.closeAt()
      }

    },

    getEditorRange() {

      let range = null, selection = null;

      if (window.getSelection) {

        selection = window.getSelection();

        if (selection.getRangeAt && selection.rangeCount) {

          range = selection.getRangeAt(0);

          return {
            range,
            selection,
            offsetS: range.startOffset,
            offsetE: range.endOffest

          };

        } else {

          return null;

        }

      } else {

        return null;

      }

    },

    canShow(item) {

      return item.toLowerCase().indexOf(this.atData.atUser.toLowerCase()) !== -1

    },

    upAtSelect() {

      if(this.at_list_show && this.selectAt > 0) {

        this.selectAt --;

      }

    },

    downAtSelect() {

      if(this.at_list_show && this.selectAt < this.at.list.length - 1) {

        this.selectAt ++;

      }

    },

    openAt(event) {

      //焦点
      const selection = window.getSelection()
      const range = selection.getRangeAt(0)
      const node = document.createElement("span", {})

      //插入一个span 以获取位置
      range.insertNode(node)

      //获取span的位置
      let top = node.offsetTop - 10 + node.clientTop
      let left = node.offsetLeft - 10

      const el = this.$refs.atList
      el.style.left = left + 'px'
      el.style.top = top + 'px'

      // const parent = node.offsetParent
      let leftEnd = false

      if(left > (node.offsetParent.clientWidth - el.clientWidth - 30)) {

        el.style.left = (left - el.clientWidth - 30) + 'px'
        el.style.borderRadius = '5px 15px 5px 5px'

        leftEnd = true

      }

      if(top > (node.offsetParent.clientHeight - el.clientHeight - 15)) {

        el.style.top = (top - el.clientHeight - 15) + 'px'
        el.style.borderRadius = leftEnd ? '5px 5px 15px 5px' : '5px 5px 5px 15px'

      }

      range.deleteContents()

      this.atData.dialogShow = true

      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'

      this.atData.selectAt = 0

    },

    insertAt(content) {

      const inputer = this.$refs.UserInputer

      if(!inputer) return

      //捕获光标
      inputer.focus()

      // // 创建 @标签 设定样式
      // const node = document.createElement("span", {})
      //
      // node.style.color = '#6f86fb'
      // node.style.margin = '0 5px 0 3p'
      //
      // node.contentEditable = false
      // node.tabindex = '-1'
      //
      // node.dataset['at'] = JSON.stringify(content)
      //
      // node.innerHTML = "@" + content.content
      //
      // this.insertNode(
      //
      //     this.atData.editorRange.range,
      //     node,
      //     true
      //
      // )

      // 定位光标
      const selection = window.getSelection()
      let editorRange = selection.getRangeAt(0)

      const el = editorRange.endContainer
      //删除原始数据
      // const editorRange = this.atData.editorRange.range

      if (!editorRange) return

      const endOffset = editorRange.endOffset // 光标位置

      console.log("AtPosition", editorRange, this.atData.editorRange)

      editorRange.setStart(el, endOffset - 1)

      editorRange.setEnd(el, this.atData.editorRange.offsetS)

      let text = editorRange.toString()

      console.log("DeleteContent: " + text, editorRange.startOffset + "-" + editorRange.endOffset)

      if(text[0] !== '@') {

        editorRange.setStart(el, this.atData.editorRange.offsetS - 2)
        editorRange.setEnd(el, endOffset + this.atData.editorRange.offsetS - 2)

      } else {

        editorRange.deleteContents()

      }

      text = editorRange.toString()

      const index = text.lastIndexOf("@")

      text = text.substring(index, text.length)

      console.log("DeleteContent2: " + text, editorRange.startOffset + "-" + editorRange.endOffset)

      el.innerText = el.innerText.replace(text, '')

      editorRange.setStart(el, editorRange.startOffset - text.length)

      // 创建 @标签 设定样式
      const node = document.createElement("span", {})

      node.style.color = '#6f86fb'
      node.style.margin = '0 5px 0 3p'

      node.contentEditable = false
      node.tabindex = '-1'
      node.dataset['at'] = JSON.stringify(content)

      node.innerHTML = "@" + content.content

      // 插入
      editorRange.insertNode(node)

    },

    /**
     * 将一个 html 片段插入到可编辑元素的光标后面
     * @param {Object} rangeObj 一个已经实例化的 range 对象
     * @param {Node} node 即将插入的 html 片段
     * @param {Boolean} hideIndex 插入后是否显示光标
     */
    insertNode(rangeObj, node, hideIndex) {

      // 若传进来的 range 无 createContextualFragment 方法，创建一个
      if (typeof Range !== 'undefined' && !Range.prototype.createContextualFragment) {

        Range.prototype.createContextualFragment = function(html) {
          let frag = document.createDocumentFragment()
          let div = document.createElement('div')
          frag.appendChild(div)
          div.outerHTML = html
          return frag
        }

      }

      // 创建 selection 实例
      let selection = window.getSelection()

      // 插入DOM
      rangeObj.insertNode(node)

      rangeObj.setStart(rangeObj.startContainer, this.atData.editorRange.offsetS)
      rangeObj.setEndBefore(node)

      console.log("删除文本: ", rangeObj.toString(), rangeObj)
      rangeObj.deleteContents()


      // 更新光标位置
      rangeObj.setEndAfter(node)

      // 合并开始光标和结束光标
      rangeObj.collapse(false)

      // 移除 window 内所有光标
      selection.removeAllRanges()

      // 将光标定位在编辑栏
      !hideIndex && selection.addRange(rangeObj)

    },

    closeAt() {

      const el = this.$refs.atList

      if(el === null || el === undefined) {

        setTimeout(() => {

          this.closeAt();

        }, 500)

        return

      }

      el.style.opacity = '0'
      el.style.transform = 'translateY(-10px)'

      setTimeout(() => {

        this.at_list_show = false

        this.atUser = ""

      }, 1200)

    },

    addImage(src) {



    },

    refreshInput() {

      event.target.innerHTML = this.html()

    },

    html() {

      let content = this.inputer.origin;

      let index = content.indexOf("[Talex:");

      while( index !== -1 ) {

        let index2 = content.indexOf("]", index);

        const str = content.substring(index, index2 + 1);

        content = content.replace(str, this.getSpecialCodeHtml(str));

        index = content.indexOf("[Talex:", index2);

      }

      return content;

    },

    getSpecialCodeHtml(code) {

      code = code.replace("[Talex:", "");

      const index1 = code.indexOf("=");

      const type = code.substring(0, index1);

      if( type.toLowerCase() === 'at') {

        const index2 = code.indexOf(";", index1);

        const content = code.substring(index1 + 1, index2);

        return "<span style='color: #6f86fb;opacity: 0.95;margin: 0 5px 0 3px'>@" + content + " </span>";

      }

      if( type.toLowerCase() === 'image') {

        return "<img class='chat_img' alt='无法加载图片' src='" + code.substring(index1 + 1, code.length - 1) + "'/>"

      }

      return code;

    },

  }

}
</script>

<style lang="less" scoped>

.at_list {

  .at_user {

    position: relative;

    left: 8px;
    top: -5px;

    width: fit-content;
    width: -moz-fit-content;

    font-size: 15px;

  }

  .at_avatar {

    position: relative;

    left: 5px;
    top: 3px;

    max-width: 28px;

    border-radius: 50%;

    filter: drop-shadow(0 0 3px var(--containerBg));

  }

  li {

    position: relative;

    top: 0;
    left: 0;

    max-width: 100%;
    min-width: 80px;

    padding: 1px 50px 1px 3px;
    height: auto;

    font-size: 16px;

    cursor: pointer;

    transition: all .25s;

    margin: 0 !important;

  }

  li:hover, li:focus {

    background-color: var(--textColor)

  }

  background-color: var(--containerBg);

  position: absolute;

  top: 0;
  left: 0;

  overflow-x: hidden;
  overflow-y: auto;

  margin: 35px 0 0 15px;
  padding: 0;

  min-width: 100px;
  max-width: 50%;
  width: auto;

  min-height: 20px;
  height: auto;
  max-height: 110px;

  border-radius: 15px 5px 5px 5px;

  box-shadow: 2px 2px 10px var(--scrollColor);

  transform: translateY(-10px);
  opacity: 0;

  transition: all .45s;

}

.inputer {

  position: relative;

  min-width: 100%;
  max-width: 100%;

  height: 100%;
  min-height: 100%;
  max-height: 100%;

  overflow-x: hidden;
  overflow-y: auto;

  background-color: var(--containerBg);

}

.ChatInputer-Page {

  position: relative;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;

  //overflow-x: hidden;
  //overflow-y: auto;

  --scrollColor: rgba(0, 0, 0, 0.3);
  --containerBg: #f5f6f7;
  --textColor: #e0dfdf;

  z-index: 10000;
  border-top: 1px solid var(--textColor);

}

::-webkit-scrollbar-thumb {

  background-color: var(--scrollColor);
  border-radius: 3px;

  transition: all .25s;

}
::-webkit-scrollbar-track {

  border-radius: 1px;
  width: 10px !important;
  background-color: var(--containerBg);

  transition: all .25s;

}

</style>

<!--纪念用-->
