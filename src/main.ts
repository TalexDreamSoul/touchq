import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// import './plugins/origin/OriginIndex'

//基于 ElementUI 先引入 ElementUI
import ElementPlus from 'element-plus'
import './theme/GlobalElement.scss'
import TalexComponent from './plugins/TalexComponent.js'

import './plugins/TouchQ'

const app = createApp(App).use(store).use(router)
    .use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')

TalexComponent.install(app)
