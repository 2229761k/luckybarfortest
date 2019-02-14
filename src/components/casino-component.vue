<template>
 <div id="section1" align="center" >

    <!-- <div class="event" v-if="winEvent">
      <div v-if="winEvent._status" id="has-won" class="win-effect"></div>
      <div v-else id="has-lost"  class="lose-effect"></div>
    </div> -->
    <!-- <div class="lose-effect"></div> -->

<!-- 
    <div class="backboard">
        <img src="../assets/backboard.png" style="width:85%;">
   
        <div class="balance" style="margin-top:30px" >
          <label class="metainfo" style="font-size:25px"> Account</label>
          <label class="metainfo-connect" v-if="isInjected" id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Metamask Connected</label>
          <label class="metainfo-connect" v-else id="no-metamask"><i aria-hidden="true" class="fa fa-times"></i> Metamask Connection failed</label>

          <p v-if="network == 'Ropsten test network'" class="metainfo"><a v-bind:href="'https://ropsten.etherscan.io/address/' + coinbase" target="_blank">{{ coinbase }}</a></p>
          <p v-else class="metainfo" id="has-lost" > Available only on Ropsten Test Network</p>

          <hr class="hr1" />
          <p class="metainfo"><img src="../assets/ETH.png" style="width:4%"/> {{ ethBalance }} ETH</p>
          <p class="metainfo"><img src="../assets/CHIP.png" style="width:13%" />  {{ chipBalance }} CHIP</p>
          <p class="metainfo"><img src="../assets/TOKA.png" style="width:8%" />  {{ tokaBalance }} TOKA</p>
          <p class="metainfo"><img src="../assets/IDR.png" style="width:7%" />  0.00 IDR</p>
        </div>

    </div> -->

    <!-- <div class="background-image">
      <div v-if="pending" >
        <img src="../assets/loading.gif">
      </div>
      <div v-else>
        <img v-if="winEvent"  src="../assets/ingame_2.gif" style="opacity:0.6" >
        <img v-else src="../assets/ingame_2.gif" style="opacity:1" >  
      </div>
    </div> -->
      
      <el-row :gutter="24" >
        <el-col :span="2" :offset="3" >
          <el-tabs type="border-card"   style="width: 500px; text-align: center;" >
            <el-tabs v-model="selectedCategory" :tab-position="tabPosition">
              <el-tab-pane label="GPA to Moon" name = 'e2e'><p>GPA to Moon</p>
                <hr>
                <p>Exchange Rate <br> 1:10000 </p>
                <input v-model="amount" placeholder="0 GPA" style="width:40%">
                <button v-on:click="playE2E">Swap</button>
              </el-tab-pane>
              <el-tab-pane label="GPA to Poker" name = 'e2c'><p>GPA to Poker</p>
                <hr>
                <p>Exchange Rate <br> 1:100000 </p>
                <input v-model="amount" placeholder="0 GPA" style="width:40%">
                <button v-on:click="playE2C">Swap</button>
              </el-tab-pane>
              <el-tab-pane label="Moon to GPA" name = 'c2c'><p>Moon to GPA</p>
                <hr>
                <p>Exchange Rate <br> 10000:1 </p>
                <input v-model="amount" placeholder="0 CHIP" style="width:40%">
                <button v-on:click="playC2C">Swap</button>
              </el-tab-pane>
              <el-tab-pane label="Poker to GPA" name = 'c2e'><p>Poker to GPA</p>
                <hr>
                <p>Exchange Rate <br>100000:1 </p>
                <input v-model="amount" placeholder="0 CHIP" style="width:40%">
                <button v-on:click="playC2E">Swap</button>
              </el-tab-pane>
              <el-tab-pane label="Fiat"><p>Fiat</p>
                <hr>
                <p>GPA to BMS </p>
                <input v-model="amount" placeholder="0 GPA" style="width:40%">
                <button v-on:click="CHIP2toka">Swap</button>
                <br><br>
                 <p>BMS to GPA </p>
                <input v-model="amount" placeholder="0 BMS" style="width:40%">
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
                      <tbody v-for="(item, index) in latest[selectedCategory]" :key="index" style="font-size:14px">
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
      selectedCategory: 'e2e'
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
    chipBalance: state => state.web3.chipBalance,
    ranking: state => state.web3.ranking,
    latest: state => state.web3.latest
  }),
  methods: {
    playE2E (event) {
      this.$store.state.functions.playE2E(this);
    },
    playE2C (event) {
      this.$store.state.functions.playE2C(this);
    },
    playC2C (event) {
      this.$store.state.functions.playC2C(this);
    },
    playC2E (event) {
      this.$store.state.functions.playC2E(this);
    },
    toka2CHIP(){
      this.$store.state.functions.swapT2C(this);
    },
    CHIP2toka(){
      this.$store.state.functions.swapC2T(this);
    }
  },
  mounted () {
    console.log('dispatching getContractInstance');
    this.$store.dispatch('getContractInstance');
    console.log('dispatching getTokenContractInstance');
    this.$store.dispatch('getTokenContractInstance');
    console.log('dispatching getChipContractInstance');
    this.$store.dispatch('getChipContractInstance');
    this.selectedCategory = 'e2e';
  },

}
</script>

<style>
p{color: white}
th{color: white}
td{color: white}
</style>