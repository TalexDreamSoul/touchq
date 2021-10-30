import {App} from "koishi";

import TouchQ from './../TouchQ'

class TouchStorage {

    // @ts-ignore
    private $touchq: TouchQ;
    private readonly $app: App;

    private listener = { friend: null };

    constructor(touchq) {

        this.$touchq = touchq
        this.$app = touchq.$app

    }

    connect() {

        // @ts-ignore
        this.listener.friend = new FriendProcessStorage().listen(this.$app)

    }

}

// @ts-ignore
class FriendProcessStorage extends BaseProcessStorage {

    constructor(touchq) {

        super(touchq, 'message/friend');

    }

    processEvent = event => {

        console.log(event)

    };

    onEvent = (event, func) => {

    };

    onSelect = (event, func) => {



    };

}

class BaseProcessStorage {

    protected event = null

    protected messageAsideList = []
    protected messageList = []

    protected select = {

        messageNowS: [],
        messageSession: null,

    }

    private readonly eventName: String;
    // @ts-ignore
    private touchq: TouchQ;

    /**
     *
     * 采取监听
     *
     * @param app 参数
     * @type {function(App): BaseProcessStorage}
     */
    listen(app) {

        this.event = app.on(this.eventName, data => {

            this.processEvent(data)

        });

        app.on('before-disconnect', data => {

            app.off(this.eventName, this.event)

        })

        return this;

    }

    /**
     *
     * 处理事件
     *
     * @type {function(Event): void}
     */
    processEvent: (event: Event) => void;

    /**
     *
     * 当收到消息时
     *
     * @param event 选中事件
     * @param func 回调参数
     */
    onEvent: (event: Event, func: Function) => void;

    /**
     *
     * 当处理器被选中时
     *
     * @param event 选中事件
     * @param func 回调参数
     */
    onSelect: (event: Event, func: Function) => void;

    constructor(touchq, eventName) {

        this.touchq = touchq
        this.eventName = eventName

    }

}

export default TouchStorage
