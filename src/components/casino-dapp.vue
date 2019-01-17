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
  methods: {
      isMobile() {
          if( screen.width <= 760 ) {
              return true;
          }
          else {
              return false;
          }
      }
  },
  created() {
      if (this.isMobile()) {
          this.$router.push('/mobile');
      }
      else {
          this.$router.push('/');
      }
  },
  components: {
    'Header': Header,
    'casino-component': CasinoComponent,
    'Question':Question,
    'Footer':Footer
  }
}
</script>
<style scoped>
</style>
