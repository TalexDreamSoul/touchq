import Vue from 'vue'

import Element from 'element-ui'

import '../theme/GlobalElement.scss';

Vue.use(Element, { size: 'small', zIndex: 10000 })

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import './QIconFont'

Vue.use(VueViewer, {
    defaultOptions: {
        zIndex: 999999
    }
})

// 自动导入样式

import './../theme/GlobalElement.scss'
import './../theme/GlobalStyle.scss'
import './../theme/TFontIcon.css'

const requireStyles = require.context(

    './../theme',

    true,

    /[A-Z].(css|less|scss)$/

)

requireStyles.keys().forEach(fileName => {

    require(fileName)

})

