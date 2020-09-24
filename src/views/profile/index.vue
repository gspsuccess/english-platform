<template>
  <div class="page-wrapper">
    <main-form :form-data="formData" @handleSubmit="handleSubmit" @showPwdContainer="showPwdContainer" />
    <el-dialog title="更改登录密码" :visible.sync="dialogFormVisible">
      <main-pwd ref="child" :uid="formData.id" @handleSubmit="handleSubmit" />
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mainForm from './components/main-form'
import mainPwd from './components/main-pwd'
import { getUserByToken, updateOne, resetPwd } from '@/api/user'

export default {
  components: {
    mainForm,
    mainPwd
  },
  data() {
    return {
      formData: {},
      dialogFormVisible: false
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const userObj = await getUserByToken()
      this.formData = userObj.data
      console.log(this.formData)
    },
    showPwdContainer() {
      this.dialogFormVisible = true
    },
    handleSubmit(model, actName) {
      if (actName === 'changePwd') {
        resetPwd(model.id, model).then((res) => {
          if (res.errorCode === 0) {
            this.$message.success(res.msg)
            this.dialogFormVisible = false
            this.$refs.child.resetForm('ruleForm')
          }
        })
      }
      if (actName === 'changeProfile') {
        updateOne(model.id, model).then((res) => {
          if (res.errorCode === 0) {
            this.$message.success(res.msg)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
