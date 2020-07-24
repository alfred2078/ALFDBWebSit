<template>
  <div>
    <!-- <el-container  direction="horizontal">    
    <side-bar></side-bar> 
    <el-container class="mainContainer">
      <main-header></main-header>
      <el-main>
        <main-tab></main-tab>        
      </el-main>      
    </el-container>
  </el-container> -->
    <el-container direction="horizontal">      
      <!-- 头部 -->      
      <main-header class="topLayout">
      </main-header>
      <!-- 左边 -->
      <side-bar class="leftLayout"></side-bar>
      <!-- 右边 -->
      <el-container class="rigthLayout">
        <el-main>
          <main-tab></main-tab>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import SideBar from "@/components/sidebar";
  import MainHeader from "./MainHeader";
  import MainTab from "@/components/maintab";
  import Logo from "@/components/logo";

  export default {
    name: "MainLayout",
    components: {
      SideBar,
      MainHeader,
      MainTab,     
    }
  };

</script>

<style lang="scss" scoped>
  // div{
  //   height: 100%;
  //   .mainContainer{
  //     flex-direction: column;
  //   }
  // }


  .leftLayout {
    float: left;
    display: block;
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 0;
    background: rgb(0, 21, 41);
    //  overflow-y: scroll;
  }

  .rigthLayout {
    float: left;
    position: absolute;
    left: 200px;
    right: 0;
    top: 50px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }

  .topLayout::-webkit-scrollbar {
    width: 0;
  }

  .topLayout-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .topLayout>ul {
    height: 100%;
  }

  .topLayout {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    color: #fff;
    width: 100%;
    height: 60px;
  }

  .content-collapse {
    left: 65px;
  }

</style>
