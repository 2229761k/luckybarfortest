<template>
<div class="navbar-nav headerimg">
        <el-row :gutter="12" style="padding-top:600px">
            <el-col :span="2" :offset="5">           
                <a v-scroll-to="'#section1'" ><img src="../assets/play_button.png"/></a>
                <br><br>
                <a v-scroll-to="'#section2'" ><img src="../assets/help_button.png"/></a>
            
            </el-col>
        </el-row>
</div>
</template>

<script>
export default {

}
</script>

<style>
.headerimg{
    background-image: url("../assets/lucky_header.jpg");
    height: 1050px;
    background-repeat: no-repeat;
    background-position: center center;

}
.header_container{
    margin-top: 100px
}

</style>
