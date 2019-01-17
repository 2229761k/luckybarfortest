
import {store} from '../store/'

let getTokenBalance = function (_coinbase) {
  store.dispatch('getChip', {
    coinbase: _coinbase
  })
  store.dispatch('getToka', {
    coinbase: _coinbase
  })
}

let getRecords = function () {
  store.dispatch('getRecord')
}

export { getRecords, getTokenBalance }
