<template>
<div class="headerimg">
    <dir style="position: relative; z-index:1; margin: 0px; padding:0px">
        <img src="../assets/lucky_header.jpg" alt="">
    </dir>
    <dir style="position: relative; z-index:2; top:-300px">
        <el-row :gutter="12">
            <el-col :span="2" :offset="5" style="cursor: pointer">           
                <a v-scroll-to="'#section1'" @click="clickImg" ><img src="../assets/play_button.png" style="width:250px"/></a>
                <br><br>
                <a v-scroll-to="'#section2'" @click="clickImg"><img src="../assets/help_button.png" style="width:250px"/></a>
                <br><br>
            </el-col>
        </el-row>
    </dir>
</div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        clickImg() {
            
        }
    }
}
</script>

<style>
/* .headerimg{
    background-image: url("../assets/lucky_header.jpg");
    background-repeat: no-repeat;
    background-position: center center;
} */


</style>
