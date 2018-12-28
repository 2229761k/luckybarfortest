<template>
<div>
  <Header />
  <casino-component/>
  <Question />
  <Footer />
</div>
</template>
<script>
// import HelloMetamask from '@/components/hello-metamask'
import Header from '@/components/Header'
import CasinoComponent from '@/components/casino-component'
import Question from '@/components/Question'
import Footer from '@/components/Footer'

export default {
  name: 'casino-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from casino-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    // 'hello-metamask': HelloMetamask,
    'Header': Header,
    'casino-component': CasinoComponent,
    'Question':Question,
    'Footer':Footer

  }
}
</script>
<style scoped>
</style>
