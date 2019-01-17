import Vue from 'vue'
import Router from 'vue-router'
import CasinoDapp from '@/components/casino-dapp'
import CasinoDappMobile from '@/components/casino-dapp-mobile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'casino-dapp',
      component: CasinoDapp
    },
    {
      path: '/mobile',
      name: 'casino-dapp-mobile',
      component: CasinoDappMobile
    }
  ]
})
