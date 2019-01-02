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
        } else {
          let Won = window.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              window.winEvent = result.args
              window.winEvent._amount = parseInt(result.args._amount, 10)
              window.pending = false
            }
          })
        }
      })
    },
    playE2T: function (window) {
      console.log('AMOUNT', window.amount)
      window.winEvent = null
      window.pending = true
      window.$store.state.contractInstance().playE2T({
        gas: 300000,
        value: window.$store.state.web3.web3Instance().toWei(window.amount, 'ether'),
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
              window.winEvent._amount = parseInt(result.args._amount, 10)
              window.pending = false
            }
          })
        }
      })
    },
    playT2E: function (window) {
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

              window.$store.state.contractInstance().playT2E(result.args.value, {
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
                      window.winEvent._amount = parseInt(result.args._amount, 10)
                      window.pending = false
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    playT2T:function (window) {
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

              window.$store.state.contractInstance().playT2(result.args.value, {
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
                      window.winEvent._amount = parseInt(result.args._amount, 10)
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
  tokenInstance: null
}

export default state
