5<template>
<div id="section1" >
  <div class="ingame" style="position: relative; z-index: 1; margin-top: 200px; ">
    <div  v-if="winEvent">
        <img v-if="winEvent._status" id="has-won" src="../assets/win_ingame.gif" style='height: 60%; width: 60%; object-fit: contain; margin-left: 340px'>
        <img v-else id="has-lost" src="../assets/lose_ingame.gif" style='height: 60%; width: 60%; object-fit: contain; margin-left: 340px'>
    </div>
    <div v-else>
        <img src="../assets/ingame.gif" style='height: 60%; width: 60%; object-fit: contain; margin-left: 340px'>
    </div>    
  </div>

  <div style="position: relative; top: -700px; z-index: 2;">
    <el-row :gutter="24" class="font_change">
      <el-col :span="1" :offset="16">                  
        <el-tabs type="border-card"   style="width: 400px; text-align: center">
          <el-tabs :tab-position="tabPosition" >
            <el-tab-pane label="ETH to ETH" ><p>ETH to ETH</p>
              <hr>
              <p>Exchange Rate: <br> 1:1 +-50%</p>
              <input v-model="amount" placeholder="0 ETH" style="width:40%">
              <button v-on:click="playE2E">Play</button>
            </el-tab-pane>
            <el-tab-pane label="ETH to TOKA"><p>ETH to TOKA</p>
              <hr>
              <p>Exchange Rate: <br> 1:1000000 +-50% </p>
              <input v-model="amount" placeholder="0 ETH" style="width:40%">
              <button v-on:click="playE2T">Play</button>
            </el-tab-pane>
            <el-tab-pane label="TOKA to TOKA"><p>TOKA to TOKA</p>
              <hr>
              <p>Exchange Rate: <br> 1:1 +-50% </p>
              <input v-model="amount" placeholder="0 TOKA" style="width:40%">
              <button v-on:click="playT2T">Play</button>
            </el-tab-pane>
            <el-tab-pane label="TOKA to ETH"><p>TOKA to ETH</p>
              <hr>
              <p>Exchange Rate: <br>1000000:1 +-50% </p>
              <input v-model="amount" placeholder="0 TOKA" style="width:40%">
              <button v-on:click="playT2E">Play</button>
            </el-tab-pane>
          </el-tabs>
          <hr>
          <el-tabs :tab-position="tabPosition" style="height: 200px;">
            <el-tab-pane label="My Result"><p>My Result</p>
              <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
              <!-- game result -->
              <div class="event" v-if="winEvent">
                <p v-if="winEvent._status" id="has-won"><i aria-hidden="true" class="fa fa-check"></i> Congragulations, you have won {{winEvent._amount}} wei</p>
                <p v-else id="has-lost"><i aria-hidden="true" class="fa fa-times"></i> Sorry you lost, try again. You have got just {{winEvent._amount}} wei</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Total Result"><p>Total Result</p>

            </el-tab-pane>
            <el-tab-pane label="Ranking"><p>Ranking</p>
            </el-tab-pane>
          </el-tabs>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  name: 'casino',
  data () {
    return {
      tabPosition: 'left',
      amount: null,
      pending: false,
      winEvent: null
    }
  },
  mETHods: {
      playE2E (event) {
      console.log('AMOUNT', this.amount)
      this.winEvent = null
      this.pending = true
      this.$store.state.contractInstance().playE2E({
        gas: 300000,
        value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          let Won = this.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              this.winEvent = result.args
              this.winEvent._amount = parseInt(result.args._amount, 10)
              this.pending = false
            }
          })
        }
      })
    },
    playE2T (event) {
      console.log('AMOUNT', this.amount)
      this.winEvent = null
      this.pending = true
      this.$store.state.contractInstance().playE2T({
        gas: 300000,
        value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          let Won = this.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              this.winEvent = result.args
              this.winEvent._amount = parseInt(result.args._amount, 10)
              this.pending = false
            }
          })
        }
      })
    },
    playT2T (event) {
      console.log('AMOUNT', this.amount)
      this.winEvent = null
      this.pending = true
      this.$store.state.tokenInstance().approve(this.$store.state.contractInstance().address ,this.amount * (10 ** 18), {
        gas: 300000,
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          let Approval = this.$store.state.tokenInstance().Approval()
          Approval.watch((err, result) => {
            if (err) {
              console.log('could not get event Approval()')
            } else {

              this.$store.state.contractInstance().playT2T(result.args.value, {
                gas: 300000,
                from: this.$store.state.web3.coinbase
              }, (err, result) => {
                if (err) {
                  console.log(err)
                  this.pending = false
                } else {
                  let Won = this.$store.state.contractInstance().Won()
                  Won.watch((err, result) => {
                    if (err) {
                      console.log('could not get event Won()')
                    } else {
                      this.winEvent = result.args
                      this.winEvent._amount = parseInt(result.args._amount, 10)
                      this.pending = false
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    playT2E (event) {
      console.log('AMOUNT', this.amount)
      this.winEvent = null
      this.pending = true
      this.$store.state.tokenInstance().approve(this.$store.state.contractInstance().address ,this.amount * (10 ** 18), {
        gas: 300000,
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          let Approval = this.$store.state.tokenInstance().Approval()
          Approval.watch((err, result) => {
            if (err) {
              console.log('could not get event Approval()')
            } else {

              this.$store.state.contractInstance().playT2E(result.args.value, {
                gas: 300000,
                from: this.$store.state.web3.coinbase
              }, (err, result) => {
                if (err) {
                  console.log(err)
                  this.pending = false
                } else {
                  let Won = this.$store.state.contractInstance().Won()
                  Won.watch((err, result) => {
                    if (err) {
                      console.log('could not get event Won()')
                    } else {
                      this.winEvent = result.args
                      this.winEvent._amount = parseInt(result.args._amount, 10)
                      this.pending = false
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
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
    console.log('dispatching getTokenContractInstance')
    this.$store.dispatch('getTokenContractInstance')
  }
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=ZCOOL+QingKe+HuangYou";
p {
  font-family: 'ZCOOL QingKe HuangYou', cursive;
  font-size: 25px
}

.font_change{
    font-family: 'ZCOOL QingKe HuangYou', cursive;
    font-size: 20px
}

.casino {
     margin-top: 50px;
     text-align:center;
}
#loader {
  width:150px;
}
ul {
    margin: 25px;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap:25px;
    grid-row-gap:25px;
}

#has-won {
  color: green;
}
#has-lost {
  color:red;
}
</style>
