<template>
  <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="素材上传" prop="voicefile">
      <file-upload @onSuccess="onSuccess" />
    </el-form-item>
    <el-form-item label="文件名称" prop="name">
      <el-input v-model="formData.name" placeholder="请输入文件名称" />
    </el-form-item>
    <el-form-item label="题目内容" prop="detail">
      <el-input v-model="formData.detail" type="textarea" placeholder="请输入题目内容" rows="4" />
    </el-form-item>
    <el-form-item label="题目答案" prop="rightanswer">
      <el-input v-model="formData.rightanswer" placeholder="请输入题目答案" />
    </el-form-item>
    <el-form-item label="题目等级" prop="level">
      <el-select v-model="formData.level" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select>
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
      options: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }],
      rules: {
        voicefile: [
          { required: true, message: '请选择素材文件', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入题目内容', trigger: 'blur' }
        ],
        rightanswer: [
          { required: true, message: '请输入题目答案', trigger: 'blur' }
        ]
      }
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
      this.formData.voicefile = data.url
      console.log(this.formData)
    }
  }
}
</script>
<style lang="stylus">

</style>
