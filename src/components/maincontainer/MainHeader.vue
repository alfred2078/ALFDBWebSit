<template>
  <el-header>
    <div class="header">
      <logo style="width:250px"></logo>
      <div class="headeritem1" @click="toggleCollapse">
       <i :class="icon"></i>
        <span>{{$t('header.iconMessage')}}</span>
      </div>
      <div class="headeritem2">
        <main-menu></main-menu>
      </div>
    </div>
  </el-header>
</template>

<script>
  import MainMenu from "@/components/maincontainer/MainMenu";
  import Logo from "@/components/logo";
  import store from "@/store";
  import { mapGetters } from "vuex";
  export default {
    name: "MainHeader",
    components: {
      MainMenu,
      Logo
    },
    data() {
      return {
        icon:"el-icon-s-fold"
      };
    },
    
    computed: {    
      ...mapGetters(["addRouters","isCollap"])
    },
    methods: {
      toggleCollapse () {
        //debugger;
        store.dispatch('toggleCollapse');
        if(this.isCollap)
        {
          this.icon="el-icon-s-unfold"
        } else 
        {
          this.icon="el-icon-s-fold"
        }
        //this.$store.dispatch('menuToggleSideBar/toggleCollapse')
      }
  }
  };

</script>

<style lang="scss">
  .header {

    font-size: 22px;
    display: flex;
    // justify-content: space-around;
    height: 100%;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }

  .headeritem1 {
    float: left;
    width: 750px;

    // line-height: 70px;
    // float: left;
    // width: 650px;
    // display: flex;
    color: #ffffff;
    font-size: 14px;

    align-items: center;

    i {
      font-size: 28px;
      padding: 6px 0px;
      cursor: pointer;
      -webkit-transition: 0.38s;
      transition: 0.38s;
    }

    i:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    span {
      font-size: 14px;
    }
  }

  .headeritem2 {

    width: 50%;
    // width: 100%;
    display: flex;
    float: right;
    // background-color: aqua;
    align-items: center;
    justify-content: flex-end;
    padding-right: 3%;
  }

  // .header {
  //   display: flex;
  //   justify-content: space-around;
  //   height: 100%;
  //   box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);


  //   .headeritem1 {
  //     width: 100%;
  //     display: flex;
  //     color: #ffffff;
  //     font-size: 14px;     
  //     align-items: center;
  //     i {
  //       font-size: 24px;
  //       padding: 10px 15px;
  //       cursor: pointer;
  //       transition: 0.38s;
  //     }
  //     i:hover {
  //       background-color: rgba(255, 255, 255, 0.2);
  //     }
  //   }
  //   .headeritem2 {
  //     width: 100%;
  //     display: flex;     
  //     align-items: center;
  //     justify-content: flex-end;
  //     padding-right: 3%;
  //   }
  // }

</style>
