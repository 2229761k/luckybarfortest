<template>
        <div>
            <ul >
              <li>
                <p v-if="isInjected" id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Metamask Connected</p>
                <p v-else id="no-metamask"><i aria-hidden="true" class="fa fa-times"></i> Metamask Connection failed</p>
                <!-- <p class="metainfo">Network: {{ network }}</p> -->
                <p class="metainfo">Account: {{ coinbase }}</p>
                <p class="metainfo">Balance: {{ ethBalance }} Eth</p>
              </li>
            </ul>
        </div>


</template>

<script>
import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'
export default {
  name: 'hello-metamask',
  computed: mapState({
    isInjected: state => state.web3.isInjected,
    network: state => NETWORKS[state.web3.networkId],
    coinbase: state => state.web3.coinbase,
    balance: state => state.web3.balance,
    ethBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
    }
  })
}
</script>

<style scoped>
.metainfo{
  color: white;
  font-size: 0.7rem;
  height: 1px;
}
.metamask-info {
  text-align:center;
}
#has-metamask {
  color: green;
}
#no-metamask {
  color:red;
}</style>
