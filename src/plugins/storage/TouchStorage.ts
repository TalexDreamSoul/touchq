import {App, EventMap} from "koishi";

import {TouchQ} from '../TouchQ'

export class BaseProcessStorage {

    protected event: any = null
    private readonly eventName: keyof EventMap | string;

    protected messageAsideList = []
    protected messageList = []

    protected select = {

        messageNowS: [],
        messageSession: null,

    }

    private touchq: TouchQ;

    /**
     *
     * 采取监听
     *
     * @param app 参数
     * @type {function(App): BaseProcessStorage}
     */
    listen(app: App) {

        this.event = app.on(<keyof EventMap>this.eventName, (data: any) => {

            this.processEvent(data)

        });

        const a = () => { app.off(<keyof EventMap>this.eventName, this.event) }

        app.on('before-disconnect', () => {

            a()

        })

        return this;

    }

    /**
     *
     * 处理事件
     *
     * @type {function(Event): void}
     */
    processEvent(event: any) {

        event.toString()

    }

    /**
     *
     * 当收到消息时
     *
     * @param event 选中事件
     * @param func 回调参数
     */
    onEvent(event: any, func: any) { event.toString() }

    /**
     *
     * 当处理器被选中时
     *
     * @param event 选中事件
     * @param func 回调参数
     */
    onSelect(event: any, func: any) { event.toString() }

    constructor(touchq: TouchQ, eventName:keyof EventMap | string) {

        this.touchq = touchq
        this.eventName = eventName

    }

}

class TouchStorage {


    private $touchq: TouchQ;
    private readonly $app: App;

    #friend: any

    constructor(touchq: TouchQ) {

        this.$touchq = touchq
        this.$app = touchq.$app

    }

    connect() {

        this.#friend = new FriendProcessStorage(this.$touchq).listen(this.$app)

    }

}

class FriendProcessStorage extends BaseProcessStorage {

    constructor(touchq: TouchQ) {

        super(touchq, 'message/friend');

    }

}

export default TouchStorage
