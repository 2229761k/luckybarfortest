import Web3EthAbi from 'web3-eth-abi'

let state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  
  functions: {
    playE2E: function (window) {
      console.log('AMOUNT', window.amount)
      window.winEvent = null
      window.pending = true
      window.$store.state.contractInstance().playE2E({
        gas: 300000,
        value: window.$store.state.web3.web3Instance().toWei(window.amount, 'ether'),
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
          setTimeout("location.reload()", 6000);

        } else {
          let Won = window.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              window.winEvent = result.args
              window.winEvent._rewardType = result.args._rewardType
              window.winEvent._amount = parseInt(result.args._amount, 10)
              window.pending = false
              setTimeout("location.reload()", 6000);
            }
          })
        }
      })
    },
    playE2R: function (window) {
      console.log('AMOUNT', window.amount)
      window.winEvent = null
      window.pending = true
      window.$store.state.contractInstance().playE2R({
        gas: 300000,
        value: window.$store.state.web3.web3Instance().toWei(window.amount, 'ether'),
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
          setTimeout("location.reload()", 6000);

        } else {
          let Won = window.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              window.winEvent = result.args
              window.winEvent._rewardType = result.args._rewardType
              window.winEvent._amount = parseInt(result.args._amount, 10)
              window.pending = false
              setTimeout("location.reload()", 6000);
         
            }
          })
        }
      })
    },
    playR2E: function (window) {
      let funcEncoded = Web3EthAbi.encodeFunctionCall({
        name: 'playR2E',
        type: 'function',
        inputs: [{
          type: 'address',
          name: '_from'
        }, {
          type: 'uint256',
          name: '_value'
        }]
      }, [window.$store.state.web3.coinbase, (window.amount * (10 ** 18)).toString()])

      console.log('ACCOUNT: ', window.$store.state.web3.coinbase)
      console.log('funcEncoded:', funcEncoded)

      window.winEvent = null
      window.pending = true
      window.$store.state.chipInstance().approveAndCall(window.$store.state.contractInstance().address, window.amount * (10 ** 18), funcEncoded, {
        gas: 300000,
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
        } else {
          let Won = window.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              window.winEvent = result.args
              window.winEvent._rewardType = result.args._rewardType
              window.winEvent._amount = parseInt(result.args._amount, 10)
              window.pending = false
            }
          })
        }
      })
    },
    playR2R: function (window) {
      let funcEncoded = Web3EthAbi.encodeFunctionCall({
        name: 'playR2R',
        type: 'function',
        inputs: [{
          type: 'address',
          name: '_from'
        }, {
          type: 'uint256',
          name: '_value'
        }]
      }, [window.$store.state.web3.coinbase, (window.amount * (10 ** 18)).toString()])

      console.log('ACCOUNT: ', window.$store.state.web3.coinbase)
      console.log('funcEncoded:', funcEncoded)

      window.winEvent = null
      window.pending = true
      window.$store.state.chipInstance().approveAndCall(window.$store.state.contractInstance().address, window.amount * (10 ** 18), funcEncoded, {
        gas: 300000,
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
        } else {
          let Won = window.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              window.winEvent = result.args
              window.winEvent._rewardType = result.args._rewardType
              window.winEvent._amount = parseInt(result.args._amount, 10)
              window.pending = false
            }
          })
        }
      })
    },
    swapR2T: function (window) {
      let funcEncoded = Web3EthAbi.encodeFunctionCall({
        name: 'swapR2T',
        type: 'function',
        inputs: [{
          type: 'address',
          name: '_from'
        }, {
          type: 'uint256',
          name: '_value'
        }]
      }, [window.$store.state.web3.coinbase, (window.amount * (10 ** 18)).toString()])

      console.log('ACCOUNT: ', window.$store.state.web3.coinbase)
      console.log('funcEncoded:', funcEncoded)

      window.winEvent = null
      window.pending = true
      window.$store.state.chipInstance().approveAndCall(window.$store.state.contractInstance().address, window.amount * (10 ** 18), funcEncoded, {
        gas: 300000,
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
        } else {
          let Swapped = window.$store.state.contractInstance().Swapped()
          Swapped.watch((err, result) => {
            if (err) {
              console.log('could not get event Swapped()')
            } else {
              window.swapEvent = result.args
              window.swapEvent._amount = parseInt(result.args._amount, 10)
              window.swapEvent._target = result.args._target
              window.pending = false
            }
          })
        }
      })
    },
    swapT2R: function (window) {
      console.log('AMOUNT', window.amount)
      window.winEvent = null
      window.pending = true
      window.$store.state.tokenInstance().approve(window.$store.state.contractInstance().address ,window.amount * (10 ** 18), {
        gas: 300000,
        from: window.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          window.pending = false
        } else {
          let Approval = window.$store.state.tokenInstance().Approval()
          Approval.watch((err, result) => {
            if (err) {
              console.log('could not get event Approval()')
            } else {

              window.$store.state.contractInstance().swapT2R(window.$store.state.web3.coinbase, result.args.value, {
                gas: 300000,
                from: window.$store.state.web3.coinbase
              }, (err, result) => {
                if (err) {
                  console.log(err)
                  window.pending = false
                } else {
                  let Swapped = window.$store.state.contractInstance().Swapped()
                  Swapped.watch((err, result) => {
                    if (err) {
                      console.log('could not get event Swapped()')
                    } else {
                      window.swapEvent = result.args
                      window.swapEvent._amount = parseInt(result.args._amount, 10)
                      window.swapEvent._target = result.args._target
                      window.pending = false
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
