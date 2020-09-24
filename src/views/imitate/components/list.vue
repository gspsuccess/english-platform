<template>
  <el-table :data="tableData" style="width: 100%" border :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column align="center" prop="id" label="id" :formatter="formatter" />
    <el-table-column align="center" prop="tureid" label="类型" :formatter="formatter" sortable>
      <template slot-scope="scope">
        <el-button v-if="scope.row.tureid" size="mini" type="success">真题</el-button>
        <el-button v-else size="mini" type="info">模拟题</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="status" label="审核状态" :formatter="formatter" sortable>
      <template slot-scope="scope">
        <el-button v-if="scope.row.status === 0" size="mini" type="info">待审核</el-button>
        <el-button v-if="scope.row.status === 1" size="mini" type="success">审核通过</el-button>
        <el-button v-if="scope.row.status === 2" size="mini" type="danger">审核不通过</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        <el-button size="mini" type="primary" @click="handleVerify(scope.row)">审核</el-button>
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
      if (this.listObj.count > 0) {
        result = this.listObj.results
      }

      return result
    }
  },
  methods: {
    formatter(row, column) {
      if (column.property === 'tureid') {
        return row[column.property] ? '是' : '否'
      }
      if (column.property === 'detail') {
        return row[column.property].replace(/{!}/g, '____')
      }
      return row[column.property] ? row[column.property] : '--'
    },
    handleDelete(row) {
      this.$emit('handleDelete', row)
    },
    handleEdit(row) {
      this.$emit('handleEdit', row)
    },
    handleVerify(row) {
      this.$emit('handleVerify', row)
    }
  }
}
</script>
<style lang="stylus">

</style>
