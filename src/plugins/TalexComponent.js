// 自动注册组件
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default {

    install(app) {

        const requireComponents = require.context(

            './../components/talex',

            true,

            /[A-Z]\w+\.(vue)$/

        )

        requireComponents.keys().forEach(fileName => {

            const componentConfig = requireComponents(fileName)

            const componentName = upperFirst(camelCase(fileName.split('/').pop().replace(/\.\w+$/, '')))

            app.components(

                componentName,

                componentConfig.default || componentConfig

            )

            // console.log("已注册: " + fileName + " @" + componentName)

        })

    }

}
