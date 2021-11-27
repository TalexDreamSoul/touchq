import Vue from 'vue'

import DataStore from './datastore'
import axios from 'axios'
import Moment from "moment";

const { createClient } = require("oicq")

class UserData {

    constructor(who, touchq) {

        this.$nowUser = who
        this.$touchq = touchq

        this.friendMap = new Map()
        this.groupMap = new Map()

        this.privateEventMessages()
        this.groupEventMessages()

    }

    async getFriendList() {

        if( !this.friendListGotTime || new Date() - this.friendListGotTime > 300000 * 60 ) {

            await this.$touchq.client.reloadFriendList()

        }

        this.friendListGotTime = new Date()

        return this.$touchq.client.getFriendList()

    }

    async getGroupList() {

        if( !this.groupListGotTime || new Date() - this.groupListGotTime > 300000 * 60 ) {

            await this.$touchq.client.reloadGroupList()

        }

        this.groupListGotTime = new Date()

        return this.$touchq.client.getGroupList()

    }

    onChatListEvent(func) {

        this.chatListEventFunc = func

    }

    selectChats() {



    }

    //Group

    groupEventMessages() {

        this.$touchq.client.on('message.discuss', (e) => {

            this.processGroupDiscussMsg(e)

        })

        this.$touchq.client.on('message.group', (e) => {

            this.processGroupsMsg(e)

        })

        this.$touchq.client.on('message.group.anonymous', (e) => {

            this.processAnonymousGroupsMsg(e)

        })

        this.$touchq.client.on('message.group.normal', (e) => {

            this.processNormalGroupMsg(e)

        })

    }

    processGroupDiscussMsg(e) {

        console.log("讨论组", e)

    }

    processGroupsMsg(e) {



    }

    processAnonymousGroupsMsg(e) {



    }

    processNormalGroupMsg(e) {

        const obj = {

            type: e.message_type,
            subType: e.sub_type,

            msgId: e.message_id,
            seq: e.seq,

            message: e.message,
            content: e.raw_message,

            sender: e.sender,
            group: {

                type: 'normal',
                groupId: e.group_id,
                groupName: e.group_name,
                block: e.block,
                anonymous: e.anonymous,
                '@me': e.atme,
                '@all': e.atall,
              ...e.group

            },

            time: e.time,
            auto_reply: e.auto_reply

        }

        this.friendMap.set(e.message_id, obj)

        this.chatListEventFunc(obj)

        console.log(e)

    }

    //Private

    privateEventMessages() {

        this.$touchq.client.on('message.private.friend', (e) => {

            this.processPrivateFriendMsg(e)

        })

        this.$touchq.client.on('message.private.group', (e) => {

            this.processPrivateGroupMsg(e)

        })

        this.$touchq.client.on('message.private.other', (e) => {

            this.processPrivateOtherMsg(e)

        })

        this.$touchq.client.on('message.private.self', (e) => {

            this.processPrivateSelfDeviceMsg(e)

        })

    }

    processPrivateFriendMsg(e) {

        const obj = {

            msgId: e.message_id,
            time: e.time,
            seq: e.seq,
            message: e.message,
            content: e.raw_message,
            type: e.message_type,
            subType: e.sub_type,
            sender: e.sender,
            auto_reply: e.auto_reply

        }

        this.friendMap.set(e.message_id, obj)

        this.chatListEventFunc(obj)

    }

    // 我的其他设备消息
    processPrivateSelfDeviceMsg(e) {

        const obj = {

            msgId: e.message_id,
            time: e.time,
            seq: e.seq,
            message: e.message,
            content: e.raw_message,
            type: e.message_type,
            subType: e.sub_type,
            sender: e.sender,
            auto_reply: e.auto_reply

        }

        this.friendMap.set(e.message_id, obj)

        this.chatListEventFunc(obj)

    }

    // 群临时会话消息
    processPrivateGroupMsg(e) {

        console.log("tempGroupPrivate", e)

    }

    processPrivateOtherMsg(e) {

        console.log('privateOther', e)

    }

}

class TouchQ {

    constructor() {

        this.$vue = this.__proto__.$vue
        this.$db = this.__proto__.$db

        this.axios = axios

        console.log(this)

    }

    loginSuccess() {

        this.$userData = new UserData(this.client.uin, this)

    }

    submitSlider() {

        this.client.submitSlider()

    }

    loginProcess(msgFunc) {

        this.client

            .on("internal.online", (e) => {

                this.loginSuccess()

                msgFunc(true)

            })

            .on('internal.error.network', (code, msg) => console.warn(code, msg))

            .on('system.login.error', (e) => {

                if(e.code === 237)
                    msgFunc(false, { type: 'error', message: e.message })

                if(e.code === 1)
                    msgFunc(false, { type: 'error', message: e.message })

                console.warn(e)

            })

            .on('internal.error.qrcode', (code, msg) => {

                if(code === 0) {

                    msgFunc(false, { type: 'error', message: msg })

                }

                console.log("QRCODE-ERROR", code, msg)

            })

            .on('system.login.device', (e) => {

                msgFunc(false, { type: 'device', e })

            })

            .on('system.login.slider', (e) => {

                msgFunc(false, { type: 'slider', e })

            })

            // .on('internal.verbose', (e) => console.log(e))

    }

    async submitQrCodeLogin() {

        await this.client.qrcodeLogin()

    }

    loginWithCode(number, qrCodeReturn, msgFunc) {

        this.client = createClient(number, this.getLoginConfig())
            .on("system.login.qrcode", function (e) {

            function toBase64(arr) {
                //arr = new Uint8Array(arr) if it's an ArrayBuffer
                return btoa(
                    arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
            }

            qrCodeReturn(`data:image/png;base64,${toBase64( e.image)}`)

        })

        this.loginProcess(msgFunc)

        this.client.login()

    }

    async login(account, password, msgFunc) {

        const client = createClient(account, this.getLoginConfig())

        this.client = client

        this.loginProcess(msgFunc)

        client.login(password)

    }

    sendSmsVerifyCode(phoneNumber) {

        const client = createClient(phoneNumber)

        this.client = client

        client.sendSmsCode()

    }

    getLoginConfig() {

        return {

            platform: 5,
            /** 群聊过滤自己的消息(默认true) */
            ignore_self: false,

        }

    }

}

TouchQ.prototype.$Vue = Vue
TouchQ.prototype.$vue = Vue.prototype

TouchQ.prototype.$db = DataStore
TouchQ.prototype.$axios = axios

export default new TouchQ()
