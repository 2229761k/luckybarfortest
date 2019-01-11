<template>
 <div id="section1" align="center" style="position:relative;width: 100%;height: 1400px;" >

    <div class="event" v-if="winEvent">
      <div v-if="winEvent._status" id="has-won" class="win-effect"></div>
      <div v-else id="has-lost"  class="lose-effect"></div>
    </div>
    <!-- <div class="lose-effect"></div> -->


    <div class="backboard">
        <img src="../assets/backboard.png" style="width:85%;">
   
        <div class="balance" style="margin-top:30px" >
          <label class="metainfo" style="font-size:25px"> Account</label>
          <label class="metainfo-connect" v-if="isInjected" id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Metamask Connected</label>
          <label class="metainfo-connect" v-else id="no-metamask"><i aria-hidden="true" class="fa fa-times"></i> Metamask Connection failed</label>

          <p v-if="network == 'Ropsten test network'" class="metainfo"><a v-bind:href="'https://ropsten.etherscan.io/address/' + coinbase">{{ coinbase }}</a></p>
          <p v-else class="metainfo" id="has-lost" > Available only on Ropsten Test Network</p>

          <hr class="hr1" />
          <p class="metainfo"><img src="../assets/ETH.png" style="width:4%"/> {{ ethBalance }} ETH</p>
          <p class="metainfo"><img src="../assets/CHIP.png" style="width:13%" />  {{ chipBalance }} CHIP</p>
          <p class="metainfo"><img src="../assets/TOKA.png" style="width:8%" />  {{ tokaBalance }} TOKA</p>
          <p class="metainfo"><img src="../assets/IDR.png" style="width:7%" />  0.00 IDR</p>
        </div>

    </div>

    <div class="background-image">
      <div v-if="pending" >
        <img src="../assets/loading.gif">
      </div>
      <div v-else>
        <img v-if="winEvent"  src="../assets/ingame_2.gif" style="opacity:0.6" >
        <img v-else src="../assets/ingame_2.gif" style="opacity:1" >  
      </div>
    </div>

    <div class="input-window-border">
        <img src="../assets/scroll.png" >
        <div id="game-result" class="input-window">
      <el-row :gutter="24" class="font_change" >
        <el-col :span="2" :offset="17" >
          <el-tabs type="border-card"   style="width: 400px; text-align: center;" >
            <el-tabs v-model="selectedCategory" :tab-position="tabPosition">
              <el-tab-pane label="ETH to ETH" name = 'e2e'><p>ETH to ETH</p>
                <hr>
                <p>Exchange Rate <br> 1:1 +-50%</p>
                <input v-model="amount" placeholder="0 ETH" style="width:40%">
                <button v-on:click="playE2E">Play</button>
              </el-tab-pane>
              <el-tab-pane label="ETH to CHIP" name = 'e2c'><p>ETH to CHIP</p>
                <hr>
                <p>Exchange Rate <br> 1:100000 +-50% </p>
                <input v-model="amount" placeholder="0 ETH" style="width:40%">
                <button v-on:click="playE2C">Play</button>
              </el-tab-pane>
              <el-tab-pane label="CHIP to CHIP" name = 'c2c'><p>CHIP to CHIP</p>
                <hr>
                <p>Exchange Rate <br> 1:1 +-50% </p>
                <input v-model="amount" placeholder="0 CHIP" style="width:40%">
                <button v-on:click="playC2C">Play</button>
              </el-tab-pane>
              <el-tab-pane label="CHIP to ETH" name = 'c2e'><p>CHIP to ETH</p>
                <hr>
                <p>Exchange Rate <br>100000:1 +-50%</p>
                <input v-model="amount" placeholder="0 CHIP" style="width:40%">
                <button v-on:click="playC2E">Play</button>
              </el-tab-pane>
              <el-tab-pane label="SWAP"><p>SWAP</p>
                <hr>
                <p>CHIP to TOKA </p>
                <input v-model="amount" placeholder="0 CHIP" style="width:40%">
                <button v-on:click="CHIP2toka">Swap</button>
                <br><br>
                 <p>TOKA to CHIP </p>
                <input v-model="amount" placeholder="0 TOKA" style="width:40%">
                <button v-on:click="toka2CHIP">Swap</button>
              </el-tab-pane>
            </el-tabs>
            <hr>
            <el-tabs :tab-position="tabPosition" style="height: 190px;">
              <el-tab-pane label="My Result" ><p>My Result</p>
                <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
                <!-- game result -->
                  <div class="event" v-if="winEvent">
                    <p v-if="winEvent._status" id="has-won"><i aria-hidden="true" class="fa fa-check"></i>
                    Congragulations, you have got {{winEvent._amount}} {{winEvent._rewardType}} </p>
                    <p v-else id="has-lost"><i aria-hidden="true" class="fa fa-times"></i>
                    Sorry you lost, try again. You have got just {{winEvent._amount}} {{winEvent._rewardType}}</p>
                </div>
   
                <!-- swap result -->
                <div class="event" v-if="swapEvent">
                    <p id="has-won"><i aria-hidden="true" class="fa fa-check"></i>
                    Swap Complete, you have got {{swapEvent._amount }} {{swapEvent._target}} </p>
                </div>

              </el-tab-pane>
              <el-tab-pane label="Total Result"  ><p>Total Result</p>
                    <table class="font_2" style="width:100%">
                      <thead style="font-size:14px">
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Address</th>
                      </thead>
                      <tbody v-for="(item, index) in myResult[selectedCategory]" :key="index" style="font-size:14px">
                        <td>{{item.Date}}</td>
                        <td>{{item.Amount}}</td>
                        <td>{{item.Address}}</td>
                      </tbody>
                    </table>
              </el-tab-pane>
              <el-tab-pane label="Ranking"><p>Ranking</p>
                    <table class="font_2" style="width:100%">
                      <thead style="font-size:14px">
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Address</th>
                      </thead>
                      <tbody v-for="(item, index) in rankingResult[selectedCategory]" :key="index" style="font-size:14px">
                        <td>{{item.Date}}</td>
                        <td>{{item.Amount}}</td>
                        <td>{{item.Address}}</td>
                      </tbody>
                    </table>
              </el-tab-pane>
            </el-tabs>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios'
