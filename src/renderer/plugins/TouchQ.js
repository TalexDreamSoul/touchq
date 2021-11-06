
import Vue from 'vue'

import DataStore from './datastore'
import axios from 'axios'

import { App, Bot } from 'koishi'

import 'koishi-adapter-onebot'

class UserData {

    constructor(touchq, qq) {

        this.$touchq = touchq
        this.$nowUser = qq

        const mainDb = this.$mainDb = touchq.$db.main

        const instance = this

        mainDb.find({ qq } , function(err, docs) {

            if(docs.length === 0) {

                mainDb.insert( { qq } , function(err, doc) {

                    console.log("@Insert: ", doc)

                  instance.data = doc

                })

                return

            }

            if(docs.length > 1) {

                docs.forEach(function(doc, index) {

                    if( index === 0 ) return

                    mainDb.remove(doc)

                })

            }

            instance.data = docs[0]

        })

    }

    saveData() {

        const instance = this

        if(!(this.data && this.data._id)) {

            this.$mainDb.insert( { qq: this.$nowUser, data: this.data }, function(err, doc) {

            })

        } else {

            this.$mainDb.update( { _id: this.data._id }, { $set: this.data }, function(err, doc) {

            })

        }

    }

}

class TouchQ {

    constructor() {

        this.$vue = this.__proto__.$vue
        this.$db = this.__proto__.$db

        this.installSystem();
        this.installUser()

        this.touchq_loaded = true
        this.session = undefined
        this.axios = axios

        this.userConfig = { user: '10000' }
        this.systemConfig = { baseUrl: "", keyCode: "" }

        this.setTheme = (dark) => {

            instance.theme = dark

            const otherDb = this.$db.other
            const instance = this

            otherDb.update( {"_id": this.theme._id},
                { $set: this.theme } , function(err, docs) {

                    instance.theme = docs[0]

                    if(docs.length > 1) {

                        docs.forEach(function(doc, index) {

                            otherDb.remove(doc)

                        })

                        otherDb.insert(instance.theme)

                    }

            })

        }

        this.connect = (qq, msg) => {

            try {

                this.$app = new App({

                    server: this.systemConfig.baseUrl,
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

                this.$app.plugin(require('koishi-plugin-common'))

                this.$app.start().then(async () => {

                    //登录成功后存储用户的QQ

                    const userDb = this.$db.user

                    userDb.update({"_id": this.userConfig._id},
                        { $set: { user: qq } }, function(err, doc) {

                        })

                    this.$userData = new UserData(this, qq)

                    this.$bot = this.$app._bots[0]

                    this.axios.defaults.baseURL = this.systemConfig.baseUrl

                    this.$bot.version_info = await this.$bot.$getVersionInfo()

                    msg ( {

                        access: true

                    } )

                }).catch(err => {

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

        console.log(this)

    }

    async getClients() {

        const data = await this.axios.post("/get_online_clients")

        return data.data.data

    }

    installSystem() {

        const instance = this

        const systemDb = this.$db.system

        systemDb.find({ } , function(err, docs) {

            if(docs.length === 0) {

                systemDb.insert({ baseUrl: "", keyCode: "" })

                instance.firstInner = true

                return

            }

            if(docs.length > 1) {

                const first = docs[0]

                docs.forEach(function(doc, index) {

                    systemDb.remove(doc)

                })

                systemDb.insert(first)

            }

            if(docs[0]) instance.systemConfig = docs[0]

            instance.$axios.defaults.baseURL = instance.systemConfig.baseUrl

        })

    }

    installUser() {

        const systemDb = this.$db.user

        if(this.firstInner) {

            return

        }

        const instance = this

        systemDb.find({  } , function(err, docs) {

            if(docs.length === 0) {

                return

            }

            if(docs.length > 1) {

                const first = docs[0]

                docs.forEach(function(doc, index) {

                    systemDb.remove(doc)

                })

                systemDb.insert(first)

            }

            if(docs[0].user === undefined) {

                return

            }

            instance.userConfig = docs[0]

        })

    }

}

TouchQ.prototype.$Vue = Vue
TouchQ.prototype.$vue = Vue.prototype

TouchQ.prototype.$db = DataStore
TouchQ.prototype.$axios = axios

export default new TouchQ()
