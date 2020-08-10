<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-aside :width="this.isCollap?'67px':'220px'">
      <!-- <logo></logo> -->
      <el-menu
   
        background-color="#001529"
        text-color="#ffffffe6"
        active-text-color="#fff"
        mode="vertical"
        :default-active="$route.path"
        :collapse="this.isCollap"
        :show-timeout="200"    
        router
      >
        <sidebar-item
          v-for="route in addRouters"
          :key="route.name"
          :item="route"
          :base-path="route.path"
  
        ></sidebar-item>
      </el-menu>
    </el-aside>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
 import Logo from "@/components/logo";
import SidebarItem from "./SidebarItem";

export default {
  components: {  SidebarItem },
  name: "SideBar",
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {    
    ...mapGetters(["addRouters","isCollap"])
  }
};
</script>

<style lang="scss">
.scrollbar-wrapper {
  overflow-x: hidden !important;
  .el-scrollbar__view {
 
    
  }
}
</style>
