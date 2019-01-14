<template>
     <div class="bg-light" id="section2">
       <div class="title">
          <img src="../assets/title.png" alt="" style="height: 500px; margin-left: 55%;">
       </div>
       <br><br><br>
        <div class="container" style="z-index: 2; display: block; margin-top:-20%">
          <h2 >What is Lucky bar?</h2><br>
          <p class="lead" style="height: 280px">The user can transfer the TOKA CHIP or Ethereum to the contract and get a <br>random reward. The reward rate is max +-50%. <br>TOKA CHIP is a game money used in Lucky Bar and will be switched to TOKA 1 : 1. <br>You can switch at any time via the SWAP button. 
            If you play the game with Ethereum, <br>TOKA CHIP will be mined. The game player receives a TOKA CHIP of the amount<br> corresponding to the commission rate. (Mining Ratio 1 : 5000 / Exchange Ratio 1 : 100000)</p>
          <br><br><br>
          <h2 >How to Start</h2>
          <p class="lead" >You need to install the Meta Mask plugin to play the game.
            To play, enter the ETH(or TOKA CHIP) quantity and press the send button. Once the transaction is approved by the Meta Mask plugin, the game will start. Results can be found in ‘My Result’ section on the game screen.</p>
          <br>
          <h2>There are four types of games</h2><br>
          <p class="lead">ETH to ETH :  Use Ethereum to get Ethereum. The base exchange rate is 1 : 1. The commission rate is 5%.</p>
          <p class="lead">ETH to TOKA CHIP : Use Ethereum to get TOKA CHIP. The base exchange rate is 1 : 100000, and is updated periodically according to the quotation. The commission rate is 0%.</p>
          <p class="lead">TOKA CHIP to ETH : Use TOKA CHIP to get Ethereum. The base exchange rate is 100000 : 1, and is updated periodically according to the quotation. The commission rate is 5%.</p>
          <p class="lead">TOKA CHIP to TOKA CHIP : Use TOKA CHIP to get TOKA CHIP. The base exchange rate is 1 : 1. The commission rate is 1%.</p><br>
          <h2>MIN and MAX Transfer quantity</h2><br>
          <p class="lead">ETH to ETH : min 0.1 ETH / max infinity</p>
          <p class="lead">ETH to TOKA CHIP : min 0.1ETH / max infinity</p>
          <p class="lead">TOKA CHIP to TOKA CHIP : min 100 TOKA CHIP / max infinity</p>
          <p class="lead">TOKA CHIP to ETH : Will be open later.</p><br>


          <h2>The result confirmation window is as follows.</h2><br>
          <p class="lead">My result : You can check your play results.</p>
          <p class="lead">Total Result : You can check the latest five play history.</p>
          <p class="lead">Ranking: The highest ranked number of ETHs in the game.</p>

        </div>
        

        <div class="dona">
          <img src="../assets/dona.gif" alt="" style="height: 500px; margin-left:70%; margin-top:-32% ">
        </div>

        <back-to-top bottom="50px" right="50px">
          <button type="button" class="btn btn-info btn-to-top"><i class="fa fa-chevron-up"></i></button>
        </back-to-top>
      <br><br><br>
    </div>   
</template>

<script>
export default {

}
</script>

<style>
.btn-to-top {
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
}
.hr2{
  border: 1px solid #c9c9c9
}
.dona{
  z-index: 1;
  display: inline;
}
.title{
  z-index: 1;
  display: inline;
}
</style>
