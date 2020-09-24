<template>
  <div class="page-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="routerList">返回列表页</el-button>
      </div>
      <el-form ref="ruleForm" :model="formData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="素材上传" prop="image">
          <file-upload @onSuccess="onSuccess" />
        </el-form-item>
        <el-form-item label="题目内容" prop="detail">
          <tinymce v-model="formData.detail" :height="300" />
        </el-form-item>
        <el-form-item label="样文内容" prop="templatearticle">
          <el-input v-model="formData.templatearticle" type="textarea" placeholder="请输入样文内容" rows="4" />
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
import Tinymce from '@/components/Tinymce'
import { addOne, getOne, updateOne } from '@/api/writeB'
const formData = {
  tureid: '',
  image: '',
  detail: '',
  templatearticle: '',
  thispoint: ''
}
export default {
  components: {
    FileUpload,
    Tinymce
  },
  data() {
    return {
      title: '新增记录',
      formData: formData
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
      this.$router.push('write-index-B')
    },
    resetForm() {
      this.formData = {
        tureid: '',
        image: '',
        detail: '',
        templatearticle: '',
        thispoint: ''
      }
    },
    onSuccess(data) {
      this.formData.image = data.url
    }
  }
}
</script>
<style lang="stylus">

</style>
