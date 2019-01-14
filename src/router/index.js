import Vue from 'vue'
import Router from 'vue-router'
import CasinoDapp from '@/components/casino-dapp'
import CasinoComponent from '@/components/casino-component'
import Question from '@/components/Question'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'casino-dapp',
      component: CasinoDapp
    },

  ]
})
