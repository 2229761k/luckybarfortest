<template>
     <div class="bg-light" id="section2">
       <br><br><br>
        <div class="container" style="z-index: 2; display: block;">
            <h1 style="font-weight: bold; font-size: 60px">LuckyBar</h1>
            <br>
            <h2 >What is Lucky bar?</h2><br>
            <p class="lead">The user can transfer the RUPY or Ethereum to the contract and get a random reward. The reward rate is + -50%. <br>Rupy is a game money used in Lucky Bar and will be switched to TOKA 1: 1. You can switch at any time via the SWAP button. 
              If you play the game with Ethereum, Rupy will be mined. The game player receives a Rupy of the amount corresponding to the commission rate. (Exchange ratio 1: 100000)</p><br>
            <h2>How to start?</h2><br>
            <p class="lead">You need to install the Meta Mask plugin to play the game.
              To play, enter the ETH(or RUPY) quantity and press the send button. Once the transaction is approved by the Meta Mask plugin, the game will start. Results can be found in ‘myresult’ section on the game screen.</p>
            <br>
            <h2>There are four types of games</h2><br>
            <p class="lead">ETH to ETH:  Use Ether to get Ether. The base exchange rate is 1 : 1. The commission rate is 5%.</p>
            <p class="lead">ETH to RUPY: Use Ethereum to get Rs. The base exchange rate is 1 : 100000, and is updated periodically according to the quotation. The commission rate is 0%.</p>
            <p class="lead">RUPY to ETH: Use Rupee to get Ethereum. The base exchange rate is 100000 : 1, and is updated periodically according to the quotation. The commission rate is 5%.</p>
            <p class="lead">RUPY to RUPY: Use Rupee to get Rupee. The base exchange rate is 1 : 1. The commission rate is 1%.</p><br>
            <h4>The maximum number of transfers and the minimum number are specified.</h4><br>
            <p class="lead">ETH to ETH - min: 0.1ETH // max: inf.</p>
            <p class="lead">ETH to RUPY - min: 0.1ETH // max: inf.</p>
            <p class="lead">RUPY to RUPY - min: 100RUPY // max: inf.</p>
            <p class="lead">RUPY to ETH - Will be open later.</p><br>


            <h2>The result confirmation window is as follows.</h2><br>
            <p class="lead">My result: You can check my play results.</p>
            <p class="lead">Total Result: You can check the latest five play history.</p>
            <p class="lead">Ranking: The highest ranked number of ETHs in the game.</p>

        </div>
        <div class="dona">
          <img src="../assets/dona.gif" alt="" style="height: 500px; margin-left:70%; margin-top:-32% ">
        </div>
      <br><br><br>
    </div>   
</template>

<script>
export default {

}
</script>

<style>
.dona{
  z-index: 1;
  display: inline;
}
</style>
