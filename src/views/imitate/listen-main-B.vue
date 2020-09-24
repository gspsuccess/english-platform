<template>
  <div class="page-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="routerList">返回列表页</el-button>
      </div>
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
        <el-form-item label="题目答案" prop="templetanswer">
          <el-input v-model="formData.templetanswer" placeholder="请输入题目答案" />
        </el-form-item>
        <el-form-item label="题目分值" prop="value">
          <el-input-number v-model="formData.value" :step="5" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload'
import { addOne, getOne, updateOne } from '@/api/listenB'
const formData = {
  tureid: '',
  name: '',
  voicefile: '',
  detail: '',
  templetanswer: '',
  value: 5,
  thispoint: ''
}
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      title: '新增记录',
      formData: formData,
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
        templetanswer: [
          { required: true, message: '请输入题目答案', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const id = this.$route.query.id || 0
    const tureid = this.$route.query.tureid || 0
    if (id) {
      getOne(id).then((res) => {
        if (res.code === 1) {
          const formData_edit = res.results
          this.formData = formData_edit
        }
      })
    }
    if (tureid) {
      this.formData.tureid = tureid
    }
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this._submitForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _submitForm() {
      if (!this.formData.id) {
        addOne(this.formData).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.msg)
            this.resetForm()
          }
        })
      } else {
        updateOne(this.formData.id, this.formData).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.msg)
          }
        })
      }
    },
    routerList() {
      this.$router.push('listen-index-B')
    },
    resetForm() {
      this.formData = {
        tureid: '',
        name: '',
        voicefile: '',
        detail: '',
        templetanswer: '',
        value: 5,
        thispoint: ''
      }
    },
    onSuccess(data) {
      this.formData.voicefile = data.url
    }
  }
}
</script>
<style lang="stylus">

</style>
