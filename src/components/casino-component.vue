<template>
<div>
  <div class="ingame" id="section1">
    <el-row :gutter="24" style="opacity: 0.8">
      <el-col :span="10" :offset="13">                  
        <el-tabs type="border-card" style="width: 700px; text-align: center">
          <el-tabs :tab-position="tabPosition" style="height: 340px;">
            <el-tab-pane label="Eth to Eth">Eth to Eth
              <hr>
              <h4>Exchange Rate: 1:1 +-50% </h4>
              <h4>Just click bet and get what your lucky goddess grant you!</h4>
              Amount to play: <input v-model="amount" placeholder="0 Ether">
              <button v-on:click="clickBet">Play</button>
            </el-tab-pane>
            <el-tab-pane label="Eth to Toka">Eth to Toka
              <hr>
              <h4>Exchange Rate: 1:1000000 +-50% </h4>
              <h4>Just click bet and get what your lucky goddess grant you!</h4>
              Amount to play: <input v-model="amount" placeholder="0 Ether">
              <button v-on:click="clickBet">Play</button>
            </el-tab-pane>
            <el-tab-pane label="Toka to Toka">Toka to Toka
              <hr>
              <h4>Exchange Rate: 1:1 +-50% </h4>
              <h4>Just click bet and get what your lucky goddess grant you!</h4>
              Amount to play: <input v-model="amount" placeholder="0 Toka">
              <button v-on:click="clickBet">Play</button>
            </el-tab-pane>
            <el-tab-pane label="Toka to Eth">Toka to Eth
              <hr>
              <h4>Exchange Rate: 1000000:1 +-50% </h4>
              <h4>Just click bet and get what your lucky goddess grant you!</h4>
              Amount to play: <input v-model="amount" placeholder="0 Toka">
              <button v-on:click="clickBet">Play</button>
            </el-tab-pane>
          </el-tabs>
          <hr />
          <el-tabs :tab-position="tabPosition" style="height: 200px;">
            <el-tab-pane label="My Result">My Result
              <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
              <!-- game result -->
              <div class="event" v-if="winEvent">
                <p v-if="winEvent._status" id="has-won"><i aria-hidden="true" class="fa fa-check"></i> Congragulations, you have won {{winEvent._amount}} wei</p>
                <p v-else id="has-lost"><i aria-hidden="true" class="fa fa-times"></i> Sorry you lost, try again. You have got just {{winEvent._amount}} wei</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Total Result">Total Result

            </el-tab-pane>
            <el-tab-pane label="Ranking">Ranking

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
    methods: {
    clickBet (event) {
      console.log('AMOUNT', this.amount)
      this.winEvent = null
      this.pending = true
      // contract.methods.transfer('0xffcf8fdee72ac11b5c542428b35eef5769c409f0', 1).send()
      this.$store.state.contractInstance().approveAndCall(this.$store.state.web3.coinbase, this.amount, {
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
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  }
}
</script>

<style scoped>
.ingame{
background-image: url("../assets/ingame.gif");
margin-top: 100px;
background-repeat: no-repeat;  
background-size: 40% 100%;  
background-position: center center;

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
/* li{
    padding: 20px;
    margin-right: 5px;
    border-radius: 50%;
    cursor: pointer;
    background-color:#fff;
    border: -2px solid #bf0d9b;
    color: #bf0d9b;
    box-shadow:3px 5px #bf0d9b;
}
li:hover{
    background-color:#bf0d9b;
    color:white;
    box-shadow:0px 0px #bf0d9b;
}
li:active{
    opacity: 0.7;
}
*{
   color: #444444;
} */
#has-won {
  color: green;
}
#has-lost {
  color:red;
}
</style>
