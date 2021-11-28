// 自动注册组件
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponents = require.context(

    './../components/talex',

    true,

    /[A-Z]\w+\.(vue)$/

)

requireComponents.keys().forEach(fileName => {

    const componentConfig = requireComponents(fileName)

    const componentName = upperFirst(camelCase(fileName.split('/').pop().replace(/\.\w+$/, '')))

    Vue.component(

        componentName,

        componentConfig.default || componentConfig

    )

})
