<template>
  <div >
    <el-tabs v-model="activePage"  closable @tab-click="clickTab" @tab-remove="removeTab" >
      <el-tab-pane
        v-for="(item) in pageList"
        :key="item.fullPath"
        :label="item.meta.title"
        :name="item.fullPath"
      ></el-tab-pane>
    </el-tabs>
    <div style="margin: 0;height:100% ;" >

        <keep-alive >
          <router-view style="height:97% ;"></router-view>
        </keep-alive>

    </div>
   
  </div>
</template>

<script>
const indexKey = "/dashboard/dashmain";

export default {
  name: "MainTab",
  data() {
    return {
      // editableTabsValue:'',
      pageList: [],
      linkList: [],
      activePage: ""
    };
  },
  created() {
    if (this.$route.path != indexKey) {
      this.pageList.push({
        name: "dashboard-dashmain",
        path: indexKey,
        fullPath: indexKey,
        meta: {
          icon: "dashboard",
          title: "首页"
        }
      });
      this.linkList.push(indexKey);
    }
    this.pageList.push(this.$route);
    this.linkList.push(this.$route.fullPath);
    this.activePage = this.$route.fullPath;
  },
  computed: {},
  methods: {
    clickTab(key) {
      this.activePage = key.name;
    },
    removeTab(key) {
        if (key == indexKey) {
          this.$message.warning('首页不能关闭!')
          return
        }
        if (this.pageList.length === 1) {
          this.$message.warning('这是最后一页，不能再关闭了啦')
          return
        }
        this.pageList = this.pageList.filter(item => item.fullPath !== key)
        let index = this.linkList.indexOf(key)
        this.linkList = this.linkList.filter(item => item !== key)
        index = index >= this.linkList.length ? this.linkList.length - 1 : index
        this.activePage = this.linkList[index]
      },
  },
  watch: {
    $route: function(newRoute) {
   debugger;
      this.activePage = newRoute.fullPath;
      if (this.linkList.indexOf(newRoute.fullPath) < 0) {
        this.linkList.push(newRoute.fullPath);
        this.pageList.push(Object.assign({}, newRoute));
      } else if (this.linkList.indexOf(newRoute.fullPath) >= 0) {
        let oldIndex = this.linkList.indexOf(newRoute.fullPath);
        let oldPositionRoute = this.pageList[oldIndex];
        this.pageList.splice(
          oldIndex,
          1,
          Object.assign({}, newRoute, { meta: oldPositionRoute.meta })
        ); 
      }
      console.log("this.pageList");
      console.log(this.pageList);
    },
    activePage: function(key) {

      let index = this.linkList.lastIndexOf(key);
      let waitRouter = this.pageList[index];
      this.$router.push(Object.assign({}, waitRouter)).catch(err => {
        err;
      });
      console.log("waitRouter");
      console.log(waitRouter);
    }
  }
};
</script>

<style lang="scss">

</style>