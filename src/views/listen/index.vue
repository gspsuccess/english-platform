<template>
  <div class="app-container">
    <main-header @openDialog="openDialog" @handleSearch="handleSearch" />
    <el-row>
      <list :list-obj="listObj" @handleEdit="handleEdit" @handleDelete="handleDelete" />
      <page-container :list-obj="listObj" @changeCurrentPage="changeCurrentPage" />
    </el-row>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <main-form ref="child" :form-data="formData" @handleSubmit="handleSubmit" />
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mainHeader from './components/main-header'
import list from './components/list'
import mainForm from './components/main-form'
import PageContainer from '@/components/PageContainer'
import { getAll, getOne, addOne, updateOne, deleteOne } from '@/api/listen'
import { Config } from '@/utils/config'
const formData = {
  name: '',
  voicefile: '',
  detail: '',
  rightanswer: '',
  level: 5
}
export default {
  components: {
    mainHeader,
    list,
    mainForm,
    PageContainer
  },
  data() {
    return {
      title: '',
      dialogFormVisible: false,
      formData: formData,
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
    openDialog() {
      this.title = '新增记录'
      this.formData = formData
      this.dialogFormVisible = true
    },
    handleSearch(data) {
      this.listQuery = Object.assign(this.listQuery, data)
      this.getList()
    },
    handleSubmit(model) {
      if (this.title === '新增记录') {
        addOne(model).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.msg)
            this.resetForm()
          }
        })
      }
      if (this.title === '修改记录') {
        updateOne(model.id, model).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.msg)
            this.resetForm()
          }
        })
      }
    },
    handleEdit(row) {
      this.title = '修改记录'
      this.dialogFormVisible = true
      getOne(row.id).then((res) => {
        console.log(res)
        if (res.code === 1) {
          this.formData = res.results
        }
      })
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
    resetForm() {
      this.getList()
      this.dialogFormVisible = false
      this.$refs.child.resetForm('ruleForm')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
