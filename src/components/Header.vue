<template>
<div class="navbar-nav headerimg">
    <el-row :gutter="12">
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <el-col :span="2" :offset="5">           
           
            <a class="nav-link button1" href="#section1">Play!</a>
            <br>
            <a class="nav-link button1" href="#section2">Question?</a>
        
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
    height: 1050px
}
.button1 {
    border: 1px solid black;
    border-radius:50px;
    width: 240px;
    text-align: center;
    font-size: 40px;
}

</style>
