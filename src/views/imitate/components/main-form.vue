<template>
  <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="素材上传" prop="url">
      <file-upload />
    </el-form-item>
    <el-form-item label="题目内容" prop="content">
      <el-input v-model="formData.content" type="textarea" placeholder="请输入题目内容" rows="4" />
    </el-form-item>
    <el-form-item label="题目答案" prop="answer">
      <el-input v-model="formData.answer" placeholder="请输入题目答案" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import FileUpload from '@/components/FileUpload'

export default {
  components: {
    FileUpload
  },
  props: ['formData'],
  data() {
    return {
      rules: {
        url: [
          { required: true, message: '请选择素材文件', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入题目内容', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入题目答案', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    imageUrl() {
      if (this.formData.picture) {
        let prefix = ''
        if (!/http:\/\/|https:\/\//.test(this.formData.picture)) {
          prefix = 'https://api.zesi.com.cn'
        }
        return prefix + this.formData.picture
      }
      return ''
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSuccess(data) {
      this.formData.picture = data
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
<style lang="stylus">

</style>
