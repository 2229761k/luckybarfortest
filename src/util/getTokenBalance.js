
import {store} from '../store/'

let getTokenBalance = function (_coinbase) {
  store.dispatch('getChip', {
    coinbase: _coinbase
  })
  store.dispatch('getToka', {
    coinbase: _coinbase
  })
}

export default getTokenBalance
