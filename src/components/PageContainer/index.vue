<template>
  <div v-if="total > pageSize" class="page-wrapper">
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="changeCurrentPage"
    />
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  name: 'PageContainer',
  props: {
    listObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    total() {
      return this.listObj.count || 0
    },
    currentPage() {
      return this.listObj.currentPage || 1
    },
    pageSize() {
      return this.listObj.pageSize || 10
    }
  },
  methods: {
    changeCurrentPage(e) {
      this.$emit('changeCurrentPage', e)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .page-wrapper
    padding 12px 0
    border 1px solid #dfe6ec
    border-top none
</style>
