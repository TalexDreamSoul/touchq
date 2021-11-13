import Vue from 'vue'

import Element from 'element-ui'

import '../theme/GlobalElement.scss';

Vue.use(Element, { size: 'small', zIndex: 10000 })

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import './QIconFont'
import '../theme/TFontIcon.css'

Vue.use(VueViewer, {
    defaultOptions: {
        zIndex: 999999
    }
})
