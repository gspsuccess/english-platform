<template>
  <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="password">
      <el-input v-model="formData.password" placeholder="请输入原密码" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input v-model="formData.newPwd" placeholder="请输入新密码" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPwd">
      <el-input v-model="formData.confirmPwd" placeholder="请再次输入新密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['uid'],
  data() {
    return {
      formData: {

      },
      rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.id = this.uid
          this.$emit('handleSubmit', this.formData, 'changePwd')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
