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

        {

          path: '/contact/list',
          name: 'ContactListPage',
          component: require('@/views/list/ContactList').default,

          children: [

            {
              path: '/contact/friend/:qq',
              name: 'ContactFriendPage',
              component: require('@/views/list/FriendContact').default
            },

            {
              path: '/contact/group/:groupId',
              name: 'ContactGroupPage',
              component: require('@/views/list/GroupContact').default
            },

          ]

        }

      ]

    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
