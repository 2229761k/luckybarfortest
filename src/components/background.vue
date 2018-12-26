<template>
      <div class="ingame" id="section1">
        <div class="event" v-if="winEvent">
            <img src="../assets/ingame.gif">

            <img v-if="winEvent._status" id="has-won" src="../assets/win_ingame.gif">
            <img v-else id="has-lost" src="../assets/lose_ingame.gif">

        </div>
      </div>
</template>

<script>
import casinocomponent from '@/components/casino-component'

export default {
    components: {casinocomponent},
    data(){
        return
    }
}
</script>

<style>
.ingame{
margin-top: 100px;
background-repeat: no-repeat;  

background-position: center center;

} 
</style>
