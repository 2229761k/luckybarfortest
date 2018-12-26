<template>
<div>
  <Header />
  <casino-component/>
 <br><br><br><br>
 <Question />
</div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import Header from '@/components/Header'
import CasinoComponent from '@/components/casino-component'
import Question from '@/components/Question'

export default {
  name: 'casino-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from casino-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'Header': Header,
    'casino-component': CasinoComponent,
    'Question':Question,

  }
}
</script>
<style scoped>
</style>
