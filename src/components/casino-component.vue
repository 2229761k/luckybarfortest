<template>
 <div id="section1" align="center" style="position:relative;width: 100%;height: 1400px;" >

    <div class="event" v-if="winEvent">
      <div v-if="winEvent._status" id="has-won" class="win-effect"></div>
      <div v-else id="has-lost"  class="lose-effect"></div>
    </div>
    <!-- <div class="lose-effect"></div> -->

    <div class="balance">
      <p v-if="isInjected" id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Metamask Connected</p>
      <p v-else id="no-metamask"><i aria-hidden="true" class="fa fa-times"></i> Metamask Connection failed</p>
      <!-- <p class="metainfo">Network: {{ network }}</p> -->
      <p class="metainfo"> Account</p>
      <p class="metainfo"> {{ coinbase }}</p>
      <p class="metainfo"><img src="../assets/ETH.png" style="width:4%"/> {{ ethBalance }} ETH</p>
      <p class="metainfo"><img src="../assets/rupy.png" style="width:15%" />  {{ rupyBalance }} RUPY</p>
      <p class="metainfo"><img src="../assets/TOKA.png" style="width:10%" />  {{ tokaBalance }} TOKA</p>

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
        <img src="../assets/ui-test.png" >
        <div id="game-result" class="input-window">
      <el-row :gutter="24" class="font_change" >
        <el-col :span="2" :offset="17" >
          <el-tabs type="border-card"   style="width: 400px; text-align: center;" >
            <el-tabs :tab-position="tabPosition">
              <el-tab-pane label="ETH to ETH" ><p>ETH to ETH</p>
                <hr>
                <p>Exchange Rate: <br> 1:1 +-50%</p>
                <input v-model="amount" placeholder="0 ETH" style="width:40%">
                <button v-on:click="playE2E">Play</button>
              </el-tab-pane>
              <el-tab-pane label="ETH to RUPY"><p>ETH to RUPY</p>
                <hr>
                <p>Exchange Rate: <br> 1:100000 +-50% </p>
                <input v-model="amount" placeholder="0 ETH" style="width:40%">
                <button v-on:click="playE2R">Play</button>
              </el-tab-pane>
              <el-tab-pane label="RUPY to RUPY"><p>RUPY to RUPY</p>
                <hr>
                <p>Exchange Rate: <br> 1:1 +-50% </p>
                <input v-model="amount" placeholder="0 RUPY" style="width:40%">
                <button v-on:click="playR2R">Play</button>
              </el-tab-pane>
              <el-tab-pane label="RUPY to ETH"><p>TOKA to ETH</p>
                <hr>
                <p>Exchange Rate: <br>100000:1 +-50% </p>
                <input v-model="amount" placeholder="0 RUPY" style="width:40%">
                <button v-on:click="playR2E">Play</button>
              </el-tab-pane>
              <el-tab-pane label="SWAP"><p>SWAP</p>
                <hr>
                <p>RUPY to TOKA </p>
                <input v-model="amount" placeholder="0 RUPY" style="width:40%">
                <button v-on:click="rupy2toka">Swap</button>
                <br><br>
                 <p>TOKA to RUPY </p>
                <input v-model="amount" placeholder="0 TOKA" style="width:40%">
                <button v-on:click="toka2rupy">Swap</button>
              </el-tab-pane>
            </el-tabs>
            <hr>
            <el-tabs :tab-position="tabPosition" style="height: 200px;">
              <el-tab-pane label="My Result" ><p>My Result</p>
                <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
                <!-- game result -->
                <div class="event" v-if="winEvent">
                  <p v-if="winEvent._status" id="has-won"><i aria-hidden="true" class="fa fa-check"></i>
                   Congragulations, you have got {{winEvent._amount / 10**18}} {{winEvent._rewardType}} </p>
                  <p v-else id="has-lost"><i aria-hidden="true" class="fa fa-times"></i>
                  Sorry you lost, try again. You have got just {{winEvent._amount / 10**18}} {{winEvent._rewardType}}</p>
                </div>
                <div class="event" v-if="swapEvent">
                  <p id="has-won"><i aria-hidden="true" class="fa fa-check"></i>
                   Swap Complete, you have got {{swapEvent._amount / 10**18}} {{swapEvent._target}} </p>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Total Result"  ><p>Total Result</p>
                    <table class="font_2" style="width:100%">
                      <thead style="font-size:14px">
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Address</th>
                      </thead>
                      <tbody v-for="(item, index) in myResult" :key="index" style="font-size:14px">
                        <td>{{item.timeStamp}}</td>
                        <td>{{item.value}}</td>
                        <td>{{item.to}}</td>
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
                      <tbody v-for="(item, index) in rankingResult" :key="index" style="font-size:14px">
                        <td>{{item.timeStamp}}</td>
                        <td>{{item.value}}</td>
                        <td>{{item.to}}</td>
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
    }
  }), 
  methods: {
    playE2E (event) {
      this.$store.state.functions.playE2E(this);
      this.getTotalResult();
      this.getRanking();

    },
    playE2R (event) {
      this.$store.state.functions.playE2R(this);
      this.getTotalResult();
      this.getRanking();

    },
    playR2R (event) {
      this.$store.state.functions.playR2R(this);
      this.getTotalResult();
      this.getRanking();

    },
    playR2E (event) {
      this.$store.state.functions.playR2E(this);
      this.getTotalResult();
      this.getRanking();
    },
    toka2rupy(){
      this.$store.state.functions.swapT2R(this);
    },
    rupy2toka(){
      this.$store.state.functions.swapR2T(this);
    },
    getRanking(){
     axios.get('https://api.etherscan.io/api?module=account&action=txlistinternal&address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3&startblock=0&endblock=99999999999&apikey=3IZMXH4SJM5SMX68K7P8ZSMMFUS4SM1HPR')
        .then((response)=>{

          this.rankingResult = response.data.result.sort(function(a,b){
              return b['value'] - a['value']
          })

          this.rankingResult = this.rankingResult.slice(0,5);

          for(var i=0; i<5; i++){
            var unix_timestamp = this.rankingResult[i]['timeStamp'];            
            var date = new Date(unix_timestamp*1000);
            var month = date.getMonth();
            var day = date.getDate();
            var year = date.getFullYear();
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = year + '.' + month + '.'+ day + ',' + hours + ':' + minutes.substr(-2)

            this.rankingResult[i]['timeStamp'] = formattedTime;

            this.rankingResult[i]['value'] /= 10**18;
            this.rankingResult[i]['value'] = this.rankingResult[i]['value'].toFixed(2);
            this.rankingResult[i]['to'] = this.rankingResult[i]['to'].slice(0,5) + '***'
            
          }
      })
    },
    getTotalResult(){
      console.log('adasd')
      axios.get('https://api.etherscan.io/api?module=account&action=txlistinternal&address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3&startblock=0&endblock=99999999999&apikey=3IZMXH4SJM5SMX68K7P8ZSMMFUS4SM1HPR')
        .then((response)=>{

          this.myResult = response.data.result.sort(function(a,b){
            return b['timeStamp'] - a['timeStamp']
        
          })
          // this.rankingResult = response.data.result.sort(function(a,b){
          //     return b['value'] - a['value']
          // })

          this.myResult = this.myResult.slice(0,5);
  
          for(var i=0; i<5; i++){
            var unix_timestamp = this.myResult[i]['timeStamp'];            
            var date = new Date(unix_timestamp*1000);
            var month = date.getMonth();
            var day = date.getDate();
            var year = date.getFullYear();
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = year + '.' + month + '.'+ day + ',' + hours + ':' + minutes.substr(-2)

            this.myResult[i]['timeStamp'] = formattedTime;

            this.myResult[i]['value'] /= 10**18;
            this.myResult[i]['value']= this.myResult[i]['value'].toFixed(2);
            this.myResult[i]['to'] = this.myResult[i]['to'].slice(0,5) + '***'
            
          }
      })
    }
  },
  mounted () {
    console.log('dispatching getContractInstance');
    this.$store.dispatch('getContractInstance');
    console.log('dispatching getTokenContractInstance');
    this.$store.dispatch('getTokenContractInstance');
    console.log('dispatching getChipContractInstance');
    this.$store.dispatch('getChipContractInstance');
    this.getTotalResult();
    this.getRanking();

  },
 
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Press+Start+2P";

.background-image{
    z-index: 1;
    display: block;
    /* opacity: 0.6; */
    /* width:70%; */
}
.balance{
    position: absolute;
    top: 6%;
    left: 14%;
    width: 800px;
    text-align: left;
}

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

.input-window{
    z-index: 3;
    position: absolute;
    top: 4%;
    left: -70%;
    width: 400px;
    opacity: 0.8;
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
