<template>
  <div class="app-container">
    <main-header @addOne="addOne" @handleSearch="handleSearch" />
    <el-row>
      <list :list-obj="listObj" @handleEdit="handleEdit" @handleDelete="handleDelete" @handleVerify="handleVerify" />
      <page-container :list-obj="listObj" @changeCurrentPage="changeCurrentPage" />
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import mainHeader from './components/main-header'
import list from './components/list'
import PageContainer from '@/components/PageContainer'
import { getAll, deleteOne } from '@/api/readA'
import { Config } from '@/utils/config'
export default {
  components: {
    mainHeader,
    list,
    PageContainer
  },
  data() {
    return {
      title: '',
      listObj: {},
      listQuery: {
        limit: 10,
        offset: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const listObj = await getAll(this.listQuery)
      this.listObj = listObj
    },
    changeCurrentPage(page) {
      this.listQuery.offset = (page - 1) * 10
      this.getList()
    },
    addOne() {
      this.$router.push('read-main-A')
    },
    handleSearch(data) {
      this.listQuery = Object.assign(this.listQuery, data)
      this.getList()
    },
    handleSubmit(model) {
      if (this.title === '新增记录') {
        addOne(model).then((res) => {
          if (res.errorCode === 0) {
            this.$message.success(res.msg)
            this.resetForm()
          }
        })
      }
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOne(row.id).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.msg)
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit(row) {
      console.log(row)
      this.$router.push({ name: 'read-main-A', query: { id: row.id }})
    },
    handleVerify(row) {
      this.$router.push({ name: 'read-verify-A', query: { id: row.id }})
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
