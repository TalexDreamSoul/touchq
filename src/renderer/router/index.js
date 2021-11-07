import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: require('@/views/Login').default
    },
    {
      path: '/chat_bar',
      name: 'ChatBarPage',
      component: require('@/views/chat/ChatBarRouter').default,

      children: [

        {
          path: '/chat',
          name: 'ChatPage',
          component: require('@/views/chat/MainChat').default
        },

      ]

    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})