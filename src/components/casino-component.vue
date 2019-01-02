<template>
 <div id="section1" align="center" style="position:relative;width: 100%;height: auto;">

    <div class="event" v-if="winEvent">
      <div v-if="winEvent._status" id="has-won" class="win-effect"></div>
      <div v-else id="has-lost" class="lose-effect"></div>
    </div>
      <div class="background-image">
        <img src="../assets/ingame_2.gif" style="" >
    </div>
    <div class="input-window-border">
        <img src="../assets/ui-test.png" >
        <div id="game-result" class="input-window">
      <el-row :gutter="24" class="font_change">
        <el-col :span="2" :offset="17">
          <el-tabs type="border-card"   style="width: 400px; text-align: center;">
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
    playE2E (event) {
      this.$store.state.functions.playE2E(this);
    },
    playE2T (event) {
      this.$store.state.functions.playE2T(this);
    },
    playT2T (event) {
      this.$store.state.functions.playT2T(this);
    },
    playT2E (event) {
      this.$store.state.functions.playT2E(this);
    }
  },
  mounted () {
    console.log('dispatching getContractInstance');
    this.$store.dispatch('getContractInstance');
    console.log('dispatching getTokenContractInstance');
    this.$store.dispatch('getTokenContractInstance');
  }
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Press+Start+2P";

.background-image{
    z-index: 1;
    display: block; 
    /* width:70%; */
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
    top: 3%;
    left: -70%;
    width: 400px;
    opacity: 1;
}

.input-window-border {
    z-index: 2;
    position: absolute;
    top: 10%;
    left: 70%;
    width: 400px;
}

p {
font-family: 'Press Start 2P', cursive;
font-size: 20px
}

.font_change{
    font-family: 'ZCOOL QingKe HuangYou', cursive;
    font-size: 20px;
    /* background-image: url("../assets/ui-test.png") !important; 
    background-repeat: no-repeat; */
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
</style>
