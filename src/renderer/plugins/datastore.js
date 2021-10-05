import Datastore from 'nedb'
import path from 'path'

class DataStore {

    constructor() {

        this.init = (appPath) => {

            this.system = new Datastore({

                autoload: true,
                filename: path.join(appPath, '/talextouchqq/system.db')

            })

            this.user = new Datastore({

                autoload: true,
                filename: path.join(appPath, '/talextouchqq/user.db')

            })

            this.other = new Datastore({

                autoload: true,
                filename: path.join(appPath, '/talextouchqq/other.db')

            })

            this.main = new Datastore({

                autoload: true,
                filename: path.join(appPath, '/talextouchqq/main.db')

            })

        }

        this.init(path.resolve('.'))

    }

}

export default new DataStore()
