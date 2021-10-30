'use strict';

import fs from 'fs'
import path from 'path'

class TEStorage {

    constructor() {

        this.localConfig = {

            config: null,
            configUrl: path.join(__dirname, './localConfig.json'),

        }

    }

    /**
     * 判断配置文件是否存在
     */
    isExit() {

        let success = true;

        if (!(this.localConfig.config && typeof this.localConfig.config === 'object')) {
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

                this.localConfig.config = JSON.parse(config);

                return true;

            }

            const defaultConfig = {};

            const content = JSON.stringify(defaultConfig);

            fs.writeFileSync(this.localConfig.configUrl, content);

            this.localConfig.config = defaultConfig;

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
    writeConfig(value) {

        try {

            const content = JSON.stringify(value);

            fs.writeFileSync(this.localConfig.configUrl, content);

            return true;

        } catch (e) {

            return false;

        }

    }

    setStoragePath(path) {

        this.localConfig.configUrl = path;

        return this

    }

    getStoragePath () {

        return this.localConfig.configUrl;

    }

    getItem(key) {

        const success = this.isExit();

        if (success) {

            const result = this.localConfig.config[key];

            return result || undefined;

        }

        return null;

    }

    get(key) {

        return this.getItem(key)

    }

    setItem(key, value) {

        let success = this.isExit();

        if (success) {

            const config = Object.assign({}, this.localConfig.config);

            config[key] = value;

            const suc = this.writeConfig(config);

            if (suc) {

                this.localConfig.config = config;

                return true;

            }

        }

        return false;

    }

    set(key, value) {

        return this.setItem(key, value)

    }

    getAll() {

        let success = this.isExit();

        if (success) {

            return this.localConfig.config;

        }

        return null;

    }

    removeItem(key) {

        const value = this.localConfig.getItem(key);

        if (value) {

            const config = Object.assign({}, this.localConfig.config);

            delete config[key];

            const suc = this.writeConfig(config);

            if (suc) {

                this.localConfig.config = config;

                return true;

            }

        }

        return false;

    }

    clear() {

        let success = this.isExit();

        if (success) {

            const suc = this.writeConfig({});

            if (suc) {
                this.localConfig.config = {};
                return true;
            }

        }

        return false;

    }

}

class DataStore {

    constructor() {

        this.init = (appPath) => {

            const targetPath = path.join(appPath, '/talextouchqq/')

            if(!fs.existsSync(targetPath)) {

                fs.mkdirSync(targetPath)
                fs.mkdirSync(targetPath + '/data')

            }

            this.global = new TEStorage()
            this.global.setStoragePath(targetPath + '/data/GlobalStorage.db')

        }

        this.path = path.resolve('.')

        this.init(this.path)

    }

    globalStorage() {

        return this.global

    }

    sessionStorage() {

        if( this.session ) return this.session

        const targetPath = path.join(this.path, '/talextouchqq/data/session/')

        if(!fs.existsSync(targetPath)) {

            fs.mkdirSync(targetPath)

        }

        this.session = {

            //群信息存储 如名称 成员
            group: new TEStorage().setStoragePath(targetPath + `/session/groupStorage.db`),

            //好友消息存储 如列表 记录
            friend: new TEStorage().setStoragePath(targetPath + `/session/friendStorage.db`),

            //用户个性设置存储
            user: new TEStorage().setStoragePath(targetPath + `/session/userStorage.db`),

        }

        return this.session

    }

    newStorage(qq) {

        const targetPath = path.join(this.path, '/talextouchqq/data/qq/')

        if(!fs.existsSync(targetPath)) {

            fs.mkdirSync(targetPath)
            fs.mkdirSync(targetPath + `/${qq}`)

        }

        return new TEStorage().setStoragePath(targetPath + `/${qq}/storage.db`)

    }

}

export default new DataStore()
