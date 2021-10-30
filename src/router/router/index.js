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
      path: '/chat',
      name: 'ChatPage',
      component: require('@/views/chat/MainChat').default,

      children: [

        { path: '/friendChat/:id', name: 'FriendChatPage', component: require('@/views/chat/FriendChat').default },

      ]

    },

    {
      path: '*',
      redirect: '/login'
    }

  ]

})
