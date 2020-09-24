<template>
  <el-table :data="tableData" style="width: 100%" border :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column align="center" prop="id" label="id" :formatter="formatter" />
    <el-table-column align="center" prop="detail" label="内容" :formatter="formatter" sortable />
    <el-table-column align="center" prop="rightanswer" label="答案" :formatter="formatter" sortable />
    <el-table-column align="center" prop="level" label="等级" :formatter="formatter" sortable />
    <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    listObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    tableData() {
      let result = []
      if (this.listObj.results) {
        result = this.listObj.results
      }

      return result
    }
  },
  methods: {
    formatter(row, column) {
      return row[column.property] ? row[column.property] : '--'
    },
    handleEdit(row) {
      this.$emit('handleEdit', row)
    },
    handleDelete(row) {
      this.$emit('handleDelete', row)
    }
  }
}
</script>
<style lang="stylus">

</style>
