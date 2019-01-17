import Web3EthAbi from 'web3-eth-abi'
import Web3Utils from 'web3-utils'
import Sci2Dec from 'scientific-to-decimal'
import axios from 'axios'

let state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    tokaBalance: null,
    chipBalance: null,
    latest: [],
    ranking: [],
    error: null
  },
  
  functions: {
    playE2E: function (window) {
      console.log('AMOUNT', window.amount)
      window.winEvent = null
      window.pending = true
      window.$store.state.contractInstance().playE2E({
        gas: 600000,
        value: window.$store.state.web3.web3Instance().toWei(window.amount, 'ether'),
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
          setTimeout("location.reload()", 6000)

        } else {
          let Won = window.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              window.winEvent = result.args
              window.winEvent._rewardType = result.args._rewardType
              window.winEvent._amount = result.args._amount / (10 ** 18)
              window.pending = false
              window.$store.dispatch('getRecord')
              setTimeout("location.reload()", 6000)
              //axios.get('http://218.39.141.11:3000/save/' + 'e2e/' + new Date().toISOString().slice(0,10) + '/' + window.winEvent._amount + '/' + window.$store.state.web3.coinbase)
            }
          })
        }
      })
    },
    playE2C: function (window) {
      console.log('AMOUNT', window.amount)
      window.winEvent = null
      window.pending = true
      window.$store.state.contractInstance().playE2C({
        gas: 600000,
        value: window.$store.state.web3.web3Instance().toWei(window.amount, 'ether'),
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
          setTimeout("location.reload()", 6000)

        } else {
          let Won = window.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              window.winEvent = result.args
              window.winEvent._rewardType = result.args._rewardType
              window.winEvent._amount = result.args._amount / (10 ** 18)
              window.pending = false
              window.$store.dispatch('getRecord')
              setTimeout("location.reload()", 6000)
              //axios.get('http://218.39.141.11:3000/save/' + 'e2c/' + new Date().toISOString().slice(0,10) + '/' + window.winEvent._amount + '/' + window.$store.state.web3.coinbase)

            }
          })
        }
      })
    },
    playC2E: function (window) {
      let funcEncoded = Web3EthAbi.encodeFunctionCall({
        name: 'playC2E',
        type: 'function',
        inputs: [{
          type: 'address',
          name: '_from'
        }, {
          type: 'uint256',
          name: '_value'
        }]
      }, [window.$store.state.web3.coinbase, Web3Utils.toHex(Sci2Dec(window.amount * (10 ** 18)))])

      console.log('ACCOUNT: ', window.$store.state.web3.coinbase)
      console.log('funcEncoded:', funcEncoded)

      window.winEvent = null
      window.pending = true
      window.$store.state.chipInstance().approveAndCall(window.$store.state.contractInstance().address, Web3Utils.toHex(Sci2Dec(window.amount * (10 ** 18))), funcEncoded, {
        gas: 600000,
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
          setTimeout("location.reload()", 6000)

        } else {
          let Won = window.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              window.winEvent = result.args
              window.winEvent._rewardType = result.args._rewardType
              window.winEvent._amount = result.args._amount / (10 ** 18)
              window.pending = false
              window.$store.dispatch('getRecord')
              setTimeout("location.reload()", 6000)
              //axios.get('http://218.39.141.11:3000/save/' + 'c2e/' + new Date().toISOString().slice(0,10) + '/' + window.winEvent._amount + '/' + window.$store.state.web3.coinbase)

            }
          })
        }
      })
    },
    playC2C: function (window) {
      let funcEncoded = Web3EthAbi.encodeFunctionCall({
        name: 'playC2C',
        type: 'function',
        inputs: [{
          type: 'address',
          name: '_from'
        }, {
          type: 'uint256',
          name: '_value'
        }]
      }, [window.$store.state.web3.coinbase, Web3Utils.toHex(Sci2Dec(window.amount * (10 ** 18)))])

      console.log('ACCOUNT: ', window.$store.state.web3.coinbase)
      console.log('funcEncoded:', funcEncoded)

      window.winEvent = null
      window.pending = true
      window.$store.state.chipInstance().approveAndCall(window.$store.state.contractInstance().address, Web3Utils.toHex(Sci2Dec(window.amount * (10 ** 18))), funcEncoded, {
        gas: 600000,
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
          setTimeout("location.reload()", 6000)

        } else {
          let Won = window.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              window.winEvent = result.args
              window.winEvent._rewardType = result.args._rewardType
              window.winEvent._amount = result.args._amount / (10 ** 18)
              window.pending = false
              window.$store.dispatch('getRecord')
              setTimeout("location.reload()", 6000)
              //axios.get('http://218.39.141.11:3000/save/' + 'c2c/' + new Date().toISOString().slice(0,10) + '/' + window.winEvent._amount + '/' + window.$store.state.web3.coinbase)
            }
          })
        }
      })
    },
    swapC2T: function (window) {
      console.log('Number: ', Sci2Dec(window.amount * (10 ** 18)))

      let funcEncoded = Web3EthAbi.encodeFunctionCall({
        name: 'swapC2T',
        type: 'function',
        inputs: [{
          type: 'address',
          name: '_from'
        }, {
          type: 'uint256',
          name: '_value'
        }]
      }, [window.$store.state.web3.coinbase, Web3Utils.toHex(Sci2Dec(window.amount * (10 ** 18)))])

      console.log('funcEncoded:', funcEncoded)

      window.winEvent = null
      window.pending = true
      window.$store.state.chipInstance().approveAndCall(window.$store.state.contractInstance().address, Web3Utils.toHex(Sci2Dec(window.amount * (10 ** 18))), funcEncoded, {
        gas: 300000,
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
          setTimeout("location.reload()", 6000)

        } else {
          let Swapped = window.$store.state.contractInstance().Swapped()
          Swapped.watch((err, result) => {
            if (err) {
              console.log('could not get event Swapped()')
            } else {
              window.swapEvent = result.args
              window.swapEvent._amount = result.args._amount / (10 ** 18)
              window.swapEvent._target = result.args._target
              window.pending = false
              setTimeout("location.reload()", 6000)
            }
          })
        }
      })
    },
    swapT2C: function (window) {
      console.log('AMOUNT', window.amount)
      window.winEvent = null
      window.pending = true
      window.$store.state.tokenInstance().approve(window.$store.state.contractInstance().address, window.amount * (10 ** 18), {
        gas: 300000,
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
          setTimeout("location.reload()", 6000)

        } else {
          let Approval = window.$store.state.tokenInstance().Approval()
          Approval.watch((err, result) => {
            if (err) {
              console.log('could not get event Approval()')
            } else {

              window.$store.state.contractInstance().swapT2C(window.$store.state.web3.coinbase, result.args.value, {
                gas: 300000,
                from: window.$store.state.web3.coinbase
              }, (err, result) => {
                if (err) {
                  console.log(err)
                  window.pending = false
                  setTimeout("location.reload()", 6000)
                } else {
                  let Swapped = window.$store.state.contractInstance().Swapped()
                  Swapped.watch((err, result) => {
                    if (err) {
                      console.log('could not get event Swapped()')
                    } else {
                      window.swapEvent = result.args
                      window.swapEvent._amount = result.args._amount / (10 ** 18)
                      window.swapEvent._target = result.args._target
                      window.pending = false
                      setTimeout("location.reload()", 6000)
                    }
                  })
                }
              })
            }
          })
        }
      })
    }

  },
  contractInstance: null,
  tokenInstance: null,
  chipInstance: null
}

export default state
