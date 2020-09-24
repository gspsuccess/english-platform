<template>
  <div class="page-wrapper">
    <el-card class="box-card" style="padding-bottom:0;">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="routerList">返回列表页</el-button>
      </div>
      <el-form ref="ruleForm" :model="formData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="题目内容">
          <el-input v-model="formData.declare" type="textarea" placeholder="请输入题目内容" rows="4" />
        </el-form-item>
        <el-form-item label="题目文章">
          <el-tabs type="border-card">
            <el-tab-pane label="文章1">
              <tinymce v-model="formData.one" :height="300" />
            </el-tab-pane>
            <el-tab-pane label="文章2">
              <tinymce v-model="formData.two" :height="300" />
            </el-tab-pane>
            <el-tab-pane label="文章3">
              <tinymce v-model="formData.three" :height="300" />
            </el-tab-pane>
            <el-tab-pane label="文章4">
              <tinymce v-model="formData.four" :height="300" />
            </el-tab-pane>
            <el-tab-pane label="文章5">
              <tinymce v-model="formData.five" :height="300" />
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item label="题目选项">
          <el-card class="box-card" style="display:flex">
            <div v-for="(item,index) in formData.select" :key="index" class="text item" style="display:inline-block;margin:1%;width:23%">
              <el-input v-model="formData.select[index]" placeholder="请输入内容">
                <template slot="prepend">{{ index }}</template>
              </el-input>
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="题目答案" style="margin-bottom:0">
          <el-card class="box-card mb12">
            <div v-for="(item,index) in formData.info" :key="index" class="text item">
              <el-card class="box-card" :class="(index + 1) === formData.info.length?'':'mb12'">
                <el-form-item label="题目答案">
                  <el-input v-model="item.right" class="mb12" placeholder="题目答案" />
                </el-form-item>
                <el-form-item label="题目解析">
                  <el-input v-model="item.analysis" class="mb12" placeholder="题目解析" />
                </el-form-item>
                <el-form-item label="题目分值">
                  <el-input v-model="item.value" placeholder="题目分值" />
                </el-form-item>
              </el-card>
            </div>
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
import { addOne, getOne, updateOne } from '@/api/readC'
const formData = {
  tureid: '',
  declare: '',
  one: '',
  two: '',
  three: '',
  four: '',
  five: '',
  select: {
    A: '', B: '', C: '', D: '', E: '', F: '', G: ''
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
    }
  ],
  thispoint: ''
}
export default {
  components: {
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
          formData_edit.select = JSON.parse(formData_edit.select)
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
      const formData_format = JSON.parse(JSON.stringify(this.formData))
      if (!this.formData.id) {
        addOne(formData_format).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.msg)
            this.resetForm()
          }
        })
      } else {
        updateOne(this.formData.id, formData_format).then((res) => {
          if (res.code === 1) {
            this.$message.success(res.msg)
          }
        })
      }
    },
    resetForm() {
      this.formData = formData
    },
    routerList() {
      this.$router.push('listen-index-B')
    },
    onSuccess(data) {
      this.formData.voicefile = data.url
    }
  }
}
</script>
<style lang="stylus">

</style>
