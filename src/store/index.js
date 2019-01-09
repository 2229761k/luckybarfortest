import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import getTokenBalance from '../util/getTokenBalance'
import { getContract, getToken, getChip } from '../util/getContract'

Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance (state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
      pollWeb3()
      getTokenBalance(result.coinbase)
    },
    pollWeb3Instance (state, payload) {
      console.log('pollWeb3Instance mutation being executed', payload)
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
      getTokenBalance(payload.coinbase)
    },
    refreshChipBalance (state, payload) {
      console.log('ChipBalance mutation being executed', payload)
      state.web3.chipBalance = payload
    },
    refreshTokaBalance (state, payload) {
      console.log('TokaBalance mutation being executed', payload)
      state.web3.tokaBalance = payload
    },
    registerContractInstance (state, payload) {
      console.log('Casino contract instance: ', payload)
      state.contractInstance = () => payload
    },
    registerTokenContractInstance (state, payload) {
      console.log('Token contract instance: ', payload)
      state.tokenInstance = () => payload
    },
    registerChipContractInstance (state, payload) {
      console.log('Chip contract instance: ', payload)
      state.chipInstance = () => payload
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    pollWeb3 ({commit}, payload) {
      console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload)
    },
    getChip ({commit}, payload) {
      console.log('getChip action being executed')
      store.state.chipInstance().balanceOf(payload.coinbase, (err, result) => {
        commit('refreshChipBalance', (result / 10 ** 18).toFixed(5))
      })
    },
    getToka ({commit}, payload) {
      console.log('getToka action being executed')
      store.state.tokenInstance().balanceOf(payload.coinbase, (err, result) => {
        commit('refreshTokaBalance', (result / 10 ** 18).toFixed(5))
      })
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
        commit('registerContractInstance', result)
      }).catch(e => console.log(e))
    },
    getChipContractInstance ({commit}) {
      getChip.then(result => {
        commit('registerChipContractInstance', result)
      }).catch(e => console.log(e))
    },
    getTokenContractInstance ({commit}) {
      getToken.then(result => {
        commit('registerTokenContractInstance', result)
      }).catch(e => console.log(e))
    }
  }
})
