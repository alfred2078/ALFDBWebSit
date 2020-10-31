<template>
  <el-card body-style="padding:2px">
    <el-pagination
      :background="background"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :layout="layout" 
      :current-page.sync="currentPage"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    fcurrentPage: {
      type: Number,
      default: 1
    },
    fpageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50,200]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },    
   
  },
  computed: {
    currentPage: {
      get() {
        return this.fcurrentPage
      },
      set(val) {
        this.$emit('update:fcurrentPage', val)
      }
    },
    pageSize: {
      get() {
        return this.fpageSize
      },
      set(val) {          
        this.$emit('update:fpageSize', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination')
    },
    handleCurrentChange(val) {
      this.$emit('pagination')     
    }
  }
}
</script>

<style scoped>
/* .pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
} */
</style>
