<template>
<div class="headerimg">
    <div style="position: relative; z-index:1; margin: 0px; padding:0px">
        <img src="../assets/lucky_header.gif" alt="" style="width: 100%;">
    </div>
    <div style="position: relative; z-index:2; top:-320px">
        <el-row :gutter="12">
            <el-col :span="2" :offset="5" style="cursor: pointer"> 
                    <a v-scroll-to="'#section1'" id="button">
                        <!-- <img  src="../assets/play_button.png" style="width:280px "/>      -->
                    </a>
                
                    <a v-scroll-to="'#section2'" id="button2">
                        <!-- <img  src="../assets/help_button.png" style="width:280px "/>       -->
                    </a>
                  
       
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
}
</script>

<style>
#button {
  display: block;
  width: 350px;
  height: 120px;
  background: url(../assets/play_button.png) no-repeat top;
  background-size: 80%
}
#button:active {
  background: url(../assets/after_play.png) no-repeat top;
  background-size: 80%

    
}
#button2 {
  display: block;
  width: 350px;
  height: 120px;
  background: url(../assets/help_button.png) no-repeat top;
  background-size: 80%

}
#button2:active {
  background: url(../assets/after_help.png) no-repeat top;
  background-size: 80%

}

.before_hover:hover .overlay {
  opacity: 1;
}
.before_hover2:hover .overlay2 {
  opacity: 1;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 21%;
  right: 0;
  height: 100%;
  width: 80%;
  opacity: 0;
  /* transition: .5s ease; */
}
.overlay2 {
  position: absolute;
  top: 60%;
  bottom: 0;
  left: 21%;
  right: 0;
  height: 100%;
  width: 80%;
  opacity: 0;
  /* transition: .5s ease; */
}

</style>