import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'

export default {
  name: 'casino',
  data () {
    return {
      tabPosition: 'left',
      amount: null,
      pending: false,
      winEvent: null,
      swapEvent: null,
      myResult: [],
      selectedCategory: 'e2e',
      rankingResult: []
    }
  },
   computed: mapState({
    isInjected: state => state.web3.isInjected,
    network: state => NETWORKS[state.web3.networkId],
    coinbase: state => state.web3.coinbase,
    balance: state => state.web3.balance,
    ethBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
    },
    tokaBalance: state => state.web3.tokaBalance,
    chipBalance: state => state.web3.chipBalance
  }),
  methods: {
    playE2E (event) {
      this.$store.state.functions.playE2E(this);
      this.getTotalResult('e2e');
      this.getRanking('e2e');

    },
    playE2C (event) {
      this.$store.state.functions.playE2C(this);
      this.getTotalResult('e2c');
      this.getRanking('e2c');

    },
    playC2C (event) {
      this.$store.state.functions.playC2C(this);
      this.getTotalResult('c2c');
      this.getRanking('c2c');

    },
    playC2E (event) {
      this.$store.state.functions.playC2E(this);
      this.getTotalResult('c2e');
      this.getRanking('c2e');
    },
    toka2CHIP(){
      this.$store.state.functions.swapT2C(this);
    },
    CHIP2toka(){
      this.$store.state.functions.swapC2T(this);
    },
    getRanking(type){

      axios.get('http://218.39.141.11:3000/loadranking/' + type)
        .then((response)=>{
          this.rankingResult[type] = response.data
          this.makeItNice(this.rankingResult[type])
      })
    },
    getTotalResult(type){
      axios.get('http://218.39.141.11:3000/loadtotalresult/' + type)
        .then((response)=>{
          console.log('type: ',type)
          console.log('contents: ',this.myResult)
          this.myResult[type] = response.data
          this.makeItNice(this.myResult[type])
      })
    },
    makeItNice(data) {
      for(var i=0; i<data.length; i++){
        data[i]['Amount']= parseFloat(data[i]['Amount']).toFixed(2);
        data[i]['Address'] = data[i]['Address'].toString().slice(0,5) + '***'
      }
    }
  },
  mounted () {
    console.log('dispatching getContractInstance');
    this.$store.dispatch('getContractInstance');
    console.log('dispatching getTokenContractInstance');
    this.$store.dispatch('getTokenContractInstance');
    console.log('dispatching getChipContractInstance');
    this.$store.dispatch('getChipContractInstance');
    this.getTotalResult('e2e');
    this.getRanking('e2e');
    this.getTotalResult('e2c');
    this.getRanking('e2c');
    this.getTotalResult('c2e');
    this.getRanking('c2e');
    this.getTotalResult('c2c');
    this.getRanking('c2c');
  },

}
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Press+Start+2P";

.hr1{
  border: 1px solid white;
  width:70%;
  margin-left: 0px
}
.background-image{
    z-index: 1;
    display: block;
    /* opacity: 0.6; */
    /* width:70%; */
}


a { color: white; }

.win-effect{
    z-index: 2;
    position: absolute;
    top: 0%;
    width: 100%;

    background-image: url("../assets/win.gif");

    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.lose-effect{
    z-index: 2;
    position: absolute;
    top: 0%;
    width: 100%;

    background-image: url("../assets/lose.gif");

    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.backboard{
  z-index: 2;
  position: absolute;
  left: 0%;
  width:800px
}

.balance{
    z-index: 3;
    position: absolute;
    top: 12%;
    left: 17%;
    width: 700px;
    text-align: left;
}
.input-window{
    z-index: 3;
    position: absolute;
    top: 15%;
    left: -70%;
    width: 400px;
}

.input-window-border {
    z-index: 2;
    position: absolute;
    top: 20%;
    left: 70%;
    width: 400px;
}

p {
/* font-family: 'Press Start 2P', cursive; */
font-size: 8px
}

.font_change{
    font-family: 'Press Start 2P', cursive;

    font-size: 4px;
    /* background-image: url("../assets/ui-test.png") !important; 
    background-repeat: no-repeat; */
}
.font_2{
    font-family: 'ZCOOL QingKe HuangYou', cursive;
    
}
/* .casino {
     margin-top: 50px;
     text-align:center;
} */


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
.metainfo{
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  position: relative;
  top: 5px;
}
.metainfo-connect{
  margin-bottom: 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
}
.metamask-info {
  text-align:left;
}
#has-metamask {
  color: green;
}
#no-metamask {
  color:red;
}
</style>
