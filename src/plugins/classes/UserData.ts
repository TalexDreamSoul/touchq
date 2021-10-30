import { dataStore, TEStorage } from "./../datastore";
import { TouchQ } from "@/plugins/TouchQ";

class UserData {

    private $touchq: TouchQ;
    private $nowUser: number|string;
    private $storage: TEStorage;
    private readonly data: any;

    constructor({touchq, qq}: { touchq: TouchQ, qq: number | string }) {

        this.$touchq = touchq
        this.$nowUser = qq
        this.$storage = dataStore.newStorage(qq)

        this.data = this.$storage.get('data')

    }

    saveData() {

        this.$storage.set('data', this.data)

    }

}

export default UserData
