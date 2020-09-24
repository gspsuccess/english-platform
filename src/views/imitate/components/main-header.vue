<template>
  <el-row>
    <el-col :span="18">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.content" placeholder="请输入搜索内容" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6">
      <el-button type="success" style="float:right" @click="addOne"><i class="el-icon-plus" />新增记录</el-button>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      searchForm: {}
    }
  },
  methods: {
    handleSearch() {
      this.$emit('handleSearch', this.searchForm)
    },
    addOne() {
      this.$emit('addOne')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
