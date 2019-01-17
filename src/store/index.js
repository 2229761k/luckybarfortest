import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import { getRecords, getTokenBalance } from '../util/getTokenBalance'
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
    refreshRecords (state, payload) {
      console.log('Records being updated: ', payload)

      var types = ["e2e","e2c","c2e","c2c"]

      for (const type of types) {
        state.web3.latest[type] = []
        state.web3.ranking[type] = []

        for(var i=0; i<5; i++){
          state.web3.ranking[type][i] = []
          state.web3.ranking[type][i]['Date'] = payload[type][0][i] == 0 ? "" : new Date(Number(payload[type][0][i] * 1000)).toISOString().slice(0,10)
          state.web3.ranking[type][i]['Amount'] = payload[type][1][i] == 0 ? "" : parseFloat(payload[type][1][i] / 10 ** 18).toFixed(2)
          state.web3.ranking[type][i]['Address'] = payload[type][2][i] == "0x0000000000000000000000000000000000000000" ? "" : payload[type][2][i].toString().slice(0,5) + '***'

          state.web3.latest[type][i] = []
          state.web3.latest[type][i]['Date'] = payload[type][3][i] == 0 ? "" : new Date(Number(payload[type][3][i] * 1000)).toISOString().slice(0,10)
          state.web3.latest[type][i]['Amount'] = payload[type][4][i] == 0 ? "" : parseFloat(payload[type][4][i] / 10 ** 18).toFixed(2)
          state.web3.latest[type][i]['Address'] = payload[type][5][i] == "0x0000000000000000000000000000000000000000" ? "" : payload[type][5][i].toString().slice(0,5) + '***'
        }
      }
    },
    registerContractInstance (state, payload) {
      console.log('Casino contract instance: ', payload)
      state.contractInstance = () => payload
      getRecords()
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
    getRecord ({commit}) {
      console.log('getRecord action being executed')
      var tmp = []
      store.state.contractInstance().getRecordsE2E((err, result) => {
        tmp['e2e'] = result
        store.state.contractInstance().getRecordsC2E((err, result) => {
          tmp['c2e'] = result
          store.state.contractInstance().getRecordsE2C((err, result) => {
            tmp['e2c'] = result
            store.state.contractInstance().getRecordsC2C((err, result) => {
              tmp['c2c'] = result
              commit('refreshRecords', tmp)
            })
          })
        })
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
