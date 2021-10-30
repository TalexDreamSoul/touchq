'use strict';

import fs from 'fs'
import path from 'path'

export class TEStorage {

    private localConfig = {

        config: <null|Map<string, any>>null,
        configUrl: path.join(__dirname, './localConfig.json'),

    }

    /**
     * 判断配置文件是否存在
     */
    isExit() {

        let success = true;

        if ( this.localConfig.config === null ) {

            success = this.initConfig();

        }

        return success;

    }

    /**
     * 初始化config
     */
    initConfig() {

        try {

            const config = this.readConfig();

            if (config) {

                this.localConfig.config = JSON.parse(String(config));

                return true;

            }

            const defaultConfig = new Map();

            const content = JSON.stringify(defaultConfig);

            fs.writeFileSync(this.localConfig.configUrl, content);

            this.localConfig.config = defaultConfig

            return true;

        } catch (e) {

            return false;

        }

    }

    /**
     * 读取文件
     */
    readConfig() {

        try {

            return fs.readFileSync(this.localConfig.configUrl);

        } catch (error) {

            return false;

        }

    }

    /**
     * 写入文件
     */
    writeConfig(value: any) {

        try {

            const content = JSON.stringify(value);

            fs.writeFileSync(this.localConfig.configUrl, content);

            return true;

        } catch (e) {

            return false;

        }

    }

    setStoragePath(path: string) {

        this.localConfig.configUrl = path;

        return this

    }

    getStoragePath () {

        return this.localConfig.configUrl;

    }

    getItem(key: string) {

        if (this.isExit()) {

            const res = this.localConfig.config

            return res?.get(key) || undefined;

        }

        return null;

    }

    get(key: string) {

        return this.getItem(key)

    }

    setItem(key: string, value: any) {

        if (this.isExit()) {

            const config = Object.assign({}, this.localConfig.config);

            config?.set(key, value);

            const suc = this.writeConfig(config);

            if (suc) {

                this.localConfig.config = config;

                return true;

            }

        }

        return false;

    }

    set(key: any, value: any) {

        return this.setItem(key, value)

    }

    getAll() {

        return this.isExit() ? this.localConfig.config : null;

    }

    removeItem(key: any) {

        const value = this.getItem(key);

        if (value) {

            const config = Object.assign({}, this.localConfig.config);

            config.delete(key);

            const suc = this.writeConfig(config);

            if (suc) {

                this.localConfig.config = config;

                return true;

            }

        }

        return false;

    }

    clear() {

        if (this.isExit()) {

            const suc = this.writeConfig({});

            if (suc) {

                this.localConfig.config?.clear()

                return true;

            }

        }

        return false;

    }

}

export class DataStore {

    #path = path.resolve('.')
    #global = new TEStorage()

    #session = {}

    constructor() {

        const targetPath = path.join(this.#path, '/talextouchqq/')

        if(!fs.existsSync(targetPath)) {

            fs.mkdirSync(targetPath)
            fs.mkdirSync(targetPath + '/data')

        }

        this.#global.setStoragePath(targetPath + '/data/GlobalStorage.db')

    }

    globalStorage() {

        return this.#global

    }

    sessionStorage() {

        if( this.#session ) return this.#session

        const targetPath = path.join(this.#path, '/talextouchqq/data/session/')

        if(!fs.existsSync(targetPath)) {

            fs.mkdirSync(targetPath)

        }


        this.#session = {

            //群信息存储 如名称 成员
            group: new TEStorage().setStoragePath(targetPath + `/session/groupStorage.db`),

            //好友消息存储 如列表 记录
            friend: new TEStorage().setStoragePath(targetPath + `/session/friendStorage.db`),

            //用户个性设置存储
            user: new TEStorage().setStoragePath(targetPath + `/session/userStorage.db`),

        }

        return this.#session

    }

    newStorage(qq: number|string) {

        const targetPath = path.join(this.#path, '/talextouchqq/data/qq/')

        if(!fs.existsSync(targetPath)) {

            fs.mkdirSync(targetPath)
            fs.mkdirSync(targetPath + `/${qq}`)

        }

        return new TEStorage().setStoragePath(targetPath + `/${qq}/storage.db`)

    }

}

export const dataStore = new DataStore()
