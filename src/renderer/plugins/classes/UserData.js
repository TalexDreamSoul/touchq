import DataStore from "../datastore";

class UserData {

    constructor(touchq, qq) {

        this.$touchq = touchq
        this.$nowUser = qq
        this.$storage = DataStore.newStorage(qq)

        this.data = this.$storage.get('data')

    }

    saveData() {

        this.$storage.set('data', this.data)

    }

}

export default UserData
