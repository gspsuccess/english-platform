<template>
  <el-table :data="tableData" style="width: 100%" border :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column align="center" width="100" prop="id" label="id" :formatter="formatter" />
    <el-table-column align="center" prop="name" label="名称" :formatter="formatter" sortable />
    <el-table-column align="center" width="100" prop="name" label="听力PartA" :formatter="formatter">
      <template slot-scope="scope">
        <el-button v-if="scope.row.thisla.length > 0" type="success" icon="el-icon-check" circle @click="routerUrl(scope.row,'la')" />
        <el-button v-else type="info" icon="el-icon-close" circle @click="routerUrl(scope.row,'la')" />
      </template>
    </el-table-column>
    <el-table-column align="center" width="100" prop="name" label="听力PartB" :formatter="formatter">
      <template slot-scope="scope">
        <el-button v-if="scope.row.thislb.length > 0" type="success" icon="el-icon-check" circle @click="routerUrl(scope.row,'lb')" />
        <el-button v-else type="info" icon="el-icon-close" circle @click="routerUrl(scope.row,'lb')" />
      </template>
    </el-table-column>
    <el-table-column align="center" width="100" prop="name" label="阅读PartA" :formatter="formatter">
      <template slot-scope="scope">
        <el-button v-if="scope.row.thisra.length > 0" type="success" icon="el-icon-check" circle @click="routerUrl(scope.row,'ra')" />
        <el-button v-else type="info" icon="el-icon-close" circle @click="routerUrl(scope.row,'ra')" />
      </template>
    </el-table-column>
    <el-table-column align="center" width="100" prop="name" label="阅读PartB" :formatter="formatter">
      <template slot-scope="scope">
        <el-button v-if="scope.row.thisrb.length > 0" type="success" icon="el-icon-check" circle @click="routerUrl(scope.row,'rb')" />
        <el-button v-else type="info" icon="el-icon-close" circle @click="routerUrl(scope.row,'rb')" />
      </template>
    </el-table-column>
    <el-table-column align="center" width="100" prop="name" label="阅读PartC" :formatter="formatter">
      <template slot-scope="scope">
        <el-button v-if="scope.row.thisrc.length > 0" type="success" icon="el-icon-check" circle @click="routerUrl(scope.row,'rc')" />
        <el-button v-else type="info" icon="el-icon-close" circle @click="routerUrl(scope.row,'rc')" />
      </template>
    </el-table-column>
    <el-table-column align="center" width="100" prop="name" label="写作PartA" :formatter="formatter">
      <template slot-scope="scope">
        <el-button v-if="scope.row.thiswa.length > 0" type="success" icon="el-icon-check" circle @click="routerUrl(scope.row,'wa')" />
        <el-button v-else type="info" icon="el-icon-close" circle @click="routerUrl(scope.row,'wa')" />
      </template>
    </el-table-column>
    <el-table-column align="center" width="100" prop="name" label="写作PartB" :formatter="formatter">
      <template slot-scope="scope">
        <el-button v-if="scope.row.thiswb.length > 0" type="success" icon="el-icon-check" circle @click="routerUrl(scope.row,'wb')" />
        <el-button v-else type="info" icon="el-icon-close" circle @click="routerUrl(scope.row,'wb')" />
      </template>
    </el-table-column>
    <el-table-column align="center" width="128" prop="is_ok" label="总体完成状态" :formatter="formatter">
      <template slot-scope="scope">
        <el-button v-if="scope.row.is_ok" type="success" icon="el-icon-check" circle />
        <el-button v-else type="info" icon="el-icon-close" circle @click="setRecordOk(scope.row)" />
      </template>
    </el-table-column>
    <el-table-column align="center" width="120" prop="status" label="审核状态" :formatter="formatter" sortable>
      <template slot-scope="scope">
        <el-button v-if="scope.row.status === 0" size="mini" type="info">待审核</el-button>
        <el-button v-if="scope.row.status === 1" size="mini" type="success">审核通过</el-button>
        <el-button v-if="scope.row.status === 2" size="mini" type="danger">审核不通过</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
    },
    handleVerify(row) {
      this.$emit('handleVerify', row)
    },
    routerUrl(row, part) {
      const tureid = row.id
      let id = 0
      let url = ''
      switch (part) {
        case 'la':
          id = row.thisla.length > 0 ? row.thisla[0].id : 0
          url = 'listen-main-A'
          break
        case 'lb':
          id = row.thislb.length > 0 ? row.thislb[0].id : 0
          url = 'listen-main-B'
          break
        case 'ra':
          id = row.thisra.length > 0 ? row.thisra[0].id : 0
          url = 'read-main-A'
          break
        case 'rb':
          id = row.thisrb.length > 0 ? row.thisrb[0].id : 0
          url = 'read-main-B'
          break
        case 'rc':
          id = row.thisrc.length > 0 ? row.thisrc[0].id : 0
          url = 'read-main-C'
          break
        case 'wa':
          id = row.thiswa.length > 0 ? row.thiswa[0].id : 0
          url = 'write-main-A'
          break
        case 'wb':
          id = row.thiswb.length > 0 ? row.thiswb[0].id : 0
          url = 'write-main-B'
          break
      }

      this.$router.push({ name: url, query: { tureid: tureid, id: id }})
    },
    setRecordOk(row) {
      this.$emit('setRecordOk', row)
    }
  }
}
</script>
<style lang="stylus">

</style>
