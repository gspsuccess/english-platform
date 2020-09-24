<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本信息设置</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="showPwdContainer">更改登录密码</el-button>
    </div>
    <div>
      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="头像">
          <ImgUpload name="user" :image-url="imageUrl" @onSuccess="onSuccess" @beforeUpload="beforeUpload" />
        </el-form-item>
        <el-form-item label="备注说明" prop="descri">
          <el-input v-model="formData.descri" type="textarea" placeholder="请输入备注说明" rows="4" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script type="text/ecmascript-6">
import ImgUpload from '@/components/ImgUpload'

export default {
  components: {
    ImgUpload
  },
  props: ['formData'],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    imageUrl() {
      if (this.formData.avatar) {
        let prefix = ''
        if (!/http:\/\/|https:\/\//.test(this.formData.avatar)) {
          prefix = 'https://api.zesi.com.cn'
        }
        return prefix + this.formData.avatar
      }
      return ''
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.formData, 'changeProfile')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    showPwdContainer() {
      this.$emit('showPwdContainer')
    },
    onSuccess(data) {
      this.formData.avatar = data
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
