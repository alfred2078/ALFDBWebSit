<template>
  <div class="main">

      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>

  </div>
</template>

<script>
  export default {
    name: "RouteView",
    computed: {
      cachedViews() {
      console.log('this.$route.cachedViews');
      console.log(this.$route.meta.cachedViews);
      debugger;
      return this.$route.meta.cachedViews
    },
    key() {

      console.log('this.$route.meta.keepPath');
      console.log(this.$route.meta.keepPath);
      return this.$route.meta.keepPath
    }
    },
  }
</script>