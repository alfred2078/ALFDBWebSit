<template >
  <fragment>
    <template v-for="itemSub in item.children">
      <el-menu-item  v-if="hasOneShowingChild(itemSub)" :key="itemSub.name" :index="itemSub.path">
          <i :class="itemSub.meta.icon" ></i>
       
       
        <span slot="title">{{itemSub.meta.title}}</span>
      </el-menu-item>  
       <el-submenu v-else :key="itemSub.name" :index="itemSub.name||itemSub.path">
      <template slot="title">
        <i :class="itemSub.meta.icon" ></i>
      
        <span>{{itemSub.meta.title}}</span>
      </template>
      <el-menu-item v-for="child in itemSub.children" 
      :key="child.name"
      :index="child.path">
    
      {{child.meta.title}}</el-menu-item>      
    </el-submenu>
    </template>

  </fragment>
</template>

<script>
export default {
  name: "SidebarItem",
  data() {
    return {
      onlyOneChild: null
    };
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  methods: {
    /* 判断有没有子菜单 */
    // hasOneShowingChild(children) {
    //   if(children===undefined || children===null)
    //   {
    //     this.onlyOneChild = children
    //     return true        
    //   }
    //   const showingChildren = children.filter(item => {
    //     if (item.hidden) {
    //       return false;
    //     } else {
    //       // temp set(will be used if only has one showing child )
    //       this.onlyOneChild = item;
    //       return true;
    //     }
    //   });
    //   if (showingChildren.length === 1) {
    //     return true;
    //   }
    //   return false;
    // }
    hasOneShowingChild(child) {

      let showingChildren;
      if (child.children === undefined || child.children === null) {
        return true
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
.dash {
  text-decoration: none;
  color: #1890ff;
}

.svg-container {
  font-size: 16px;
}
</style>