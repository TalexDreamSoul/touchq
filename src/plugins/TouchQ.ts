import TouchStorage from './storage/TouchStorage'
import {TouchQStatus} from './enums/TouchQEnum'
import UserData from './classes/UserData'
import {dataStore} from "@/plugins/datastore";

import axios from 'axios'
import {App, Bot} from 'koishi'
import koishiPluginCommon from 'koishi-adapter-onebot'

// async processMessageChain(content, contact) {
//
//     const messageChain = segment.parse(content)
//
//     let finalContent = ''
//
//     for (const msg of messageChain) {
//
//         switch( msg.type ) {
//
//             case 'text': {
//
//                 finalContent += msg.data.content
//                 break;
//
//             }
//
//             case 'image': {
//
//                 finalContent += '[图片]'
//
//                 break;
//
//             }
//
//             case 'at': {
//
//                 let qq = msg.capture[2]
//
//                 qq = qq.substring(4, qq.length - 1)
//
//                 if(+qq === this.$touchq.$userData.$nowUser) {
//
//                     return (await this.$touchq.$bot.getSelf()).username
//
//                 }
//
//                 let {data: res} = await this.$touchq.axios.post("/get_group_member_info", { group_id: contact, user_id: qq})
//
//                 if(res.msg === 'MEMBER_NOT_FOUND' || res.msg === "GROUP_NOT_FOUND") {
//
//                     res = await this.$touchq.axios.post("/get_stranger_info", { user_id: qq })
//
//                 }
//
//                 finalContent += '@' + res.nickname
//
//                 break;
//
//             }
//
//         }
//
//     }
//
//     return finalContent
//
// },
//
// async receiveGroupMessage(data, type) {
//
//     const sender = data.sender
//     const groupId = data.groupId
//
//     const o = new Proxy({
//
//         type: 'group', //判断类型
//         id: groupId, //标注群
//         key: groupId + 'g',
//         img: "https://p.qlogo.cn/gh/" + groupId + "/" + groupId + "/100",
//         title: groupId,
//         latestContent: sender.nickname + ": ",
//         time: data.time,
//
//     }, {})
//
//     const info = this.$touchq.getGroupInfo(groupId).then(result => {
//
//         o.title = result.data.data.group_name
//
//     })
//
//     this.processMessageChain(data.content, groupId).then(result => {
//
//         o.latestContent = sender.nickname + ": " + result
//
//     })
//
//     this.chatList.set(groupId + 'g', o)
//
//     // refreshList
//     this.chatListArray = Array.from(this.chatList.values())
//
//     const obj = {
//
//         id: groupId,
//         key: groupId + 'g',
//         type,
//         target: {
//
//             name: sender.nickname,
//             image: data.author.avatar,
//
//             author: data.author,
//
//         },
//         content: data.content,
//         time: data.time,
//         msgId: data.messageId,
//         messageSeq: data.messageSeq,
//         async groupInfo() { return await info.data }
//
//     }
//
//     const map = this.chatMessageMap
//
//     let value = map.get(groupId + 'g')
//
//     if(!value) value = []
//
//     value.push(obj)
//
//     map.set(groupId + 'g', value)
//
// },
//
// async receiveFriendMessage(data, type) {
//
//     const author = data.author
//     const friendQQ = author.userId
//
//     //存储列表的消息
//     this.chatList.set(friendQQ + 'f', {
//
//         id: friendQQ,
//         key: friendQQ + 'f',
//         img: author.avatar,
//         title: author.username,
//         latestContent: await this.processMessageChain(data.content),
//         time: data.time,
//         type: 'friend',
//
//     })
//
//     // refreshList
//     this.chatListArray = Array.from(this.chatList.values())
//
//     //存储实际聊天的消息
//     const obj = {
//
//         id: friendQQ,
//         key: friendQQ + 'f',
//         type,
//         target: {
//
//             name: author.username,
//             image: author.avatar,
//
//         },
//         content: data.content,
//         time: data.time,
//         msgId: data.messageId,
//         messageSeq: data.messageSeq,
//
//     }
//
//     const map = this.chatMessageMap
//
//     let value = map.get(friendQQ + 'f')
//
//     if(!value) value = []
//
//     value.push(obj)
//
//     map.set(friendQQ + 'f', value)
//
// },

export class TouchQ {

    #touchqStatus: TouchQStatus = TouchQStatus.STOPPED
    #axios = axios

    $globalStorage = dataStore.globalStorage()
    $session = dataStore.sessionStorage()
    $globalData: any
    $userConfig = { user: '10000' }
    $systemConfig = { baseUrl: String }
    $app: any = undefined
    $bot: any = Bot
    $touchStorage = new TouchStorage(this)
    $userData: any = undefined

    #firstInner = false

    get isStarted() {

        return this.#touchqStatus === TouchQStatus.LOADED

    }
    get isFirstUse() { return this.#firstInner }

    constructor() {

        this.$globalData = this.$globalStorage.get("globalData")

        if(!this.$globalData) {

            this.$globalData = {

                userConfig: { user: '10000' },
                systemConfig: { baseUrl: "", keyCode: "" }

            }

        }


        this.$userConfig = new Proxy(this.$globalData.userConfig, {})


        this.$systemConfig = new Proxy(this.$globalData.systemConfig, {})


        if( !this.$systemConfig.baseUrl ) {

            this.#firstInner = true

        }

        console.log(this)

    }

    connect(qq: string, msg: any) {

        try {

            this.$app = new App({


                server: this.$systemConfig.baseUrl + '',
                // secret: this.systemConfig.keyCode,
                port: 6643,
                selfId: qq,
                type: 'onebot:http',
                nickname: 'tq',
                prefix: '/',
                onebot: {

                    path: '/touchq'

                },

            })

            this.$app.plugin(koishiPluginCommon)

            this.$app.start().then(async () => {

                //登录成功后存储用户的QQ

                this.$userConfig.user = qq + ''

                //初始化QQ数据
                this.$userData = new UserData({touchq: this, qq: qq})

                this.$bot = this.$app._bots[0]

                this.$touchStorage.connect()

                this.#axios.defaults.baseURL = this.$systemConfig.baseUrl + ''

                this.$bot.version_info = await this.$bot.$getVersionInfo()

                this.#firstInner = false

                msg ( {

                    access: true

                } )

            }).catch((err: any) => {

                console.error( err )

                msg ( {

                    access: false,
                    msg: err.message

                } )

            })

        } catch( err ) {

            console.error( err )

            msg( {

                access: false,
                msg: err.message

            } )

        }

    }

    getDarkMode() {


        return (this.$globalData && this.$globalData.darkMode) || false

    }

    setDarkMode(mode: boolean) {

        this.$globalData.darkMode = mode

    }

    async getClients() {

        const data = await this.#axios.post("/get_online_clients")

        return data.data.data

    }

    saveGlobalData() {

        this.$globalStorage.set("globalData", this.$globalData)

    }

    disconnect(chatListArray: Array<any>, chatMessageMap: Map<string, any>) {

        let data = (this.$userData && this.$userData.data)

        if(typeof data !== null) {

            data = {}

        }

        data.chatList = chatListArray
        data.chatMessages = Array.from(chatMessageMap)

        this.$userData.data = data

        this.$userData.saveData()

        this.$app && this.$app.stop() && this.saveGlobalData()

    }

    async getGroupInfo(group: number) {

        return this.#axios.post("/get_group_info", { group_id: group });

    }

}

const $touchq = new TouchQ()

export default $touchq
