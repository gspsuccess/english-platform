<template>
  <div class="page-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="routerList">返回列表页</el-button>
      </div>
      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="题目内容" prop="detail">
          <tinymce v-model="formData.detail" :height="300" />
        </el-form-item>
        <el-form-item label="题目选项" prop="select">
          <el-card class="box-card" style="display:flex">
            <div v-for="(item,index) in formData.select" :key="index" class="text item" style="display:inline-block;margin:1%;width:23%">
              <el-input v-model="formData.select[index]" placeholder="请输入内容">
                <template slot="prepend">{{ index }}</template>
              </el-input>
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="题目答案" prop="value">
          <el-card class="box-card">
            <el-card v-for="(item,index) in formData.info" :key="index" class="box-card mb12">
              <el-input v-model="item.right" placeholder="题目答案" class="mb12" />
              <el-input v-model="item.analysis" placeholder="答案解析" class="mb12" />
              <el-input-number v-model="item.value" :step="5" placeholder="题目分值" />
            </el-card>
          </el-card>
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
import Tinymce from '@/components/Tinymce'
import FileUpload from '@/components/FileUpload'
import { addOne, getOne, updateOne } from '@/api/readA'
const formData = {
  tureid: '',
  detail: '',
  select: {
    A: '', B: '', C: '', D: '', E: '', F: '', G: '', H: '', I: '', J: '', K: '', L: '', M: '', N: '', O: ''
  },
  info: [
    {
      right: '',
      analysis: '',
      value: 5,
      location: 1
    },
    {
      right: '',
      analysis: '',
      value: 5,
      location: 2
    },
    {
      right: '',
      analysis: '',
      value: 5,
      location: 3
    },
    {
      right: '',
      analysis: '',
      value: 5,
      location: 4
    },
    {
      right: '',
      analysis: '',
      value: 5,
      location: 5
    },
    {
      right: '',
      analysis: '',
      value: 5,
      location: 6
    },
    {
      right: '',
      analysis: '',
      value: 5,
      location: 7
    },
    {
      right: '',
      analysis: '',
      value: 5,
      location: 8
    },
    {
      right: '',
      analysis: '',
      value: 5,
      location: 9
    },
    {
      right: '',
      analysis: '',
      value: 5,
      location: 10
    }
  ],
  thispoint: ''
}
const formData_format = JSON.parse(JSON.stringify(formData))
export default {
  components: {
    Tinymce,
    FileUpload
  },
  data() {
    return {
      title: '新增记录',
      formData: formData_format,
      rules: {
        detail: [
          { required: true, message: '请输入题目内容', trigger: 'blur' }
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
          formData_edit.select = JSON.parse(formData_edit.select.replace(/'/g, '"'))
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
      this.formData = formData
    },
    onSuccess(data) {
      this.formData.voicefile = data.url
    }
  }
}
</script>
<style lang="stylus">

</style>
